---
title: The latency budget is the product
date: 2026-08-18
summary: What it actually takes to hold a voice agent under 900 milliseconds per turn, and why every architectural decision downstream follows from that one number.
tags: [Voice AI, Latency, Architecture]
featured: true
---

Every voice agent I have shipped starts the same way. Before choosing a model, a vendor or a transport, I write down one number: the end-to-end turn budget. For the agent behind our telephony and web channels, that number was 900 milliseconds.

It sounds like a constraint. It is really a design document.

## Why the number comes first

A voice turn is not one request. It is a chain, and the chain has four links:

1. Speech to text, streaming
2. Turn detection, deciding the caller actually stopped
3. The LLM, producing a reply
4. Text to speech, producing audio the caller hears

Nobody experiences the average. They experience the sum. If each stage quietly takes 300 ms you have already lost, and no amount of prompt engineering will make the conversation feel human.

So the budget gets split before anything is built, and every stage carries its own instrumentation from the first commit. Not a dashboard added later. Per-stage timings emitted on every single turn, in production, from day one.

## The transport decides more than you think

We needed one agent to serve two very different channels: PSTN calls arriving through a telephony provider, and an in-browser voice widget.

The naive approach is two codebases. The better approach is one pipeline with pluggable wire formats. Telephony speaks µ-law at 8 kHz. The browser speaks WebRTC. Everything between the serializer and the deserializer is identical.

> One channel-agnostic pipeline. Two wire formats. Zero duplicated conversation logic.

That single decision is what made it possible to fix a barge-in bug once instead of twice.

## Provider factories, not provider commitments

Under the latency budget, model choice is an operational lever, not an architectural one. A factory abstraction sits in front of STT, LLM and TTS, so swapping a TTS vendor is a configuration change rather than a refactor.

```python
tts = TTSFactory.create(
    provider=settings.tts_provider,   # murf | gemini | sarvam | openai
    voice=settings.tts_voice,
    sample_rate=8000,
)
```

The value shows up the day a provider degrades at 9 pm and you move traffic without a deploy.

## The parts nobody writes about

Hitting the budget gets you a fast agent. It does not get you a good one. The behaviours that made callers stop asking whether they were talking to a machine were all small:

- **Barge-in with a minimum-word threshold.** Sub-200 ms interruption is table stakes, but raw voice activity detection will cut the agent off for a cough or a passing car. A minimum-word gate before honouring the interruption removes almost all of it.
- **Contextual hold phrases.** When the LLM is slow, silence reads as a dropped call. A short, context-aware acknowledgement buys real time.
- **Sequence watermarking.** If a reply arrives after the conversation has moved on, it must never be spoken. Watermark every turn and discard stale audio.
- **Turn-fragment stitching.** People pause mid-sentence. If you treat each fragment as a complete request, you ask them to repeat themselves, and they notice.

## What I would tell my earlier self

Instrument first. Pick the number before the vendor. Treat the wire format as a plugin. And budget as much engineering time for the conversational edges as for the pipeline itself, because the pipeline is what makes it fast and the edges are what make it feel human.
