---
title: "Two Degrees You Don't Expect in Tech: How Philosophy + MBA Shape My Approach to Systems Design and Debugging"
subtitle: "The physics of 4S: how Socrates, Scenario Planning, Systems Thinking, and Strategic Management forged a systematic and innovative tech lead"
date: 2024-03-31
categories: [Leadership, Philosophy, Systems Design, Career]
excerpt: "I have two degrees people don't expect in tech: Philosophy and an MBA in Strategic Management. Here's how they made me a better tech lead — and how they can help you too."
---


I have two degrees that raise eyebrows in tech interviews.
- **A Bachelor of Arts in Philosophy and Sociology.**  
- **An MBA in Strategic Management.**



Not Computer Science. Not Engineering. (Though I do have a Graduate Diploma in System Analysis from NUS/ISS and a Golang certificate from Ngee Ann Poly — but those were subsequent qualfications.)


When people hear this, they usually ask the same question: *"How did you end up as a Solutions Manager and also a Full Stack Developer?"*


The short answer: **The same skills that I learned from The Socratic Method, Kant's Category Theory, Heisenberg Uncertainty Principle, Boolean's Logic, Porter's Five Forces; or through modelling Newtonian classifcal physics into socio-ethnic relations — those same skills help me debug production outages at 3 AM and design systems that are award winning.**


In other words, it's the art and science of solutioning — what I call **the physics of 4S** - a tested methodology that works across industries.


---


## The 4S Framework

Over two decades of building systems for logistics, fintech, travel, and telco, I've realized that my non-traditional education gave me something most pure CS degrees don't:

| The 4S | Discipline | What It Teaches |
|--------|------------|-----------------|
| **Socrates** | Philosophy | First principles. Questioning assumptions. Logic. |
| **Scenario Planning** | MBA | Future-proofing. Preparing for multiple outcomes. |
| **Systems Thinking** | Both | Seeing interconnections. Whole > parts. |
| **Strategic Management** | MBA | Resource allocation. Long-term vision. Execution. |

Let me walk through them with some real stories from my career.


---


## 1. Socrates: First Principles and the Ghost Bug

Philosophy taught me one thing above all: **question everything.**

In my second year of undergrad sociology, I saw a connection between classical physics and what I deemed "social physics." I wrote a paper for SC 303 (Ethnic Relations) that cross-applied Newtonian physics to social group dynamics.

It was a risky choice. But to this day, I am grateful to the open-minded professor who validated it — calling it "brilliant, original, contemplative, extremely analytical" and scoring it an extreme **9/10**.

**The story:** At Thales GTS, I was recruited specifically for a ticket that had been open for years — one where veteran C++ engineers and external consultants had given up. The NEL MRT line's tunnel ventilation fan would randomly turn on and off by itself — intermittently, about once a year. A "ghostly bug."

After some investigation, I decided to build a Pandas/Python log analyzer to sift through 1M+ lines of semi-structured log data scattered across multiple rotated files. The process was tedious and the outcome was not assured — but I would have escalated to the next hypothesis to examine. Then, **voilà!** The analyzer revealed something everyone had missed: the fan events likely occurred due to primary/standby state transitions.

```python
import pandas as pd
import re

def parse_log_line(line):
    pattern = r'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(\w+)\] (.+)'
    match = re.match(pattern, line)
    return match.groups() if match else None
```


### This simple parser++ laid to rest a multi-year year-old bug

The root cause? Likely a copy-paste error in a state transition handler, within a C language code-base that has seen multi-generations of 'trendy' coding styles, and patches-upon-patches - a scenario unfortunately not too un-common. 

**The lesson:** Often-times, the solutions is 'out-of-the-box'.


----------


## 2. Scenario Planning: Future-Proofing Against the Unknown

The MBA (Strategic Management) helped cement ideas not always taught in engineering programs: **the future is not a single mechanical convergence, but a multiverse of S-curve possibilities.**

Scenario planning is the discipline of preparing for multiple plausible futures — not predicting which one will happen, but building systems robust enough for any of them. In systems design, this becomes future road-mapping and envisioning a system-next even before the first line of code.

**The story:** At Integral, I was head-hunted as a Solutions Manager and were competing against key vendors like Currenex/Bloomberg to deliver a retail FX trading platform for a major bank. The RFP-to-approval process took a stretch of over two years and involved working with multiple parties including regulators (MAS, BNM). 

**Long story short** -  As the Solution Lead for a new entrant to Asia, we won Singapore's first MAS-approved retail FX system which delivered an end-to-end trading solution from connecting market-making liquidity providers down to retail clickers.

A pure technical approach would have focused solely on the platform's capabilities, and would end like all others before - it would have not won approval.

Instead, scenario-planning, understanding salient and implicit requirements and knowing-your-real-customer was one critical factor:

| Scenario | Regulatory Requirement | Technical Implication |
| --- | --- | --- |
| MAS approves with strict data isolation | Data cannot leave Singapore | On-premise deployment |
| BNM requires cross-border audit trails | Full transaction logging | Immutable audit store |
| Both regulators demand real-time reporting | API to regulatory systems | Webhook architecture |

We packaged a custom solution that exceeded both technical requirements (handling high-volume spikes without crashing — some competitors' systems froze) and unspoken client concerns (cloud-based solutions were technically correct but taboo back then).

**The lesson:** Scenario planning imbues a flexibility in thinking and solutioning while remaining core.


----------


## 3. Systems Thinking: Seeing the Whole, Not Just the Parts

Systems thinking is the one discipline that sits at the intersection of Philosophy and MBA.

From Philosophy, we see the whole, not just the parts — and that the sum can be greater than its parts. Relationships between components often matter more than the components themselves.

From the MBA, we see that organizations, markets, and supply chains are systems themselves — that vertical and horizontal alignments are key to organizational success, becoming one.

**The story:** At FedEx, I built a wireless scanning system for our Singapore airport customs clearance. We exceeded requirements by delivering scan throughput of 7K pieces per hour with response time under 5 seconds - something not common then.

Peer System Analysts would focus only on the system — over-architecting Enterprise Java Beans or micro-optimizing low-level C++ algorithms — while I took a macro "Process Engineering" approach.

For instance, I introduced:
 - **Two monitors** to reduce operator fatigue and mistakes (back then it needed justification as monitors were expensive)
 - **Java Server Pages** — while the industry was still mostly on 2-tier client-server models
 - **Pair programming** for my team — long before it became a buzzword
     
The result? 7,000 pieces per hour, < 5 second average response time — better than the industry standard of >10 seconds, and delivering ahead of time and specs with a system that attained 99.9% service delivery level, and process improvements of more than 25%++. 

**The lesson:** True service improvements often comes not from optimizing a component in isolation. Systems thinking means understanding the environment, the workflow, the people, and the legacy constraints. Focusing on a component often means just shifting to the next bottleneck.


----------


## 4. Strategic Management: The Ironic Truth About Long Run Productivity

One of my MBA paper was the idea that may have seemed controversial: **organizations that focus on maximizing fully their employees' labor may be value destroying innovation in the longer run.**

In other words: **idle hours are necessary for innovation** - and innovation is a critical differentiator in an ever increasing competitive world.

I postulated that a learning and innovative organization needs to have idle hours — time for exploration, reflection, and creative cross-pollination. CEOs and CTOs looking at organizational design need to be integrative of process, structure, culture, and technology.

Similar ideas were later implemented in the US at Google, the Magnificent 7, and other startups — but not as much here in Asia.

**The lesson:** Management isn't just about resource allocation — it's about understanding that human creativity is the ultimate resource. Hence, senior management needs to make allowances for creativity space-and-time in order to foster a long-running learning and innovative organization.


----------


## The Synthesis

After 20+ years, here's what I've learned:

| Traditional Tech Lead | Systematic & Innovative Tech Lead |
|------------------------|-----------------------------------|
| Optimizes the code     | Optimizes the system             |
| Fixes the bug          | Questions why the bug was possible |
| Builds for today       | Scenarios for tomorrow           |
| Manages resources      | Cultivates creativity            |


Philosophy taught me to **question assumptions.**  
Scenario Planning taught me to **prepare for multiple futures.**  
Systems Thinking taught me to **see the whole picture but be systemmatic in approach.**  
Strategic Management taught me that **people are the real resource.**


----------


## Key Takeaway

**Your 'unexpected' background can be an asset** — Physics, Philosophy, Programming, Sociology and the Liberal Arts — combining Arts and Science to deliver a holistic solution. And having multi-domain knowledge means you have an extra tool to use.


----------


## Further Reading
- **Coming soon:** "How I Fixed a Ghost Bug That Stumped Engineers for Years" — the full story of the MRT fan incident
- **Coming soon:** *"How I Took Jenkins Builds from 3+ Hours to Under 1 Minute"* — 100X pipeline optimization
- **Coming soon:** "Building Singapore's First MAS-Approved Retail FX Platform" — beating Currenex and Bloomberg
