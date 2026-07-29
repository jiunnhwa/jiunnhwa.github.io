---
layout: post
title: "We Built A Horoscope Report Engine In Half A Day"
subtitle: "Spec first, template second, domain third — and the domain was the easy part"
date: 2026-07-29
author: "Jiunn"
tags:
  - icqce
  - western-astrology
  - pipeline-architecture
  - build-log
  - lean-development
categories:
  - Engineering
  - Metaphysics
excerpt: "A production-grade Western astrology engine — 105 tests, zero dependencies, standalone HTML — built from spec to ship in one session. Same pipeline architecture as our BaZi engine. Different constants. When the template is right, adding a new domain is mostly transcription."
reading_time: "6 min"
seo_title: "We Built a Horoscope Report Engine in Half a Day | ICQCE"
seo_description: "How a proven pipeline architecture let us build a production-grade Western astrology report engine — design spec, code, tests, and polish — in a single 3-hour session."
---
# We Built a Horoscope Report Engine in Half a Day

Not a prototype. Not a proof of concept. A production-grade, 105-test-assertion, visually polished, standalone HTML horoscope report generator — built, tested, and shipped in a single session.

**What we built:** A Western astrology engine that takes a name and birth date, computes the sun sign, personality profile, and Jupiter transit outlook, and renders a self-contained HTML report with a light/dark theme toggle, sidebar navigation, scroll progress, an interactive I-Ching oracle, and Stoic philosophical closing quotes. No dependencies. No install. No account. Just open the file.

**How we built it:** The same way we built the BaZi (Chinese astrology) engine before it — a proven pipeline architecture: compute → shape → render. We wrote a design spec first (v0.10B), peer-reviewed it twice, caught four structural defects before writing a single line of code, then transcribed the spec into code block by block. Every function is pure. Every test is deterministic. Every bug was shallow.

**Why it matters:** The pipeline pattern — spec first, template second, domain third — is now proven across two completely different astrological domains. BaZi is a Chinese metaphysics system based on heavenly stems and earthly branches. Western astrology is a zodiac-based system built on planetary positions and aspects. Same architecture. Same test harness. Same rendering pipeline. Different constants.

**What's next:** The feature gap analysis is honest — we're at sun sign level while the market expects full natal charts (all 10 planets, houses, aspects, transits, progressions). The architecture scales there. The question is whether we want to.

**The real lesson:** When the template is right, adding a new domain is mostly transcription. The hard work happened in the template — the DotDict infrastructure, the compute/shape/render separation, the schema scaffolding, the test harness. Once that existed, the western build was mechanical. Phase 2 rigor made Phase 3 boring. That's the point.

---
## Session Log — Western Horoscope Build

| Time | Block | Action | Result |
|---|---|---|---|
| 0:00 | Spec | Wrote Design Spec v0.10B from scratch — 8 sections | Single-pass, clean |
| 0:15 | Spec | Peer Review 1 — caught placeholder gap in §2.7, missing cosmic_now | Fixed |
| 0:25 | Spec | Peer Review 2 — caught Jupiter index error (2024=Aries, not 2023), rejected unused table | Fixed |
| 0:35 | Code | Skeleton — copied from bazi_template, stripped domain, left infra | 106 assertions passing |
| 0:45 | Code | Block 1 — Constants (SIGN_DATES, SIGN_DATA, ELEMENT_PROFILE, QUALITY_PROFILE, ASPECT_TABLE, RULER_INFLUENCE) | 8 tests |
| 0:55 | Code | Block 2 — Compute Tier 2 (derive_sun_sign, derive_sign_profile, derive_jupiter_aspect) | 21 tests |
| 1:05 | Code | Block 3 — Compute Tier 1 (compute_western) | 10 tests |
| 1:15 | Code | Block 4 — Shape (shape_sign_profile, shape_running_year) | 14 tests |
| 1:25 | Code | Block 5 — Render (render_sign_profile_section, render_running_year_section) | 7 tests |
| 1:35 | Code | Blocks 6+7 — Registry wiring + variant tests | 106/106 total |
| 1:45 | Debug | Ran `--debug` — inspected out.json + out.html | Caught oracle bug, archetype placeholder |
| 2:00 | Polish | CSS western section — all .sign-*, .archetype-*, .nature-*, .traits-*, .year-* classes | Added ~60 lines |
| 2:10 | Polish | Closing refactor — Chinese quotes → Stoic (Marcus Aurelius + Seneca) | quote_first/quote_second pattern |
| 2:20 | Polish | Oracle removal — removed from western pipeline, kept interactive Cast | Clean |
| 2:30 | Polish | Archetype body narratives — all 12 signs | Replaced "..." placeholder |
| 2:40 | Polish | Fixed quote_second CSS class bug (underscore vs hyphen) | One character |
| 2:45 | Verify | `--test` 105/105, `--debug` cross-check, folder output | All clean |

**Total: ~3 hours including spec, reviews, code, and polish.**

Bugs caught pre-code (during spec): 4
Bugs caught post-code (during debug): 4
Structural rework needed: 0
