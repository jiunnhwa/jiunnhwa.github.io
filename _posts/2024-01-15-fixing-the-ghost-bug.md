---
title: "How I Fixed a 'Ghostly' Bug That Stumped Engineers for 3 Years"
date: 2024-01-15
categories: [Debugging, Technical Deep Dive]
excerpt: "The NEL MRT line had a strange problem: the tunnel's ventilation fan would randomly turn on by itself, approximately once a year. Here's how we finally solved it using Python and Pandas."
---

## The Mystery

The NEL MRT line had a strange problem: the tunnel's ventilation fan would randomly turn on by itself, approximately once a year. No pattern. No error logs. No reproduction steps.

For 3 years, veteran C++ engineers and external consultants couldn't solve it.

## My Approach

When I joined Thales GTS, this was the first ticket handed to me. Here's the methodology I used:

### 1. Build a Log Analyzer

The logs were massive - 1M+ lines across multiple rotated files. I built a dynamic Pandas/Python log analyzer that could:

- Parse semi-structured log data efficiently
- Correlate events across multiple files
- Identify patterns that humans couldn't see

```python
import pandas as pd
import re

def parse_log_line(line):
    pattern = r'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(\w+)\] (.+)'
    match = re.match(pattern, line)
    return match.groups() if match else None
```

2. Narrow Down the Root Cause
The analyzer revealed something interesting: the fan events always occurred during primary/standby state transitions. The issue was likely a leaky state problem caused by copy-pasted code sections.

3. Reverse Engineer 100K+ LOC
I created a pseudo-code mapping and source graph to understand the control flow. The 100,000+ lines of C++ code had deep-nested if-statements that made debugging nearly impossible.

4. The Fix
The root cause was a copy-paste error where a state transition handler in the standby machine was incorrectly copying the alert state from primary, triggering the fan.

After refactoring:

Removed redundant code blocks

Fixed double-negative logic

Corrected state machine transitions

The Result
✅ Bug closed after 3+ years
✅ Customer KPI resolved for Comfortdelgro/LTA
✅ Refactored codebase for better maintainability

Key Lessons
Don't trust "impossible" bugs - they're always possible

Log analysis at scale requires automation

State machines need careful design to avoid copy-paste errors

Sometimes the best debugger is Python + Pandas

This experience reinforced my belief that cross-domain skills (Python data analysis + embedded C++ debugging) can solve problems that pure specialists miss.	