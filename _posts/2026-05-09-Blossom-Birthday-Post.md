---
layout: post
title: "Blossom — A Language for Structured Thinking"
subtitle: "It began with a simple request: 'This is a single file vanilla JS PWA markdown editor. Analyze for bug."
date: 2025-05-09 00:00:00 +0800
categories: [Development, Methodology, AI, DSL]
tags: [Specs-ML, Blossom, AI-Collaboration, Productivity, Markdown, Spec-Driven-Development]
excerpt: "How iterative AI development birthed a lightweight DSL for product specification, and why structured thinking is the missing layer between notes and code."
layout: post
author: "Chan Jiunn Hwa"
---
# Blossom — A Language for Structured Thinking


> *It began with a vague request in a chat window: “Make it look nicer.”*
> 
> By session five, that single line had splintered into thousands of messages, half-formed ideas, and repeated clarifications. I wasn’t just building software—I was drowning in unstructured conversation. Then it hit me: if I’m co-developing the product *and* the process simultaneously, why am I still speaking in paragraphs when I could speak in structure?
> 
> That’s how **Blossom Specs ML** emerged. Not from a formal spec template. Not from a language design textbook. But from the messy, iterative reality of AI-assisted development—and the quiet realization that the best tool for thinking is a language built for it.

---

**Thesis:**  
Blossom turns thinking into structure—and structure into a language.
It is a way to surface ideas into structured mental models—so they can be clearly expressed, shared, and understood by both humans and AI.

---
## The Origin of Blossom
```

From the genesis line of 'This is a single file vanilla JS PWA markdown editor. Analyze for bug'.

Session 1: "Add a button to the toolbar"
Session 2: "Add a dark mode toggle"
Session 3: "TopToolBar[[Logo, LogoText], [<empty>], [DarkLight, Focus, Import, Export{md,html,pdf,zip}]]"

```

## Co-Developing Product & Process

As part of my development philosophy, I’ve always believed in improving both the **product** and the **process** in parallel. Most developers focus on shipping features. I focus on shipping features *while* refining how I build them.

When I started building what was then called `LocalMark Studio` (now **Blossom**), my workflow looked like this:

- **Session 1:** `"Add a button to the toolbar"`
- **Session 2:** `"Add a dark mode toggle"`
- **Session 3:** `TopToolBar[[Logo, LogoText], [<empty>], [DarkLight, Focus, Import, Export{md,html,pdf,zip}]]`

By Session 3, natural language had fractured under complexity. I was repeating clarifications, losing context across AI sessions, and paying a hidden "rework tax" every time a vague prompt resulted in misaligned code. 

The pain was clear:
- Ambiguity bred scope creep
- Context windows filled, then forgot
- Decisions vanished into chat history
- Every "fix" created two new edge cases

Blossom wasn't planned. It was inevitable.

## The Evolution: From Chat Logs to Structured Trees

<img width="758" height="391" alt="The Evolution of Our Process" src="https://github.com/user-attachments/assets/b298a459-1c77-4b4f-a083-30e234f9f5be" />


The transition didn't happen overnight. It emerged through three distinct phases:

| Phase | Behavior | Realization |
|-------|----------|-------------|
| **Discovery** | `"Add Kanban"`, `"Fix layout"` | We learned what works through doing |
| **Pattern Recognition** | `"Kanban needs full width"`, `"All full-width views use overlay pattern"` | Shared vocabulary emerged organically |
| **Specification** | `GraphView[type: fullwidth, layout: force-directed]` | Complex features needed exact specs to avoid rework |

What made Specs ML emerge wasn't a desire to write documentation. The turning point was when I tried to figure out a better way to **communicate with AI more effectively** and **capture ideas without losing them** where Prompt Engineering is too structured and hence boxed-in.
This is often the case in new product development as features are discovered and evolved and not well defined yet. 

| Before Specs ML | After Specs ML |
|-----------------|----------------|
| Ideas scattered in chat | Structured, searchable specification |
| `"What did we decide?"` | Single source of truth |
| `"What's coming next?"` | Clear version roadmap |
| Duplicate feature requests | Track what's planned vs done |

The tree structure became CRUD-native. Every node is a first-class citizen that can be created, moved, updated, or archived gracefully. Ideas no longer go MIA. They have a home.

## The Missing Layer: What Blossom Actually Is (and Isn’t)

Software development has a gap. On one side: **rigid code**. On the other: **loose notes**. In between lies a vacuum where ambiguity thrives, context evaporates, and alignment fractures.

Blossom Specs ML fills that gap. It is a **lightweight Domain-Specific Language (DSL)** for product specification. Not a markup language. Not Turing complete. Not prescriptive. It lives between thinking and implementation.

### The Intentional Constraint
You might ask: *Is Blossom Specs ML Turing complete?*

Short answer: No. Long answer: It's not meant to be.

Blossom is a data description language, not a programming language. It has no conditionals, no loops, no mutable state, no arithmetic. It intentionally trades computational power for **predictability, readability, and version-control friendliness**.

### The Recursive Joke
> `"Specs ML cannot answer that question because Specs ML cannot answer any question. It only describes what is."`  
> A flower doesn't compute. It grows. That's Blossom.

### Where Blossom Stacks
Blossom Specs ML lives at the vision layer - above code, above data, in the realm of product thinking.

| Layer | Tool |
|-------|------|
| Compute | JavaScript, Python, C++ |
| Structure | JSON, YAML |
| **Product Vision** | **Blossom Specs ML** |
| Human Conversation | Natural Language |

It's human-first, machine-parseable (if you want), and designed to survive context switches, team member turnover, and your own memory.

## Practice: Specifying an API Client

Let's use a real-world application **Yaak REST API Client** to construct a specification. Using Blossom, I can map its UI hierarchy, component relationships, state, and proposed improvements into a single tree, with as much detail as I want(can):

<img width="700" height="400" alt="Yaak API Client" src="https://github.com/user-attachments/assets/60a160f6-0ea7-43dc-adb5-b5da311836f4" />

```
Yaak[
    type: API_Client,
    platform: desktop,
    status: active,
    version: 2026.3.1
]
|
├── Layout[
│   ├── Sidebar[position: left, width: 260px]
│   │   ├── EnvironmentSelector[current: "No Environment", dropdown: true]
│   │   ├── Search[placeholder: "Search", shortcut: ⌘F]
│   │   └── RequestTree[type: nested, items: [...]]
│   │
│   ├── MainPanel[
│   │   ├── RequestHeader[method: GET, url: "swapi.info/api/"]
│   │   ├── Tabs[items: [Body, Headers, Auth, Info, Pretty], active: Pretty]
│   │   └── ContentArea[type: json, formatting: pretty]
│   │
│   └── Footer[
│       └── UpdateNotification[message: "Yaak 2026.3.1 is available"]
│   ]
]
```

This single structure captures:  
✅ Visual hierarchy & component relationships  
✅ State, properties, and active selections  
✅ Proposed improvements (prioritized by impact)  
✅ Contextual comments & elaboration zones  

The notation scales from simple descriptions to complex systems while remaining readable at a glance. No JSON nesting hell. No YAML indentation guesswork. Just trees, attributes, and status markers (`✅ 🚧 💡 🐛`).

## The Impact To Productivity, Quality, Efficiency and Speed: Metrics That Matter

Writing specs takes time. Estimated overhead: **15–20%**. But this overhead pays for itself within three sessions. 

I estimate the following improvements to productivity, speed and quality if the original LocalMarkdown Studio(now Blossom) editor was implemented with Blossom Specs ML. In the original implementation - most of the breakages came from shifting the UI design midway to cater to expanded features that were originally not in scope.

Here's what changes when you shift from reactive chat-building to structured specification:

### Sessions to MVP
| Metric | Without Spec | With Spec | Improvement |
|--------|--------------|-----------|-------------|
| Features per session | 1.2 | 2.0 | +67% |
| Sessions to MVP | 10 | 6 | -40% |
| Rework sessions | 4 | 0.5 | -87% |
| Bug fix sessions | 2 | 1 | -50% |

### The Rework Tax
The biggest cost wasn't building features. It was **rebuilding them**.

| Feature | Without Spec | With Spec | Savings |
|---------|--------------|-----------|---------|
| Kanban | 2 sessions (wrong placement → CSS fixes → mode rewrite) | 1 session | -50% |
| Calendar | 2 sessions (sidebar → fullwidth → mode parsing bugs) | 1 session | -50% |
| Graph | 1.5 sessions (layout redone → drag detection fixed) | 0.5 session | -67% |
| Theme system | 1 session | 0.5 session | -50% |

### Quality & Communication
| Aspect | Without Spec | With Spec |  
|--------|--------------|-----------|  
| Clarification questions per feature | 5–10 | 1–2 |  
| Misinterpretations | Frequent | Rare |  
| `"I meant the other toolbar"` | Yes | Never |  
| New developer ramp-up | 2–3 sessions | ~30 minutes |  
| Forgotten decisions | Frequent | Documented |  

### Architectural Quality

| Metric | Without Spec | With Spec |
| --- | --- | --- |
| Consistent patterns | Emergent | Intentional |
| View lifecycle standardization | None | Uniform |
| Mode management | Scattered | Centralized |
| Property naming | Inconsistent | Standardized |

### Knowledge Transfer

| Aspect | Without Spec | With Spec |
| --- | --- | --- |
| New developer ramp-up | 2-3 sessions | 30 minutes |
| "What does this do?" | Dig through code | Read the spec |
| Forgotten decisions | Frequent | Documented |
| Session recap needed | Every time | Rare |

The Real Savings: Rework
------------------------

The biggest cost wasn't building features. It was rebuilding them.

text

┌─────────────────────────────────────────────────────────────────────────────┐
│                    REWORK TAX - WITHOUT SPEC                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Kanban:                                                                   │
│   ├── Built in sidebar (wrong) → Moved to full-width → 1 session lost      │
│   ├── CSS grid issues → Fixed → 0.5 session lost                           │
│   └── Mode management → Rewritten → 0.5 session lost                       │
│                                                                             │
│   Calendar:                                                                 │
│   ├── Built in sidebar (wrong) → Moved to full-width → 1 session lost      │
│   ├── Date parsing bugs → Fixed → 0.5 session lost                         │
│   └── Three modes → Added incrementally → 0.5 session lost                 │
│                                                                             │
│   Graph:                                                                    │
│   ├── Layout → Redone → 0.5 session lost                                   │
│   └── Drag detection → Fixed → 0.5 session lost                            │
│                                                                             │
│   Total Rework: ~4 sessions                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

With Spec, these would not have necessarily been built correctly the first time, but improvements will pay dividends over time.

* * * * *

The Spec Development Tax
------------------------

Writing specs takes time. Estimated overhead:

| Activity | Time |
| --- | --- |
| Initial spec creation | 1 session |
| Updating spec per feature | 5-10 minutes |
| Reviewing spec before building | 2-3 minutes |
| Total overhead | +15-20% |

But this overhead pays for itself in reduced rework.

* * * * *

Net Improvement Summary
-----------------------

| Category | Before | After | Improvement |
| --- | --- | --- | --- |
| Productivity | 1.2 feat/session | 2.0 feat/session | +67% |
| Efficiency | 40% rework | 10% rework | +75% |
| Quality | 26 defects | 6 defects | +77% |
| Speed | 10 sessions | 6 sessions | +40% |

* * * * *

The Compounding Effect
----------------------

The real benefit compounds over time:
Session 1-3:  Small difference (spec writing overhead)
Session 4-6:  Gap widens (less rework)
Session 7-10: Gap doubles (accumulated savings)
Session 10+:  Exponential (architectural consistency)

By Session 10, the Spec-driven approach would be 2-3x more productive.

* * * * *

What We Would Have Done Differently
-----------------------------------

1.  Defined View base class from the start  
2.  Centralized mode management before Kanban  
3.  Standardized layout patterns (list vs fullwidth)  
4.  Consistent property naming across all features  
5.  Documented decisions as we made them  

* * * * *

Final Verdict
-------------

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   If we had started with Blossom Specs ML:                                 │
│                                                                             │
│   ✅ 40% fewer sessions to MVP                                             │
│   ✅ 75% less rework                                                        │
│   ✅ 77% fewer bugs                                                         │
│   ✅ 2x productivity by session 10                                         │
│                                                                             │
│   The 15-20% spec overhead pays for itself within 3 sessions.              │
│                                                                             │
│   After that, it's pure compounding efficiency.                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

But the more important insight: We didn't know what to specify until we built it.

> *We didn't know what to specify until we built it. The spec couldn't have come first. It emerged from the building. That's not a bug. That's the process.*

## Comparing Blossom Fit in the Spec-Driven Landscape

Specification-Driven Development is fashionable. But not all specs are created equal. Blossom doesn't replace existing methodologies; it occupies a different niche.

| Aspect | Waterfall | Agile (Stories) | BDD (Gherkin) | OpenAPI | Blossom Specs ML |
|--------|-----------|-----------------|---------------|---------|------------------|
| Purpose | Contract | Communication | Testing | API docs | Product vision |
| Format | Document | `"As a user..."` | `Given/When/Then` | YAML/JSON | Tree notation |
| Prescriptive vs Descriptive | Prescriptive | Descriptive | Prescriptive | Prescriptive | **Descriptive** |
| Discovered vs Designed | Designed | Discovered | Designed | Designed | **Discovered** |
| AI-Optimized | ❌ | ⚠️ | ⚠️ | ⚠️ | ✅ |
| Living Document | ❌ | Sometimes | Sometimes | ✅ | ✅ |

### How Blossom Differs
1. **Descriptive, Not Prescriptive:** It tells you *what exists*, not *what you must build*. Future features are marked with `💡`, not locked with `🔒`.
2. **Emergent, Not Designed:** Traditional: `Plan → Spec → Build → Test`. Blossom: `Build → Discover → Spec → Update → Build more`.
3. **Human-First, Machine-Second:** Optimized for glanceable hierarchy and status markers. Parseable if needed, but never required.
4. **Spec + Roadmap + Bug Tracker in One:** One document. Multiple purposes. Zero duplication.

**Rating for its niche: 8/10.**  
Best for: Solo builders, AI collaborators, exploratory products, small teams.  
Struggles with: Large enterprises, fixed-contract work, regulatory compliance, formal validation.

> *Traditional spec-driven development asks: "What will we build?"*  
> *Blossom Specs ML asks: "What have we built? What have we learned? What should we build next?"*  
> *One is prediction. The other is reflection.*

## Lessons from the AI Collaborator

Building Blossom was a partnership. The AI handled execution. I handled direction. Here's what that taught me:

### What AI Did Well
- **Pattern Recognition:** Noticed Kanban, Calendar, and Graph all needed full-width layouts. Suggested the overlay pattern before I asked.  
- **Rapid Prototyping:** `"Add a graph view"` → working minimal version in minutes. Speed matters when exploring.  
- **Memory Retention:** Tracked variable names, CSS conventions, and function signatures across sessions. Saved hours of hunting.  


### What AI Struggled With
- **The Hallucination Tax:** Invented APIs, referenced removed functions, confidently outputted broken logic.
- **Context Limits:** After ~100k tokens, early decisions vanished. Required constant re-anchoring.
- **Scope Creep Enabler:** Every `"can we add X?"` seemed reasonable. The AI doesn't say no to complexity.


### The Human's Job
Knowing when to stop adding features was harder than saying yes to bad ones. Every feature adds maintenance burden and cognitive load. The spec became the boundary. It forced discipline. It preserved architecture.


## Why This Matters for Teams & Open Source

Blossom wasn't built for enterprises. But its principles scale beautifully to collaboration:

| Benefit | Impact |
|---------|--------|
| **Single Source of Truth** | New devs read the spec instead of digging through git history |
| **Explicit Roadmap** | Contributors see `✅`, `🚧`, `📅`, `💡` at a glance |
| **CRUD for Ideas** | Move `Bookmarking` from `v3.0` → `v2.0` without losing context |
| **Decision Documentation** | Comments/elaborations attach directly to nodes |
| **Session Continuity** | Start every meeting by reviewing: *What's done? What's next? What's new?* |

> *A spec that exists is infinitely better than a perfect spec that doesn’t.*

It transforms specification from a bureaucratic artifact into a **living, version-controlled blueprint** that evolves alongside your codebase. No external tools. No Jira syncs. Just `spec.md` in your repo, diffing cleanly with every commit.

## 9. Closing: Let a Thousand Notes Bloom

During development, I renamed `LocalMark Studio` to **Blossom**. The old name was functional. The new one is intentional.

Software is saturated with `"Mark"`, `"Note"`, `"Pad"`, and `"Studio"`. I wanted something that evokes growth, unfolding ideas, and organic structure. The tagline wrote itself:

> 🌸 **"Let a thousand notes bloom."**

Blossom Specs ML is not a programming language. It's not a framework. It's a **language for structured thinking**. It surfaces ideas into mental models that both humans and AI can understand, share, and build upon.

In early sessions, I described features in natural language. The AI understood. Mostly. Sometimes it added buttons to the wrong toolbar. Sometimes it used the wrong icon. As the product grew, I needed a way to specify exactly what I wanted without writing ten-paragraph essays.

The solution emerged organically:
```
TopToolBar[
    left: [Logo("M↓"), Text("Blossom")],
    center: [],
    right: [Theme, Focus, Find, Import, Export{md, html, pdf, zip}]
]
```

It's not Turing complete. It's not supposed to be. It's a spec, not a program. It has a root. Branches. Leaves. Attributes. Status markers. You can nest arbitrarily deep. You can move nodes without losing context. You can commit it, diff it, and share it.

AI didn't build Blossom on its own. I didn't build Blossom alone. We built it together, session by session, conversation by conversation, over a few nights. 

Let a thousand notes bloom — but this time, with some structure. 🌸

---

