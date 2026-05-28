---
layout: post
title: "The Message Is the Queue"
subtitle: "How a single denormalized SQLite row becomes an event log, work queue, read model, and audit trail—all at once"
date: 2026-05-28
author: "Jiunn"
tags: ["architecture", "event-driven", "messaging", "sqlite", "systems-design", "ai-agents"]
categories: ["Engineering", "Architecture"]
excerpt: "A different way to think about messaging systems: treat every message as a fact in a queue, not an event to handle—unlocking resilience, extensibility, and simplicity with a single denormalized table."
reading_time: 12
seo_title: "The Message Is the Queue: A Simpler Event-Driven Architecture with SQLite"
seo_description: "Learn how a single denormalized SQLite table can act as an event log, queue, read model, and audit trail—simplifying messaging system design and improving resilience."
---
# The Message Is the Queue — WA-Hub Architecture

Architecture · WA-Hub v0.3

# The Message

Is the _Queue_

How a single denormalized SQLite row becomes an event log, a work queue, a read model, and an audit trail — all at once.

May 2026·Go · SQLite · SSE·~12 min read

## The problem with chat integrations

Most messaging integrations are built the same way: WhatsApp sends an event, your code handles it, and somewhere in that handler you're doing five things at once — parsing the message, looking up the contact, updating a conversation record, classifying the intent, and firing a reply. It works until it doesn't. One slow database call and the whole handler blocks. One unhandled message type and you silently drop data. Add a second channel and you copy-paste the handler with minor variations.

WA-Hub takes a different approach. The insight is simple: **the message stream is a queue of facts, not a stream of events to be handled immediately.** If you treat it that way from the start, everything else — resilience, extensibility, auditability — falls out naturally.

 >"WhatsApp is ubiquitous. It makes a good point of data ingest. Future apps are just reacting to messages and triggering actions." 

That observation is the seed of the architecture. Once you accept that WhatsApp (or Telegram, or email) is an _input bus_ rather than a chat interface, the design question changes from "how do I handle this message" to "how do I record this fact and let the right services react to it later."

## One endpoint. One job.

The ingestor has a single responsibility: receive a raw channel event, normalize it into a standard shape, and POST it to `/api/queue`. That's all it does. It doesn't touch a database. It doesn't know about contacts or conversations. It doesn't classify intent.

> <img width="540" height="231" alt="image" src="https://github.com/user-attachments/assets/5eadaa7f-853e-4041-9d06-b499ef6b1818" />


The HTTP response from `/api/queue` is **202 Accepted** — not 200 OK. The ingestor is told "received", not "written". This distinction matters: the ingestor's job ends when the message is in the queue. Everything downstream is someone else's problem.

NormalizedMessage — the only inter-process contract 

type NormalizedMessage struct {
  Channel      string // "whatsapp" | "telegram" | "email"
  ChannelMsgID string // native ID from the channel
  Conversation string // JID / chat_id / thread_id
  Sender       string
  Body         string
  MediaType    string // "" | "image" | "video" | "audio"
  Direction    string // "inbound" | "outbound"
  Ts           string // RFC3339
  Raw          string // full original payload (never parsed downstream)
}

Adding Telegram support is one new file. It maps the Telegram update event into `NormalizedMessage` and calls `ingest()`. The API service, the database schema, the webclient — none of them change.

**The queue is the boundary.** Ingestors live on one side and know only about their channel. Everything else lives on the other side and knows nothing about channels. The `NormalizedMessage` struct is the entire contract between them. 

## The row is a pipeline

The messages table is deliberately denormalized. There are no foreign keys into a contacts table or a conversations table. Every piece of information that will ever be known about a message lives in that single row — it's just that most columns start as NULL and get filled in as the message moves through the pipeline.

Ingest

channel

channel_msg_id

conversation

sender

body

direction

ts

raw

Enrich

display_name

contact_id

conv_title

Classify

intent

intent_app

intent_payload

intent_status

Act

result

processed_at

error_count

error_detail

Each column group is owned by exactly one service. The enricher writes `display_name`. The classifier writes `intent` and `intent_payload`. The POS app writes `result`. No service touches another service's columns.

The ingest columns — everything written at arrival time — are **immutable**. `channel`, `sender`, `body`, `ts` are never updated after the ingestor writes them. They are the ground truth of what the channel delivered. The `raw` column stores the full original payload — never parsed downstream, but invaluable when you need to replay a message that was misclassified or dropped.

 "NULL means not yet processed by this stage." The row is a pipeline, not a record. 

This single table is simultaneously four things: an **event log** (immutable ingest columns), a **work queue** (`WHERE intent_status = 'pending'`), a **read model** (all enriched columns for the webclient), and an **audit trail** (result, processed_at, error_detail). No joins needed anywhere. Every service has everything it needs in one row.

## Failure becomes boring

The conventional fear with messaging integrations is cascading failure: the WhatsApp connection drops, the enrichment queue backs up, the UI shows nothing. This architecture inverts that. Each process fails in isolation. SQLite is the only shared resource, and every process is either a single-column writer or a reader.

| Process down | What breaks | What keeps working |
| --- | --- | --- |
| wa-ingest | WA messages stop arriving | DB intact. Webclient works. Telegram still flows. |
| enricher | `display_name` stays NULL. UI shows JID. | Messages still ingested and readable. All other services normal. |
| classifier | Intent columns stay NULL. Apps see no new intents. | Core ingest unaffected. Webclient shows messages. |
| pos-app | `intent_status` stays `pending`. | On restart it queries its own backlog and catches up. |
| webclient | UI down. | All data safe. Restart and it reads current state from SQLite. |

The system degrades gracefully at every layer. And recovery is always a query — not a replay of events, not a coordination protocol, just a `SELECT`:

Every service recovers by querying its own gap 

-- Enricher finds its backlog on startup
SELECT id, sender FROM messages
WHERE display_name IS NULL
ORDER BY ts ASC;

-- Classifier finds unprocessed inbound messages
SELECT id, body FROM messages
WHERE intent IS NULL AND direction = 'inbound';

-- Reprocess everything after changing the classifier
UPDATE messages
SET intent = NULL, intent_status = NULL
WHERE ts > '2026-01-01';

That last query is particularly powerful. If you improve the intent classifier, you can re-run it over the entire message history. The raw ingest data is always there, untouched. Nothing is ever lost, and nothing needs to be re-ingested from the channel.

**No orchestration needed at the POC stage.** Each process is a Go binary with a restart loop. A Windows batch file or systemd unit is sufficient. When you need multi-process coordination, the upgrade path is adding a SQLite-backed durable queue — same table pattern, no new infrastructure. 

## Enrichment as a plugin

The enricher is not a monolithic service. It's a worker that runs a list of registered enrichers — each one a small struct implementing a two-method interface.

The enricher interface 

type Enricher interface {
  Name()    string
  Matches(msg Message) bool
  Enrich(msg  Message) (map[string]interface{}, error)
}

// Worker runs all registered enrichers in order
for _, e := range enrichers {
  if e.Matches(msg) {
    cols, err := e.Enrich(msg)
    // UPDATE messages SET col=? WHERE id=?
  }
}

Adding language detection is one new struct. Adding sentiment analysis is one new struct. Each enricher declares which messages it cares about via `Matches()` and returns a map of column names to values via `Enrich()`. The pipeline is the same regardless of how many enrichers are registered.

### Conversations as a materialised cache

There is no `conversations` table that the ingestor maintains. The conversation list is derived from the `messages` table on read — a `GROUP BY conversation ORDER BY MAX(ts) DESC`. For performance, a lightweight worker materialises this into a `conversations_cache` table after each ingest. But it's always disposable: drop it, rebuild it from messages in seconds. The source of truth is always the messages table.

### Webhook as a first-class output

When a message is classified, the action doesn't have to go to a local handler. The intent payload can specify a webhook URL. The outbound worker fires the HTTP call and writes the result back to the row. Any external system — a Google Sheet, a Notion database, a legacy ERP — can react to any message without touching the codebase.

## The frontend mirrors the backend

The webclient is built on MRNA — Minimal Reactive Nucleus Architecture — a tiny reactive pattern with four concepts that map directly onto the platform's runtime behaviour.

Events  ──→  Commands  ──→  Atoms  ──→  Views

SSE message.new ──→ commands.receiveMessage() ──→ messages atom ──→ MessageThreadView
SSE intent.created ─→ commands.receiveIntent() ──→ intents atom ──→ IntentDebugView
SSE wa.status ──→ commands.setStatus() ──→ status atom ──→ LoginView

The critical rule: **SSE events never touch atoms directly.** They always route through a Command. This means the command layer is the single point of all state mutation — whether triggered by a user click or a server push. Add a new SSE event type, add one command handler. The views update automatically.

The webclient has no build step. It's vanilla JS served from Go's `//go:embed`. The SSE connection opens on load and drives all live updates through the MRNA pipeline. No polling, no websockets, no framework.

## What the platform becomes

Once this architecture is in place, adding a new capability is always the same three-step pattern:

**1. Add an intent type.** Register a new classifier rule or LLM prompt that matches a specific message pattern and produces a structured payload. 

**2. Write a handler.** One Go struct that reads `intent_payload`, does something (writes an order, sets a calendar event, fires a webhook), and updates `result` and `processed_at`. 

**3. Optionally add a UI.** A new view in the MRNA webclient that reads from `GET /api/messages?intent_app=pos`. No schema changes, no pipeline changes. 

The practical consequence is striking. A customer texts "I want 2kg of rice please" → the classifier produces `intent: order, app: pos, payload: {items: [{name: rice, qty: 2, unit: kg}]}` → the POS handler creates an order record and sends a confirmation reply → the seller sees the order in the POS UI without ever leaving WhatsApp. The seller can also just reply directly in WhatsApp — that outbound message flows through the same table with `direction: outbound`, and the POS app marks the intent as processed.

The user texts themselves "remind me to buy milk tomorrow at 8am" → the classifier produces a reminder intent → the scheduler writes a row to the outbound queue with `scheduled_at` → at 8am the outbound worker fires a WhatsApp message back. Automation with no app to open.

 The WhatsApp thread becomes a universal input. The architecture makes sure every input gets recorded, enriched, classified, and acted on — independently, resiliently, and without any one part knowing about the others. 

This is the outbox pattern collapsed into a single denormalized table. It's not a new idea — event-sourced systems have worked this way for years. What's new here is applying it to a messaging integration at the smallest possible scale: one Go binary, one SQLite file, zero infrastructure. The architecture is right from the first commit, and scales by addition rather than rewrite.

▲ WA-Hub Design Specification v0.3 · Architecture notes · May 2026
