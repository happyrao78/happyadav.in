/**
 * Every word of site copy lives here. Edit this file to update the portfolio.
 * Nothing in src/components reads from anywhere else.
 */

export const profile = {
  name: 'Happy Yadav',
  initials: 'HY',
  role: 'Applied AI Engineer',
  location: 'Gurugram, Haryana, India',
  email: 'happy.yadav.ai@gmail.com',
  phone: '+91 85958 64036',
  resume: '/Happy_Yadav_AI_Engineer.pdf',

  // NOTE: confirm the LinkedIn handle below; it is the one field not present in the resume PDF.
  links: {
    github: 'https://github.com/happyrao78',
    linkedin: 'https://www.linkedin.com/in/happyrao78',
  },

  hero: {
    eyebrow: 'Applied AI Engineer',
    headline: ['Systems that', 'listen, reason', 'and answer'],
    // The word wrapped in _underscores_ renders in the display italic.
    lede:
      'I architect end-to-end AI systems, from _sub-second_ voice-to-voice streaming pipelines to agentic LLM platforms running in production across web, WhatsApp and telephony.',
    availability: 'Currently at EaseMyTrip',
  },

  about: {
    eyebrow: 'Profile',
    title: 'Production AI, not prototypes',
    paragraphs: [
      'I am an Applied AI Engineer with hands-on production experience building real-time voice AI systems, multi-channel conversational agents and LLM-powered backend pipelines.',
      'My core strength lies in architecting end-to-end AI systems: low-latency V2V (voice-to-voice) streaming pipelines using LiveKit, pipecat and WebRTC, through to LangChain-orchestrated chatbot services with MCP-based enterprise tool integrations.',
      'On the full-stack side I build scalable backend services in Python with FastAPI and frontend interfaces in React. I specialise in agentic AI systems, RAG pipelines, multi-provider LLM routing and real-time communication stacks, and I have shipped all of it into production across web, WhatsApp and telephony channels.',
    ],
    stats: [
      { value: '900ms', label: 'End-to-end voice turn budget', note: 'STT, turn detection, LLM and TTS' },
      { value: '434', label: 'Live support templates automated', note: 'Across 21 departments' },
      { value: '20+', label: 'Enterprise clients served', note: 'Over 100,000 records' },
      { value: '100+', label: 'Engineers mentored', note: 'Workshops, sprints and showcases' },
    ],
  },

  marquee: [
    'LiveKit',
    'pipecat',
    'WebRTC',
    'Deepgram',
    'LangGraph',
    'FastAPI',
    'MCP',
    'LiteLLM',
    'PostgreSQL',
    'Redis',
    'Docker',
    'React',
    'Groq',
    'Presidio',
    'Twilio',
  ],

  capabilities: {
    eyebrow: 'Practice',
    title: 'Four things I build well',
    items: [
      {
        index: '01',
        title: 'Real-Time Voice AI',
        body:
          'Channel-agnostic STT to turn-detection to LLM to TTS pipelines serving PSTN calls and in-browser widgets alike, tuned against a hard latency budget with per-stage instrumentation.',
        tags: ['LiveKit', 'WebRTC', 'Deepgram', 'µ-law / PCM', 'VAD', 'DeepFilterNet'],
      },
      {
        index: '02',
        title: 'Agentic Systems & RAG',
        body:
          'Multi-stage LangGraph pipelines with confidence-gated retries, tool-calling guard layers, grounded retrieval and evaluation loops that improve themselves without unbounded token spend.',
        tags: ['LangGraph', 'LangChain', 'RAG', 'Pinecone', 'FAISS', 'Prompt Engineering'],
      },
      {
        index: '03',
        title: 'LLM Platform Engineering',
        body:
          'Provider-agnostic inference proxies, factory patterns for hot-swapping models, token and latency accounting, evaluation harnesses and privacy-safe processing with reversible PII masking.',
        tags: ['LiteLLM', 'MCP', 'OpenAI', 'Anthropic', 'Gemini', 'Presidio'],
      },
      {
        index: '04',
        title: 'Full-Stack Product',
        body:
          'FastAPI services and React interfaces, containerised with Docker Compose, degrading gracefully at every dependency so a missing provider never takes the product down.',
        tags: ['FastAPI', 'React', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD'],
      },
    ],
  },

  experience: {
    eyebrow: 'Experience',
    title: 'Where I have shipped',
    roles: [
      {
        company: 'EaseMyTrip.com',
        title: 'Applied AI Engineer',
        period: 'Aug 2025 — Present',
        location: 'Gurugram, Haryana, India',
        current: true,
        summary:
          'Building the voice and conversational AI layer behind India’s largest online travel platform, across telephony, web, WhatsApp and ChatGPT.',
        projects: [
          {
            name: 'Multipurpose Real-Time Voice AI Agent',
            stack: ['Deepgram Nova-3', 'Groq', 'Murf', 'WebRTC', 'Acefone', 'PSTN'],
            points: [
              'Built one channel-agnostic voice pipeline, STT to turn detection to LLM to TTS, that serves both PSTN calls and an in-browser voice widget, with custom wire-format serializers (µ-law / PCM 8 kHz) for Acefone plus a WebRTC path for the web. Integrated Deepgram Nova-3 STT, Groq LLM and pluggable TTS (Murf, Gemini, Sarvam, OpenAI) behind a single provider-factory abstraction, tuned to a sub-900 ms end-to-end turn budget with per-stage STT, LLM and TTS latency instrumentation.',
              'Engineered natural conversation behaviour: sub-200 ms barge-in with a minimum-word threshold to reject background speech, contextual hold phrases when the LLM is slow, sequence watermarking so a stale reply is never spoken, and turn-fragment stitching so a request split across turns is not re-asked. Added a guardrail processor chain (regex-based tool-call, PII and markup muting, duplicate-speech suppression, Hindi digit and Devanagari normalisation) plus procedurally generated call-centre ambience, delivering a bilingual Hindi and English agent that reads as human on a live line.',
              'Designed a structured voice-action contract letting the LLM drive real telephony: mid-call warm transfer to a human agent, language switch, and hang-up gated on TTS playback completion so the action fires only after the bot finishes speaking. Built the supporting ops layer, a WebRTC playground for auditioning voices and sample rates with live latency charts, per-turn call records and dispositions, and structured JSON call logging with PII redaction.',
            ],
          },
          {
            name: 'EMT Chatbot, Multi-Channel Conversational AI',
            stack: ['LangChain', 'PostgreSQL', 'Redis', 'Groq', 'OpenAI'],
            points: [
              'Built the core chatbot service powering both the EaseMyTrip website and the WhatsApp bot, with persistent multi-turn context via PostgreSQL-backed JSONB chat history and Redis session caching.',
              'Implemented an LLM Factory pattern supporting dynamic provider switching between Groq and OpenAI with configurable temperature and model selection for cost-aware inference routing.',
              'Developed an optional-parameter extraction sub-chain that enriches tool calls with user-stated preferences without hallucinating unspecified values, significantly improving tool invocation accuracy. Also designed channel-aware system prompt management (website versus WhatsApp) with time-context injection to keep responses temporally accurate and channel-optimised.',
            ],
          },
          {
            name: 'WhatsApp Travel Bot',
            stack: ['Meta Webhooks', 'Redis', 'Docker', 'FastAPI'],
            points: [
              'Engineered a production WhatsApp bot integrated with the EMT chatbot service via Meta Webhook APIs, handling real-time message routing, session management and structured payload rendering for travel queries.',
              'Built Redis-backed session storage with configurable TTLs (session 1 hr, pending data 30 min) and a modular message-builder pipeline generating WhatsApp-compatible payloads including text, lists and interactive buttons. Added state-change logic to switch between AI and non-AI flows based on the user’s query, alongside real-time handoff to a customer agent.',
              'Collaborated with the infra team to deploy via Docker with a containerised Redis service, and integrated dev-tunnel support for local webhook testing against the Meta developer platform.',
            ],
          },
          {
            name: 'EMT Tools Ecosystem, MCP Tool-Calling Framework',
            stack: ['MCP', 'LangChain', 'Enterprise APIs', 'OTP Auth'],
            points: [
              'Contributed to the MCP-based tool ecosystem enabling dynamic enterprise API invocations: flight search, hotel lookup, train and bus booking, post and pre-booking operations, and OTP-based login.',
              'Designed channel-aware tool filtering with WhatsApp-specific exclusions, and an intent-classification guard layer that handles unsupported query types with a graceful main-menu fallback.',
              'Implemented a two-stage tool execution pipeline: a primary LLM tool-call chain for parameter extraction, followed by an optional-params enrichment sub-chain for precision-enhanced API invocations.',
            ],
          },
          {
            name: 'Easymail AI Automation',
            stack: ['LangGraph', 'Presidio', 'BM25', 'PyMuPDF', 'RapidOCR', 'Docker'],
            points: [
              'Built an agentic email-drafting engine that auto-generates grounded customer-support replies, replacing manual template hunting across 21 departments and 434 live templates. Architected a 10-stage LangGraph pipeline (intent detection, booking enrichment, template selection, draft, QA) with a confidence-gated retry loop: a strict LLM scorer grades each draft 0 to 100 and regenerates with targeted feedback below an 85 threshold, hard-capped at 3 attempts for bounded latency and cost.',
              'Engineered privacy-safe, zero-leak LLM processing using Microsoft Presidio with a reversible masking layer. Names, phones, booking IDs, PNRs, cards and multi-currency amounts are swapped for named placeholders before any prompt, with a single per-request masker keeping the map consistent across query, OCR text and enriched API data, then restored post-scoring. Added hybrid attachment OCR (PyMuPDF text layer with a RapidOCR ONNX fallback) so scanned tickets and screenshots become usable draft context, with per-file soft-failure and concurrent fetch.',
              'Designed a self-improving feedback loop and O(1)-cost template routing that scales with catalogue size. BM25 pre-ranking over an LLM-generated template manifest keeps prompt size flat even for the 130-template Care department, and a Postgres metadata store caches every run so recreate and polish need one LLM call and zero re-fetches of booking, OCR or KB APIs. Agent feedback is injected immediately, then consolidated into a single per-department learning at a batch threshold, bounding token spend while compounding quality. Shipped fully containerised with Docker Compose and graceful degradation at every dependency: mock LLM, regex PII, optional KB and persistence.',
            ],
          },
          {
            name: 'EaseMyTrip ChatGPT App',
            stack: ['MCP', 'ChatGPT Apps', 'Enterprise APIs'],
            points: [
              'Contributed to launching EaseMyTrip’s MCP-powered ChatGPT App by exposing enterprise travel APIs as production-ready MCP tools for conversational AI interactions inside ChatGPT.',
              'Worked on secure MCP tool integration, parameter extraction pipelines and channel-aware conversational workflows to support reliable enterprise-grade travel assistance, including hotel, flight and train discovery inside ChatGPT.',
            ],
          },
        ],
      },
      {
        company: 'Hunar.ai',
        title: 'Backend Developer Intern',
        period: 'Jun 2025 — Aug 2025',
        location: 'Gurugram, India',
        summary: 'Backend and data pipeline work on a reporting platform serving enterprise clients.',
        points: [
          'Designed and optimised PostgreSQL query pipelines for data extraction workflows serving 20+ enterprise clients with 100,000+ records, improving reporting efficiency by 30%.',
          'Built RESTful APIs and contributed to schema optimisation, reducing query execution time across core reporting modules.',
          'Explored LLM integration patterns and contributed to backend modules supporting AI-assisted features within the platform.',
        ],
      },
      {
        company: 'Coding Ninjas Club, Chitkara University',
        title: 'Technical Lead',
        period: '2023 — 2025',
        location: 'Punjab, India',
        summary: 'Ran the technical programme for the university’s largest engineering community.',
        points: [
          'Led technical workshops and mentored 100+ club members on AI and ML, full-stack development and competitive programming.',
          'Organised hackathons, coding sprints and project showcases, fostering a culture of applied engineering and product thinking.',
          'Guided juniors in building production-ready AI and web projects, strengthening the club’s technical presence at university and national levels.',
        ],
      },
    ],
  },

  projects: {
    eyebrow: 'Selected Work',
    title: 'Things I built on my own time',
    items: [
      {
        name: 'ComplaintHub',
        tagline: 'V2V voice pipeline for citizen grievance automation',
        year: '2025',
        stack: ['GPT-4o Realtime', 'Gemini Native Audio', 'Whisper', 'Silero VAD', 'Twilio', 'Exotel', 'FFmpeg'],
        points: [
          'Built a fully automated V2V (voice-to-voice) citizen complaint registration system where users interact entirely through natural speech over a live call, with no human agent involved. The pipeline ingests live audio, transcribes via ASR, reasons over an LLM and delivers a synthesised spoken response, completing the full complaint lifecycle end to end.',
          'Engineered the real-time audio stack using the GPT-4o-mini-realtime-preview model streaming for telephony via Twilio and Exotel, with custom G.711 µ-law converters, jitter buffer tuning, RTP optimisation and FFmpeg preprocessing.',
          'Integrated and ran a POC on three voice pipelines: OpenAI GPT-4o Realtime over the PCM16 WebSocket protocol, Gemini Native Audio Thinking Model, and a custom STT to LLM to TTS micro-pipeline (Whisper, Groq gpt-oss, Google Wavenet), with token-aware routing and latency-based model swapping to optimise cost and quality.',
          'Integrated Silero VAD with server-side threshold tuning and DeepFilterNet for real-time noise suppression, improving speech clarity and eliminating false-trigger interruptions in noisy call environments.',
          'Designed multi-stage NLP extraction to parse citizen intent, complaint category and brand details from unstructured voice input, persisting structured records to Redis with async PostgreSQL for durable storage.',
        ],
      },
      {
        name: 'Syntropy Labs',
        tagline: 'LLM evaluation and benchmarking platform',
        year: '2025',
        stack: ['FastAPI', 'LiteLLM', 'MongoDB', 'WebSocket', 'JWT', 'Google Cloud Storage'],
        points: [
          'Architected an LLM evaluation platform with four containerised microservices: an Orchestrator as the central API gateway for JWT auth, organisation and project management, dataset lifecycle and job orchestration; a Model Runner (FastAPI with LiteLLM) as a unified multi-provider LLM proxy; an Eval Engine (FastAPI) for automated metric scoring; and MongoDB for metadata persistence.',
          'Built the Model Runner as a provider-agnostic inference proxy using LiteLLM, normalising API calls across OpenAI, Anthropic, Gemini, Mistral and Azure into a single OpenAI-compatible interface with consistent token usage accounting and latency tracking per provider.',
          'Extended the Model Runner with a WebSocket-based Realtime Service supporting live voice evaluation, integrating the OpenAI Realtime API and Gemini BidiGenerateContent to enable audio-in and audio-out benchmarking of models inside the evaluation platform.',
          'Built the Eval Engine supporting statistical metrics, predefined LLM-as-judge metrics (relevance, groundedness, coherence, fluency) and fully custom evaluation criteria, each configurable with a judge model, scoring threshold and per-metric weight for composite pass or fail scoring.',
          'Implemented multimodal evaluation pipelines for AI-generated image and video outputs, scoring across structured JSON dimensions such as physics plausibility, anatomical correctness, semantic adherence, temporal consistency and aesthetic quality, using vision-capable LLMs as structured evaluators.',
          'Designed a progressive batch evaluation system where the Orchestrator persists per-row scores back to Google Cloud Storage hosted CSV datasets after every row, enabling real-time job progress polling from the frontend and partial result recovery on mid-job failures.',
        ],
      },
      {
        name: 'Aura.ai',
        tagline: 'Text-to-video AI SaaS platform',
        year: '2024',
        stack: ['RAG', 'Multilingual TTS', 'AR / VR', 'Analytics'],
        points: [
          'Built an AI SaaS platform that automates end-to-end video creation from text and document inputs, covering LLM-powered content summarisation, multilingual voiceover synthesis, sign language video generation and AR/VR scene integration, targeting accessibility in education and corporate training.',
          'Developed AuraBot, a knowledge-base-grounded assistant using a RAG pipeline for contextual Q&A over uploaded course or training material.',
          'Integrated an analytics dashboard tracking viewer engagement, quiz completion rates, comprehension scores and retention metrics, using this data to personalise content delivery per user learning profile.',
        ],
      },
    ],
  },

  stack: {
    eyebrow: 'Toolkit',
    title: 'The stack I reach for',
    groups: [
      { label: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'SQL'] },
      {
        label: 'Frameworks & Libraries',
        items: ['FastAPI', 'React', 'Node.js', 'Express.js', 'Redux', 'Streamlit', 'Selenium', 'BeautifulSoup'],
      },
      {
        label: 'AI & ML',
        items: [
          'LangChain',
          'LangGraph',
          'LangSmith',
          'RAG',
          'LLM Embeddings',
          'Prompt Engineering',
          'MCP',
          'UCP',
          'OFGA',
          'Pinecone',
          'FAISS',
          'LiteLLM',
        ],
      },
      {
        label: 'Voice & Real-Time',
        items: [
          'LiveKit (WebRTC)',
          'pipecat',
          'ASR',
          'WebSocket Audio Streaming',
          'VAD',
          'Speaker Diarization',
          'STT / TTS pipelines',
          'DeepFilterNet',
          'Twilio',
          'Exotel',
          'µ-law',
          'FFmpeg',
        ],
      },
      { label: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Firestore'] },
      { label: 'Tools', items: ['Git', 'Docker', 'Google Cloud', 'Firebase', 'LiteLLM', 'UV', 'Husky', 'Ngrok', 'Cloudflare'] },
      {
        label: 'Architecture',
        items: ['REST API Integrations', 'Microservices', 'Monolithic', 'Async Pipelines', 'CI/CD'],
      },
    ],
  },

  recognition: {
    eyebrow: 'Recognition',
    title: 'Selected results',
    items: [
      {
        place: 'Top 22 National Finalist',
        detail: 'Social Buzz Winner',
        event: 'Bajaj Finserv HackRx 5.0',
        year: '',
      },
      {
        place: 'Top 50 Finalist',
        detail: 'Hosted by OpenAI, AWS and ElevenLabs',
        event: 'Cars24 Token’26',
        year: '2026',
      },
      {
        place: 'Winner',
        detail: 'Hosted by Delhi Technological University',
        event: 'Aditya Birla Group SynaptiX Hackathon’25',
        year: '2025',
      },
      {
        place: 'Selected',
        detail: 'Microsoft, Gurgaon',
        event: 'GitHub Field Day’24',
        year: '2024',
      },
      {
        place: 'First Runner-Up',
        detail: 'Chitkara University',
        event: 'FusionFest Hackathon',
        year: '',
      },
      {
        place: 'Finalist',
        detail: 'Social Buzz Winner, Delhi Technological University',
        event: 'Vihaan 7.0',
        year: '',
      },
    ],
  },

  education: {
    eyebrow: 'Education',
    degree: 'Bachelor of Computer Applications',
    field: 'Information Technology',
    institution: 'Chitkara University',
    location: 'Punjab, India',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Let us build something that _ships_',
    body:
      'Open to conversations about real-time voice AI, agentic systems and LLM platform work. The fastest way to reach me is email.',
  },
};

export default profile;
