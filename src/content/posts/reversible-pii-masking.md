---
title: Never send a customer name to a model
date: 2026-07-02
summary: A reversible masking layer that lets an LLM draft grounded support replies without ever seeing a real name, phone number, booking reference or card.
tags: [Privacy, LLM, Production]
---

The brief for our support drafting engine was simple to state and awkward to satisfy: generate grounded replies for real customer tickets, and never let personally identifiable information reach the model.

Redaction alone does not work. A reply that reads *"Dear [REDACTED], your booking [REDACTED] has been confirmed"* is useless. The information has to come back.

## Masking has to be reversible and stable

The approach is a single masking layer with two properties:

1. **Reversible.** Each entity maps to a named placeholder that can be swapped back after generation.
2. **Stable within a request.** The same customer must get the same placeholder in the query, in the OCR text pulled from an attachment, and in the enriched API response.

That second property is the one people miss. If your query masker and your API masker allocate placeholders independently, the model sees two different people and writes nonsense.

```python
masker = RequestMasker()            # one instance per request
query    = masker.mask(raw_query)
ocr_text = masker.mask(attachment_text)
booking  = masker.mask(api_payload)
# ... model call happens here, entirely on masked text ...
reply = masker.unmask(model_output)
```

We run Microsoft Presidio underneath, extended with the entity types that actually appear in travel support: booking IDs, PNRs, card fragments and multi-currency amounts.

## Attachments are where privacy leaks

Half of real tickets arrive as a screenshot. If your pipeline ignores attachments, the agent drafts blind. If it OCRs them carelessly, you have just created a new path for raw PII to reach the model.

We use a hybrid: a PyMuPDF text layer where the document has one, with a RapidOCR ONNX fallback for scans and screenshots. Every file is fetched concurrently and fails soft, so one corrupt attachment degrades the draft rather than failing the ticket.

Crucially, OCR output goes through the same masker instance as everything else.

## Degrade, do not fall over

A privacy layer that takes the product down is a privacy layer people route around. Every dependency has a fallback:

- No Presidio available, fall back to regex entity detection
- No model available, fall back to a mock that exercises the pipeline
- No knowledge base, draft from booking context alone

The system ships as a Docker Compose stack where each of those switches is a flag. It means the engine runs on a laptop with nothing installed, and it means a provider outage costs quality rather than availability.

## The result

The model never receives a real name, and the agent never sees a placeholder. Everything between those two facts is plumbing, and plumbing is where the interesting work usually is.
