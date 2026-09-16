---
title: Your template router should cost O(1)
date: 2026-05-27
summary: Stuffing 434 templates into a prompt does not scale. BM25 pre-ranking over a generated manifest keeps prompt size flat no matter how large the catalogue grows.
tags: [LLM, Retrieval, Cost]
---

The first version worked beautifully with twelve templates. We listed all of them in the prompt, the model picked one, and the drafts were good.

Then we onboarded the Care department, which has 130 templates of its own, and the catalogue crossed 400 across 21 departments. Prompt size became a line item.

## The problem with "just put it in the prompt"

Listing every candidate has two costs that both scale linearly with catalogue size. Tokens are the obvious one. The subtler one is accuracy: a model choosing between 130 near-identical options makes worse choices than a model choosing between eight.

So the routing step needs to be sublinear in catalogue size, and ideally constant in prompt size.

## Pre-rank before you prompt

The fix is unglamorous and effective. An LLM generates a searchable manifest for each template once, offline. At request time, BM25 pre-ranks that manifest against the incoming ticket and passes only the top candidates to the model.

- Manifest generation: once per template, amortised to nothing
- Pre-ranking: classical retrieval, microseconds, no tokens
- Model call: a fixed small number of candidates, regardless of catalogue size

Prompt size stops tracking catalogue size. Add another 500 templates and the prompt does not move.

## Cache the run, not just the answer

The second lever is a Postgres metadata store that caches every run. Support agents rarely accept the first draft outright. They recreate it, or they polish it.

Without caching, each of those is a full pipeline execution: re-fetch the booking, re-OCR the attachment, re-query the knowledge base. With it, recreate and polish cost exactly one model call and zero re-fetches.

## Bound the self-improvement loop

Agent feedback is the most valuable signal the system produces and the easiest way to blow the token budget. Injecting every correction into every future prompt grows context without bound.

We inject feedback immediately for the current draft, then consolidate it into a single per-department learning once a batch threshold is reached. Quality compounds. Token spend stays flat.

## The pattern

Three ideas generalise well beyond template routing:

1. Move whatever you can out of the prompt and into classical retrieval.
2. Cache the expensive parts of the run, not only the final output.
3. Give every self-improving loop a consolidation step, or it will consume its own budget.
