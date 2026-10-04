---
title: What Uber's real-time data platform taught me about building AI systems
date: 2026-10-05
summary: Uber had to make petabytes of fresh data useful to thousands of services and people at once. This reading explains the problem Uber faced and what the paper teaches an applied AI engineer.
tags: [Research paper, Real-time systems, Data infrastructure, AI engineering]
source: https://arxiv.org/abs/2104.00087
sourceName: Real-time Data Infrastructure at Uber (SIGMOD 2021)
citation: Yupeng Fu and Chinmay Soman. 2021. Real-time Data Infrastructure at Uber. In Proceedings of the 2021 International Conference on Management of Data (SIGMOD '21). ACM. DOI 10.1145/3448016.3457552.
---

This reading covers the research paper *Real-time Data Infrastructure at Uber* by Yupeng Fu and Chinmay Soman, published at SIGMOD 2021. I read it as an applied AI engineer, so I focus on what carries over to AI products.

Highlighted terms show a short definition when you hover over them, or tap them on a phone.

# Uber needed fresh data to be useful to everyone at the same time

## Every trip and every order creates a stream of events

Every ride request, driver acceptance, payment and food order is recorded as an ==event==. These events come from thousands of ==microservices==. According to the paper, as of October 2020 they added up to trillions of messages and petabytes of data per day.

Storing that data was not the hard part. The hard part was that many teams needed it within seconds, each for a different reason. Pricing needed live supply and demand to calculate ==surge pricing==. Restaurant owners needed a dashboard that loads instantly. Machine learning teams needed to know whether thousands of models were still accurate.

## The requirements pulled in opposite directions

The paper lists seven requirements: ==consistency==, ==availability==, ==freshness==, ==query latency==, ==scalability==, cost and flexibility. At Uber's scale, no single system can maximise all of them, so each use case has to choose.

Surge pricing chose freshness and availability over consistency, because the ==CAP theorem== makes it impossible to guarantee everything at once. Late messages are simply left out. A price based on slightly incomplete data from a few seconds ago is useful. A perfect price that arrives after the rider has booked is not.

A financial dashboard makes the opposite choice, because every number must be correct. The same platform has to support both.

## Uber split the platform into layers with one job each

- **Stream.** ==Apache Kafka|Kafka== carries events to every system that needs them.
- **Compute.** ==Apache Flink|Flink== processes events as they arrive.
- **OLAP.** ==Apache Pinot|Pinot== answers ==OLAP== queries in under a second.
- **SQL.** ==Presto== lets people query live data with standard SQL.
- **Storage.** ==HDFS== keeps the full history of raw data.

Surge pricing uses them together. It reads events from Kafka, runs a machine learning calculation in Flink for each small ==geofence==, and writes the result to a fast key-value store.

# This paper changed how I think about AI systems

## Real-time is a number, not a feeling

Uber's restaurant dashboard needed queries to return in under one second for 99 percent of requests, which is what ==p99 latency== measures.

AI products need the same precision. "The voice agent should feel fast" is not a requirement. "It should start replying within 900 milliseconds" is one, and that number decides which providers can be used at all.

## The model is one layer, and the layers around it decide the result

Surge pricing runs a model, but the paper spends most of its pages on how data arrives, how it is processed, where it is stored and how failures are handled.

The same is true for AI. In a ==RAG== system, a stronger language model cannot fix a document that was never indexed.

## Preparing data and answering questions are separate jobs

Flink pre-aggregates restaurant orders in advance, so Pinot only reads small summaries when the page loads. In AI systems, creating ==embeddings== is preparation and retrieval is serving. Keeping them apart lets the first be thorough and the second be fast.

## A system you cannot replay is a system you cannot fix

Uber regularly needs to ==backfill==, which means rerunning old data after a bug fix, a logic change or to train a model. Kafka keeps data for only a few days, so Uber treats the history in HDFS as the ==source of truth== and built ==Kappa+== to run the same code on live or archived data.

For AI, this ==replayability== means a new prompt or model can be tested on last week's real conversations. That only works if the original inputs were kept.

## Failure handling has to be designed before anything breaks

By default, Kafka either drops a message that keeps failing or retries it forever and blocks the queue. Neither works for trip receipts. Uber added a ==dead-letter queue==, which moves the message aside after several retries so live traffic keeps flowing.

## Repeating an action must always be safe

Large systems use ==at-least-once delivery==, so a message can arrive twice. The answer is ==idempotency==. If you tap "Pay" twice on a slow connection, a well-built system sees the same request ID and charges you once.

An AI agent making a booking through a ==tool call== needs exactly the same protection.

# These are the principles I am taking forward as an applied AI engineer

- **Define requirements before choosing technology.** Freshness, p99 latency, failure behaviour and traffic at ten times today's load come first.
- **Keep the raw inputs.** Store each input, prompt version, model version and retrieved context, with personal data masked, so any result can be rebuilt.
- **Give every important action an ID.** Bookings and customer messages should check it before running, so retries stay safe.
- **Design the failure path.** Every dependency needs a timeout, a retry limit, a fallback and a dead-letter queue that someone reviews.
- **Treat monitoring as part of correctness.** Uber joins model predictions with real outcomes to measure accuracy live. Per-stage latency and quality scores give AI systems the same ==observability==.
- **Build shared building blocks.** Uber's self-service tools let teams start from a working base instead of an empty folder.

# Building AI systems is mostly systems engineering

The hardest problems sit around the model, not inside it. Uber's pricing works because events arrive reliably, are processed in time, can be replayed and cannot block each other when one fails.

A good model gives a good answer in a demo. Clear requirements, replayable data, safe retries and honest monitoring keep that answer good on the thousandth request.

Everything this reading says about Uber comes from the paper. The lessons drawn from it are my own view as an applied AI engineer.

*[Event]: A small record that something happened, such as "trip started" or "order placed", along with when it happened.
*[Microservices]: An approach where a large application is built as many small, independent services that each do one job and talk to each other over the network.
*[Surge pricing]: Uber's dynamic pricing, which raises prices in an area when demand for rides is higher than the number of available drivers.
*[Consistency]: Whether every part of a distributed system sees the same, correct version of the data at the same time.
*[Availability]: The ability of a system to keep answering requests even when some of its parts have failed.
*[Freshness]: How close the data being used is to what is happening right now. Fresh data is only seconds old.
*[Query latency]: The time between asking a system a question and getting the answer back.
*[Scalability]: The ability of a system to handle more data, more users or more traffic without slowing down or breaking.
*[CAP theorem]: A principle of distributed systems: when the network between machines fails, a system must choose between staying consistent and staying available.
*[Kafka]: Apache Kafka, an open-source platform that receives streams of events and delivers them reliably to every system that subscribes to them.
*[Flink]: Apache Flink, an open-source engine that processes streams of events continuously as they arrive, for example by filtering, joining or counting them.
*[Pinot]: Apache Pinot, an open-source database built to answer analytical questions over large, constantly updating data in well under a second.
*[OLAP]: Online Analytical Processing: systems designed to answer analytical questions, such as totals and trends, over large amounts of data.
*[Presto]: An open-source SQL engine that runs fast interactive queries across many different data stores.
*[HDFS]: Hadoop Distributed File System, which stores very large files across many machines. Uber uses it as the long-term home for all its data.
*[Geofence]: A virtual boundary drawn around a geographic area. Uber calculates surge pricing separately for each small hexagon-shaped area.
*[p99 latency]: The response time that 99 percent of requests stay under. It shows how slow the worst common cases are, not just the average.
*[RAG]: Retrieval-Augmented Generation: an AI pattern that first finds relevant documents and then gives them to the language model to base its answer on.
*[Embeddings]: Lists of numbers that represent the meaning of a piece of text, so that texts with similar meanings can be found quickly.
*[Backfill]: Running historical data through a pipeline again, for example after fixing a bug or changing the processing logic.
*[Source of truth]: The original, trusted copy of data from which every other result can be rebuilt.
*[Kappa+]: Uber's approach to backfill, which runs the same stream processing code on archived historical data instead of only on live events.
*[Replayability]: The ability to feed past inputs through a system again and reproduce or rebuild its results.
*[Dead-letter queue]: A separate holding area for messages that keep failing, so they can be inspected or retried later without blocking everything else.
*[At-least-once delivery]: A delivery guarantee where every message is sure to arrive, but some may arrive more than once.
*[Idempotency]: Designing an action so that running it twice has the same effect as running it once, which makes retries safe.
*[Tool call]: When an AI model asks the surrounding application to run a specific function, such as searching flights or creating a booking.
*[Observability]: The ability to understand what a system is doing from the outside, using logs, metrics and traces.
