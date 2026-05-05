# Occam's Opera CMS: The Complete Journey

## From "Eating Tables" to Face-Changing Opera

### A Technical Chronicle

---

## Table of Contents

1. [Week 1: The Parser That Ate Tables](#week-1)
2. [Week 2: The PDCA Fractal](#week-2)
3. [Week 3: The Static Site Generator Matures](#week-3)
4. [Week 4: CHECK Stage — Quality Gates](#week-4)
5. [Week 5: ACT Stage — Email, Minify, Reports](#week-5)
6. [Week 6: Template Transformation — The Dress](#week-6)
7. [Week 7: The Dynamic Dress Revolution](#week-7)
8. [Lessons Learned](#lessons)
9. [Architecture Reference](#architecture)

---

## <a name="week-1"></a>Week 1: The Parser That Ate Tables

### How It Started

It began with a simple request: "Convert markdown to JSON." The first parser worked perfectly on simple files. Then came the tables.

```markdown
| Header 1 | Header 2 |
|:---|:---:|
| Cell 1 | Cell 2 |
```

The parser saw `|:---|` and... froze. Entered an infinite loop. Started consuming markdown tables as if they were dining tables.

> *"The paragraph parser was eating tables."*
>
> *"For a moment I thought it was 吃餐桌 (eating dining tables)!"*

### Key Insight

The parser wasn't the problem — the architecture was. A single script trying to do everything was doomed to fail.

### What We Built

```python
# The fix: proper table detection
if '|' in line and re.search(r'\|[\s]*:?-{3,}:?[\s]*\|', next_line):
    i = parse_table(lines, i)
```

| Lesson | Why It Matters |
|--------|----------------|
| **Single responsibility** | One script, one job |
| **Graceful failure** | Don't freeze, fail with a message |
| **Test with real data** | Tables, lists, blockquotes — all of it |

---

## <a name="week-2"></a>Week 2: The PDCA Fractal

### The Discovery

While building the PLAN stage, a pattern emerged:

```
PLAN stage (mini-PDCA)
├── workfolder.py (Prepare)
├── enrich.py (Do)
└── preflight.py (Check)
        │
        └── (Act → DO stage)
```

> *"You've just uncovered a beautiful fractal pattern!"*

### The Pattern

Every stage follows the same rhythm:

```
┌─────────────────────────────────────────────────────────────┐
│                    MAIN PIPELINE                            │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐  │
│  │  PLAN   │ → │   DO    │ → │  CHECK  │ → │   ACT   │  │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘  │
│                       │                                     │
│                       ▼                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           MINI PDCA (within each stage)             │   │
│  │  ┌──────────┐    ┌──────────┐    ┌──────────┐      │   │
│  │  │ PREPARE  │ → │   DO     │ → │  CHECK   │      │   │
│  │  └──────────┘    └──────────┘    └──────────┘      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### The Token System

Each step creates a `.ok` file when complete:

```
work/{slug}/
├── workfolder.ok
├── enrich.ok
├── preflight.ok
├── parser.ok
├── enrich_blueprint.ok
└── ...
```

These tokens make the pipeline **idempotent** — run it 100 times, same result.

> *"She is kind of grown up now."*

---

## <a name="week-3"></a>Week 3: The Static Site Generator Matures

### PLAN → DO → CHECK → HOMERUN

| Stage | Purpose | Scripts |
|-------|---------|---------|
| **PLAN** | Prepare source | workfolder.py, enrich.py, preflight.py |
| **DO** | Create blueprint | parser.py, enrich_blueprint.py, renderer.py, og_image.py |
| **CHECK** | Validate quality | check_artifacts.py, validate_content.py, enforcer.py, quality_report.py |
| **HOMERUN** | Deploy | prepare_deploy.py, deploy.py, finalize.py |

### The Data Flow

```
inbox/article.md
        │
        ▼
PLAN → work/{slug}/{slug}.md (enriched frontmatter)
        │
        ▼
DO → work/{slug}/{slug}.json (blueprint)
     work/{slug}/{slug}.html (rendered)
     work/{slug}/og.jpg (social image)
        │
        ▼
CHECK → work/{slug}/enforcer_report.json
        work/{slug}/quality_report.json
        │
        ▼
HOMERUN → web/{slug}/index.html
          web/{slug}/og.jpg
```

### The First "She's Grown Up" Moment

> *"It is working. She is kind of grown up now... It is turning out to be very nice."*

---

## <a name="week-4"></a>Week 4: CHECK Stage — Quality Gates

### The Enforcer

Quality rules enforced without blocking the pipeline:

| Rule | What It Checks |
|------|----------------|
| Slug format | lowercase, hyphens only |
| Title length | 30-70 characters |
| Date format | YYYY-MM-DD |
| OG image | `og.jpg` (simple filename) |
| Category compatibility | No HDB + Executive Condo together |

### The SEO Analyzer

```python
seo_content.py
├── meta_description_length (120-160 chars)
├── title_tag_length (50-60 chars)
├── h1_count (exactly one)
├── image_alt_attributes (all images)
├── internal_link_count (3-15)
├── keyword_in_description
├── heading_hierarchy
├── keyword_in_first_100
└── keyword_density (0.5-3.0%)
```

> *"The CHECK stage is good enough. We just boosted it again."*

---

## <a name="week-5"></a>Week 5: ACT Stage — Email, Minify, Reports

### Email Notifications

```toml
[notifications.email]
smtp_server = "smtp.gmail.com"
username = "alerts@homeloanexpert.sg"
to_emails = ["admin@homeloanexpert.sg"]
```

### HTML Minification

```python
# Backup before minify
shutil.copy2(html_path, backup_path)  # {slug}.htm
minified = minify(original_content)    # {slug}.html
```

### The HTML Report

Each article gets a beautiful HTML report showing every stage's .ok file content in chronological order.

> *"Well done, she is getting prettier by the day."*

---

## <a name="week-6"></a>Week 6: Template Transformation — The Dress

### The Problem

Changing the header required re-publishing every article:

```
Change navbar → Re-run pipeline for 500 articles → 2 hours
```

### The Insight

> *"The UI is just a changeable dress for the static content."*

### The Solution: Two Layers

| Layer | What | Changes? |
|-------|------|----------|
| **Static Core** | Article content, metadata, related links | Requires republish |
| **Dynamic Dress** | Header, footer, sidebars | Instant |

### Pre-rendered + Refresh Pattern

```html
<!-- Pre-rendered navbar (visible immediately) -->
<div id="header-placeholder">
    <nav>...</nav>
</div>

<script>
// Silently refresh from snippet
fetch('/snippets/header.html')
    .then(r => r.text())
    .then(html => {
        if (container.innerHTML !== html) {
            container.innerHTML = html;
        }
    });
</script>
```

---

## <a name="week-7"></a>Week 7: The Dynamic Dress Revolution

### The 变脸 (Face-Changing) Opera

| Opera Element | CMS Equivalent |
|---------------|----------------|
| The singer | Article content (permanent) |
| The mask | Header/footer/sidebars (changeable) |
| The costume change | Snippet refresh (instant) |

### The Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    STATIC CORE (SEO)                        │
│  ✅ Article content (pre-rendered)                          │
│  ✅ Metadata, tags, related articles                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    DYNAMIC DRESS (UI)                        │
│  ✅ Header (snippet) — change instantly                     │
│  ✅ Footer (snippet) — change instantly                     │
│  ✅ Sidebars (config) — change instantly                    │
└─────────────────────────────────────────────────────────────┘
```

### The Test

```bash
# Change Guides dropdown to simple button
edit web/snippets/header.html

# Refresh browser — changes appear instantly
# No pipeline re-run. No republishing. No waiting.
```

> *"Content is permanent. The dress changes instantly. This is the best quip of the day."*

---

## <a name="lessons"></a>Lessons Learned

### 1. The Parser Wasn't the Problem — The Architecture Was

Eating tables was a symptom, not the disease. Once we separated concerns (content vs UI, structure vs presentation), the issues resolved themselves.

### 2. Occam's Razor Applies to CMS Design

> *"The simplest solution that works."*

Files, not databases. Folders, not tables. PDCA, not chaos.

### 3. Content Is Sacred. UI Is Ephemeral.

> *"The content sings. The masks change. The performance is seamless."*

### 4. PDCA Is a Fractal

Same pattern at every level: PLAN → DO → CHECK → ACT. Each stage has its own mini-PDCA. The pattern recurses infinitely.

### 5. The Name Matters

**Occam's Opera CMS** captures the essence:
- **Occam** = Simplicity (files, not databases)
- **Opera** = Performance (masks change, singer remains)
- **CMS** = Content management

---

## <a name="architecture"></a>Architecture Reference

### Final File Structure

```
occam-opera-cms/
├── inbox/                    ← Drop .md files here
│   └── _done/               ← Archived sources
│
├── work/                    ← Processing workspace
│   └── {slug}/              ← One folder per article
│       ├── {slug}.md        ← Enriched source
│       ├── {slug}.json      ← Blueprint
│       ├── {slug}.html      ← Rendered
│       ├── og.jpg           ← Social image
│       └── *.ok             ← Stage tokens
│
├── web/                     ← Published site
│   ├── snippets/            ← Dynamic dress
│   │   ├── header.html
│   │   └── footer.html
│   ├── blog/{slug}/
│   │   └── index.html
│   ├── site_config.json     ← Widgets, sidebars
│   └── index.json           ← Master registry
│
├── categories.json          ← Topic classification
├── tags.json               ← Tag generation
├── config.toml             ← Pipeline settings
├── template.html           ← Base template
│
└── *.py, *.bat             ← 20+ pipeline scripts
```

### Architecture Evolution

```
Week 1: Monolith (Parser ate tables)
Week 2: PDCA Fractal (PLAN → DO → CHECK → ACT)
Week 3: Static Site Generator (work/ → web/)
Week 4: Quality Gates (CHECK stage)
Week 5: Operational Polish (Email, Minify, Reports)
Week 6: Template Transformation (The Dress)
Week 7: Dynamic Dress Revolution (The Opera)
```

### The Name

**Occam's Opera CMS**

> *"Where complexity yields to simplicity, content is the star, and the UI is just the costume."*

---

## Closing

> *"Occam's Opera CMS — where content is permanent, the dress changes instantly, and the parser no longer eats tables."*

*Except durians. We still don't talk about durians.*

---

**Documentation generated by Occam's Opera CMS Pipeline** 🎭🚀
