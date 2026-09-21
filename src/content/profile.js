/**
 * Every word of site copy lives here. Edit this file to update the portfolio.
 * Nothing in src/components holds copy.
 *
 * Markup helpers inside strings:
 *   _word_  renders in the teal accent
 *   *word*  renders in semibold ink
 */

export const profile = {
  name: 'Happy Yadav',
  wordmark: ['HAPPY', 'YADAV'],
  role: 'Applied AI Engineer',
  email: 'happy.yadav.ai@gmail.com',
  phone: '+91 85958 64036',
  resume: '/Happy_Yadav_AI_Engineer.pdf',

  links: {
    github: 'https://github.com/happyrao78',
    linkedin: 'https://www.linkedin.com/in/happy-yadav-16b2a4287',
    x: 'https://x.com/rao_happyy',
    reddit: 'https://www.reddit.com/user/happy_yadav',
  },

  handles: {
    github: 'happyrao78',
    linkedin: 'happy-yadav',
    x: 'rao_happyy',
    reddit: 'u/happy_yadav',
  },

  seo: {
    siteUrl: 'https://happyadav.in',
    title: 'Happy Yadav | Applied AI Engineer',
    description:
      'Applied AI Engineer building real time voice agents, multi channel chat systems and LLM evaluation platforms. Live in production across phone, web and WhatsApp.',
    image: '/og.png',
    imageAlt: 'Happy Yadav, Applied AI Engineer',
    keywords:
      'Applied AI Engineer, Voice AI, real time voice agents, LiveKit, pipecat, LangGraph, RAG, MCP, LLM evaluation, conversational AI, FastAPI, Happy Yadav',
    routes: {
      '/': {
        title: 'Happy Yadav | Applied AI Engineer',
        description:
          'Applied AI Engineer building real time voice agents, multi channel chat systems and LLM evaluation platforms. Live in production across phone, web and WhatsApp.',
      },
      '/blog': {
        title: 'Technical blogs | Happy Yadav',
        description:
          'Technical deep dives on real time voice systems, agentic pipelines and LLM evaluation, written from what actually shipped.',
      },
    },
  },

  hero: {
    eyebrow: 'Applied AI Engineer',
    headline: ['Applied AI that', '_holds up_.'],
    lede:
      'Voice agents that answer before you finish the question. Chat that remembers three messages back. And the harnesses that prove both actually work. *All of it live today.*',
    strip: [
      { label: 'Currently', value: 'EaseMyTrip' },
      { label: 'Also building', value: 'RentaLease, Placeholder' },
      { label: 'Focus', value: 'Voice, chat, multimodal' },
      { label: 'Scroll', value: 'To explore' },
    ],
  },

  logos: {
    label: 'Shipped for, backed by and recognised at',
    items: [
      { name: 'EaseMyTrip', src: '/logos/easemytrip.png' },
      { name: 'Hunar.ai', src: '/logos/hunar.png' },
      { name: 'Chitkara University', src: '/logos/chitkara.png' },
      { name: 'Bajaj Finserv', src: '/logos/bajaj.png' },
      { name: 'Cars24', src: '/logos/cars24.png' },
      { name: 'OpenAI', src: '/logos/openai.png' },
      { name: 'AWS', src: '/logos/aws.png' },
      { name: 'ElevenLabs', src: '/logos/elevenlabs.png' },
      { name: 'Microsoft', src: '/logos/microsoft.svg' },
      { name: 'GitHub', src: '/logos/github.svg' },
    ],
  },

  // Business outcomes only. Anything project specific lives on the project itself.
  metrics: {
    eyebrow: 'Impact',
    title: 'Outcomes, not _output_',
    note: 'Measured the way a business would measure it.',
    items: [
      {
        to: 100,
        suffix: 'K+',
        label: 'Conversations handled',
        line: 'Live customer conversations carried end to end. Every one answered on the first ring.',
      },
      {
        to: 20,
        suffix: '+',
        label: 'Clients served',
        line: 'Businesses that kept the systems running long after I handed them over.',
      },
      {
        to: 30,
        suffix: '%',
        label: 'Efficiency delivered',
        line: 'Time taken straight off the reporting cycle. Same team, same data, fewer hours.',
      },
      {
        to: 100,
        suffix: '+',
        label: 'Engineers mentored',
        line: 'Taken from following tutorials to shipping things other people actually use.',
      },
    ],
  },

  about: {
    eyebrow: 'Profile',
    title: 'Prototypes are easy. _Production_ is the job.',
    paragraphs: [
      'Most AI demos work once. Mine has to work on the thousandth call, at 2am, when a provider is timing out and the caller is standing next to a highway.',
      'That gap is where I spend my time: latency budgets, graceful degradation, privacy layers, evaluation harnesses, and the small conversational details that decide whether someone believes they are talking to a person.',
      'I work across the stack, Python and FastAPI on the backend, React on the front, containerised and instrumented so the thing that ships is the thing you can actually debug.',
    ],
    facts: [
      { label: 'Languages shipped', value: 'Hindi and English, in the same live agent' },
      { label: 'Deepest work', value: 'Real time audio, agentic graphs, LLM evaluation' },
      { label: 'Reply time', value: 'Same day, usually sooner' },
      { label: 'Open to', value: 'Voice AI and agentic platform engineering' },
    ],
  },

  capabilities: {
    eyebrow: 'What I do',
    title: 'Four things, done properly',
    items: [
      {
        index: '01',
        title: 'Real time voice',
        punch: 'No queue. No hold music. No “your call is important to us”.',
        body:
          'One pipeline serving phone calls and browser widgets alike, with interruption handling, contextual hold phrases and stale reply suppression tuned until nobody asks whether it is a bot.',
      },
      {
        index: '02',
        title: 'Conversational AI',
        punch: 'It remembers what you said three messages ago.',
        body:
          'Persistent multi turn context, channel aware prompting, and tool calling that asks for exactly what it needs and refuses to invent the rest.',
      },
      {
        index: '03',
        title: 'Multimodal and agentic',
        punch: 'Send a screenshot. It reads it and gets on with the job.',
        body:
          'Voice, text, documents and images into one graph, with OCR fallbacks, reversible masking and retry loops that know when a draft is not good enough to send.',
      },
      {
        index: '04',
        title: 'Evaluation and benchmarking',
        punch: 'If you cannot score it, you cannot ship it.',
        body:
          'Judge model metrics, fully custom criteria, multimodal scoring for generated image and video, and live audio benchmarking across five providers.',
      },
    ],
  },

  ventures: {
    eyebrow: 'Building now',
    title: 'Two products, _in build_',
    note: 'Side by side with my og team, shipped the same way as everything else.',
    items: [
      {
        name: 'RentaLease',
        domain: 'rentalease.in',
        url: 'https://www.rentalease.in/',
        status: 'In build',
        punch: 'Zero brokerage. See what your neighbours actually pay.',
        body:
          'A rent map built on real numbers instead of listings. Renters post what they pay anonymously, browse what everyone around them pays, find flatmates and reach owners directly. No brokers in the middle, no signup wall, free to use.',
        tags: ['Marketplace', 'Zero brokerage', 'Community data'],
      },
      {
        name: 'Placeholder',
        domain: 'placeholderworks.com',
        url: 'https://placeholderworks.com/',
        status: 'In build',
        punch: 'AI engineering and implementation. Shipped, not scoped.',
        body:
          'A studio that builds the systems we have already run in production: voice agents, retrieval grounded assistants and agentic automation, delivered as working software with instrumentation and a handover, rather than a deck.',
        tags: ['AI studio', 'Voice and agents', 'Implementation'],
      },
    ],
  },

  experience: {
    eyebrow: 'Experience',
    title: 'Where the work actually runs',
    note: 'Open any project for the numbers and the reasoning behind it.',
    roles: [
      {
        company: 'EaseMyTrip.com',
        logo: '/logos/easemytrip.png',
        title: 'Applied AI Engineer',
        period: 'Aug 2025 to Present',
        current: true,
        summary:
          'The voice and conversational AI layer behind one of India’s largest online travel platforms. Phone, web, WhatsApp and ChatGPT, all answering off the same backend.',
        projects: [
          {
            name: 'Real time voice AI agent',
            punch: 'Picks up on the first ring. Answers before you finish asking.',
            stats: [
              { value: '900ms', label: 'End to end turn budget' },
              { value: '200ms', label: 'Barge in response' },
              { value: '2', label: 'Wire formats, one pipeline' },
            ],
            stack: ['Deepgram Nova-3', 'Groq', 'Murf', 'WebRTC', 'Acefone', 'PSTN'],
            points: [
              'Built one channel agnostic voice pipeline, speech to text into turn detection into LLM into speech, that serves both PSTN calls and an in browser voice widget, with custom wire format serializers (µ-law and PCM at 8 kHz) for Acefone plus a WebRTC path for the web. Integrated Deepgram Nova-3, Groq and pluggable TTS (Murf, Gemini, Sarvam, OpenAI) behind a single provider factory, tuned to a sub 900 ms end to end turn budget with per stage latency instrumentation.',
              'Engineered natural conversation behaviour: sub 200 ms barge in with a minimum word threshold to reject background speech, contextual hold phrases when the model is slow, sequence watermarking so a stale reply is never spoken, and turn fragment stitching so a request split across turns is not asked twice. Added a guardrail processor chain covering tool call and markup muting, PII suppression, duplicate speech removal, Hindi digit and Devanagari normalisation, plus procedurally generated call centre ambience, delivering a bilingual Hindi and English agent that reads as human on a live line.',
              'Designed a structured voice action contract that lets the model drive real telephony: mid call warm transfer to a human agent, language switch, and hang up gated on playback completion so the action fires only after the bot finishes speaking. Built the supporting ops layer, a WebRTC playground for auditioning voices and sample rates with live latency charts, per turn call records and dispositions, and structured JSON call logging with PII redaction.',
            ],
          },
          {
            name: 'Multi channel conversational AI',
            punch: 'One brain. Every channel. Same memory.',
            stats: [
              { value: '2', label: 'LLM providers, hot swapped' },
              { value: '2', label: 'Channels off one service' },
            ],
            stack: ['LangChain', 'PostgreSQL', 'Redis', 'Groq', 'OpenAI'],
            points: [
              'Built the core chatbot service powering both the website and the WhatsApp bot, with persistent multi turn context via PostgreSQL backed JSONB chat history and Redis session caching.',
              'Implemented an LLM factory pattern supporting dynamic provider switching between Groq and OpenAI, with configurable temperature and model selection for cost aware inference routing.',
              'Developed an optional parameter extraction sub chain that enriches tool calls with user stated preferences without hallucinating unspecified values, measurably improving tool invocation accuracy. Designed channel aware system prompt management with time context injection so replies stay temporally accurate and optimised per channel.',
            ],
          },
          {
            name: 'WhatsApp travel bot',
            punch: 'Books a flight in the same chat you send memes in.',
            stats: [
              { value: '1 hr', label: 'Session TTL' },
              { value: '30 min', label: 'Pending data TTL' },
            ],
            stack: ['Meta Webhooks', 'Redis', 'Docker', 'FastAPI'],
            points: [
              'Engineered a production WhatsApp bot wired into the core chatbot service through Meta Webhook APIs, handling real time message routing, session management and structured payload rendering for travel queries.',
              'Built Redis backed session storage with configurable TTLs, one hour for sessions and thirty minutes for pending data, and a modular message builder pipeline generating WhatsApp compatible payloads including text, lists and interactive buttons. Added state change logic to switch between AI and non AI flows based on the query, with real time handoff to a human agent.',
              'Worked with the infra team to deploy via Docker with a containerised Redis service, and integrated dev tunnel support for local webhook testing against the Meta developer platform.',
            ],
          },
          {
            name: 'MCP tool calling framework',
            punch: 'The model stops guessing and starts calling real APIs.',
            stats: [
              { value: '2', label: 'Stage execution pipeline' },
              { value: '6+', label: 'Enterprise tool families' },
            ],
            stack: ['MCP', 'LangChain', 'Enterprise APIs', 'OTP Auth'],
            points: [
              'Contributed to the MCP based tool ecosystem enabling dynamic enterprise API invocations: flight search, hotel lookup, train and bus booking, post and pre booking operations, and OTP based login.',
              'Designed channel aware tool filtering with WhatsApp specific exclusions, and an intent classification guard layer that handles unsupported query types with a graceful main menu fallback.',
              'Implemented a two stage tool execution pipeline, a primary tool call chain for parameter extraction followed by an optional params enrichment sub chain for precision enhanced API invocations.',
            ],
          },
          {
            name: 'Agentic email automation',
            punch: '434 templates. Nobody hunts through them anymore.',
            stats: [
              { value: '434', label: 'Live templates covered' },
              { value: '21', label: 'Departments served' },
              { value: '85', label: 'Quality score gate' },
              { value: '0', label: 'PII reaching the model' },
            ],
            stack: ['LangGraph', 'Presidio', 'BM25', 'PyMuPDF', 'RapidOCR', 'Docker'],
            points: [
              'Built an agentic email drafting engine that auto generates grounded customer support replies, replacing manual template hunting across 21 departments and 434 live templates. Architected a 10 stage LangGraph pipeline covering intent detection, booking enrichment, template selection, drafting and QA, with a confidence gated retry loop where a strict scorer grades each draft from 0 to 100 and regenerates with targeted feedback below an 85 threshold, hard capped at 3 attempts for bounded latency and cost.',
              'Engineered privacy safe, zero leak processing using Microsoft Presidio with a reversible masking layer. Names, phones, booking IDs, PNRs, cards and multi currency amounts are swapped for named placeholders before any prompt, with a single per request masker keeping the map consistent across query, OCR text and enriched API data, then restored after scoring. Added hybrid attachment OCR, a PyMuPDF text layer with a RapidOCR ONNX fallback, so scanned tickets and screenshots become usable draft context, with per file soft failure and concurrent fetch.',
              'Designed a self improving feedback loop and constant cost template routing that scales with catalogue size. BM25 pre ranking over a generated template manifest keeps prompt size flat even for the 130 template Care department, and a Postgres metadata store caches every run so recreate and polish need one model call and zero re fetches of booking, OCR or knowledge base APIs. Agent feedback is injected immediately, then consolidated into a single per department learning at a batch threshold, bounding token spend while compounding quality. Shipped fully containerised with Docker Compose and graceful degradation at every dependency.',
            ],
          },
          {
            name: 'ChatGPT app integration',
            punch: 'Travel search, inside the chat you already have open.',
            stats: [{ value: '1', label: 'App live inside ChatGPT' }],
            stack: ['MCP', 'ChatGPT Apps', 'Enterprise APIs'],
            points: [
              'Contributed to launching the MCP powered ChatGPT App by exposing enterprise travel APIs as production ready MCP tools for conversational AI interactions inside ChatGPT.',
              'Worked on secure MCP tool integration, parameter extraction pipelines and channel aware conversational workflows to support reliable enterprise grade travel assistance, including hotel, flight and train discovery inside ChatGPT.',
            ],
          },
        ],
      },
      {
        company: 'Independent',
        title: 'Freelance AI Engineer',
        period: '2024 to Present',
        current: true,
        summary:
          'Selected engagements for teams that need a voice agent, an assistant or an automation working in front of customers, not sitting in a notebook.',
        points: [
          'Design and ship end to end voice agents across telephony and browser transports: streaming speech to text, turn detection, model reasoning and synthesis, tuned against a latency budget agreed before a line of code is written.',
          'Build retrieval grounded chat assistants over client knowledge bases and documents, with persistent session context, channel aware prompting and tool calling into the systems a business already runs on.',
          'Deliver agentic automation and integrations, including MCP tool servers, multi step workflows and API pipelines that take a manual internal process and make it a background job.',
          'Work as an embedded engineer rather than a vendor: scoped deliverables, containerised handover, instrumentation from day one, and documentation the in house team can maintain after I step off.',
        ],
      },
      {
        company: 'Hunar.ai',
        logo: '/logos/hunar.png',
        title: 'Backend Developer Intern',
        period: 'Jun 2025 to Aug 2025',
        summary: 'Backend and data pipeline work on a reporting platform used by enterprise clients.',
        points: [
          'Designed and optimised PostgreSQL query pipelines for data extraction workflows serving more than 20 enterprise clients across 100,000+ records, improving reporting efficiency by 30 percent.',
          'Built RESTful APIs and contributed to schema optimisation, cutting query execution time across the core reporting modules.',
          'Explored LLM integration patterns and contributed to backend modules supporting AI assisted features inside the platform.',
        ],
      },
      {
        company: 'Coding Ninjas Club, Chitkara University',
        logo: '/logos/chitkara.png',
        title: 'Technical Lead',
        period: '2023 to 2025',
        summary: 'Ran the technical programme for one of the university’s largest engineering communities.',
        points: [
          'Led technical workshops and mentored more than 100 club members on AI and ML, full stack development and competitive programming.',
          'Organised hackathons, coding sprints and project showcases, building a culture of applied engineering and product thinking.',
          'Guided juniors through production ready AI and web projects, raising the club’s technical presence at university and national level.',
        ],
      },
    ],
  },

  projects: {
    eyebrow: 'Selected work',
    title: 'Built on my own time, and still running',
    items: [
      {
        name: 'ComplaintHub',
        tagline: 'File a complaint by talking. Nobody has to pick up.',
        year: '2025',
        stats: [
          { value: '3', label: 'Voice pipelines benchmarked' },
          { value: '0', label: 'Human agents in the loop' },
        ],
        stack: ['GPT-4o Realtime', 'Gemini Native Audio', 'Whisper', 'Silero VAD', 'Twilio', 'Exotel', 'FFmpeg'],
        points: [
          'Built a fully automated voice to voice citizen complaint registration system where people interact entirely through natural speech on a live call, with no human agent involved. The pipeline ingests live audio, transcribes it, reasons over a model and delivers a synthesised spoken response, completing the full complaint lifecycle end to end.',
          'Engineered the real time audio stack on the GPT-4o-mini realtime preview model for telephony through Twilio and Exotel, with custom G.711 µ-law converters, jitter buffer tuning, RTP optimisation and FFmpeg preprocessing.',
          'Ran a proof of concept across three voice pipelines: OpenAI GPT-4o Realtime over the PCM16 WebSocket protocol, the Gemini Native Audio Thinking model, and a custom speech to text into model into speech micro pipeline built on Whisper, Groq gpt-oss and Google Wavenet, with token aware routing and latency based model swapping to balance cost against quality.',
          'Integrated Silero VAD with server side threshold tuning and DeepFilterNet for real time noise suppression, improving speech clarity and removing false trigger interruptions in noisy call environments.',
          'Designed multi stage NLP extraction to pull citizen intent, complaint category and brand details out of unstructured voice input, persisting structured records to Redis with async PostgreSQL for durable storage.',
        ],
      },
      {
        name: 'Syntropy Labs',
        tagline: 'Four services that decide whether your model is actually any good.',
        year: '2025',
        stats: [
          { value: '4', label: 'Containerised services' },
          { value: '5', label: 'Providers behind one API' },
        ],
        stack: ['FastAPI', 'LiteLLM', 'MongoDB', 'WebSocket', 'JWT', 'Google Cloud Storage'],
        points: [
          'Architected an LLM evaluation platform across four containerised microservices: an Orchestrator as the central API gateway for JWT auth, organisation and project management, dataset lifecycle and job orchestration; a Model Runner built on FastAPI and LiteLLM as a unified multi provider proxy; an Eval Engine for automated metric scoring; and MongoDB for metadata persistence.',
          'Built the Model Runner as a provider agnostic inference proxy, normalising API calls across OpenAI, Anthropic, Gemini, Mistral and Azure into a single compatible interface with consistent token accounting and per provider latency tracking.',
          'Extended the Model Runner with a WebSocket based realtime service for live voice evaluation, wiring in the OpenAI Realtime API and Gemini BidiGenerateContent to enable audio in and audio out benchmarking inside the platform.',
          'Built the Eval Engine supporting statistical metrics, predefined judge metrics for relevance, groundedness, coherence and fluency, and fully custom criteria, each configurable with its own judge model, scoring threshold and weight for a composite pass or fail.',
          'Implemented multimodal evaluation pipelines for generated image and video output, scoring across structured dimensions such as physics plausibility, anatomical correctness, semantic adherence, temporal consistency and aesthetic quality, using vision capable models as structured evaluators.',
          'Designed a progressive batch evaluation system where the Orchestrator persists per row scores back to cloud hosted CSV datasets after every row, enabling real time job progress polling from the frontend and partial result recovery when a job fails halfway.',
        ],
      },
      {
        name: 'Aura.ai',
        tagline: 'Text goes in. A narrated, signed, AR ready video comes out.',
        year: '2024',
        stats: [
          { value: '3', label: 'Output modes per upload' },
          { value: '1', label: 'Grounded assistant on top' },
        ],
        stack: ['RAG', 'Multilingual TTS', 'AR / VR', 'Analytics'],
        points: [
          'Built an AI SaaS platform that automates end to end video creation from text and document input, covering content summarisation, multilingual voiceover synthesis, sign language video generation and AR/VR scene integration, aimed at accessibility in education and corporate training.',
          'Developed AuraBot, a knowledge base grounded assistant using a retrieval pipeline for contextual question answering over uploaded course or training material.',
          'Integrated an analytics dashboard tracking viewer engagement, quiz completion rates, comprehension scores and retention, feeding that data back to personalise delivery per learning profile.',
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
        label: 'Frameworks and libraries',
        items: ['FastAPI', 'React', 'Node.js', 'Express.js', 'Redux', 'Streamlit', 'Selenium', 'BeautifulSoup'],
      },
      {
        label: 'AI and ML',
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
        label: 'Voice and real time',
        items: [
          'LiveKit (WebRTC)',
          'pipecat',
          'ASR',
          'WebSocket audio streaming',
          'VAD',
          'Speaker diarization',
          'STT and TTS pipelines',
          'DeepFilterNet',
          'Twilio',
          'Exotel',
          'µ-law',
          'FFmpeg',
        ],
      },
      { label: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Firestore'] },
      {
        label: 'Tools and infra',
        items: ['Git', 'Docker', 'Google Cloud', 'Firebase', 'UV', 'Husky', 'Ngrok', 'Cloudflare', 'CI/CD'],
      },
    ],
  },

  recognition: {
    eyebrow: 'Recognition',
    title: 'Judged, shortlisted, occasionally won',
    items: [
      {
        place: 'Top 22 national finalist',
        event: 'Bajaj Finserv HackRx 5.0',
        detail: 'Social Buzz winner',
        logo: '/logos/bajaj.png',
      },
      {
        place: 'Top 50 finalist',
        event: 'Cars24 Token’26',
        detail: 'Hosted by OpenAI, AWS and ElevenLabs',
        logo: '/logos/cars24.png',
      },
      {
        place: 'Winner',
        event: 'Aditya Birla Group SynaptiX Hackathon’25',
        detail: 'Hosted by Delhi Technological University',
        logo: '',
      },
      {
        place: 'Selected',
        event: 'GitHub Field Day’24',
        detail: 'Hosted by Microsoft',
        logo: '/logos/github.svg',
      },
      {
        place: 'First runner up',
        event: 'FusionFest Hackathon',
        detail: 'Chitkara University',
        logo: '/logos/chitkara.png',
      },
      {
        place: 'Finalist',
        event: 'Vihaan 7.0',
        detail: 'Social Buzz winner, Delhi Technological University',
        logo: '',
      },
    ],
  },

  education: {
    eyebrow: 'Education',
    degree: 'Bachelor of Computer Applications',
    field: 'Information Technology',
    institution: 'Chitkara University',
  },

  writing: {
    eyebrow: 'Technical blogs',
    title: '_Cooking_.',
    badge: 'In the oven',
    line: 'Deep dives on voice, agents and evaluation. First one served soon.',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Got something that should _talk back_?',
    body:
      'Voice, agents, evaluation, or a product that needs building. Email lands fastest, and I reply to all of it.',
  },
};

export default profile;
