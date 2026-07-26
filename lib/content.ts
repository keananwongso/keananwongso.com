/**
 * All editable site content lives here. Edit data, not JSX.
 * Case-study copy is drawn from the resume + case-study inventory. Numbers use
 * the confirmed resume figures; anything still unverified is marked TODO.
 */

export const LINKS = {
  linkedin: "https://linkedin.com/in/keananwongso",
  github: "https://github.com/keananwongso",
  email: "mailto:keananwongso7@gmail.com",
  resume:
    "https://drive.google.com/file/d/1NDzBDIXfERJz2KnuwxwUki_F69ebNmx2/view?usp=sharing",
};

export const INTRO = {
  heading: "Hi, I'm Keanan",
  body: "I'm a CS student at UBC. I build software end to end, mostly AI systems that have to hold up in front of real people. The part I like is the messy one, figuring out how something actually works before turning it into a system.",
  // Rendered as: "Currently {currentRole.text} {currentRole.link.label}."
  currentRole: {
    text: "Currently a Forward Deployed Engineer at",
    link: { label: "Covena", href: "https://covena.ai" },
  },
};

/** Numbered contact links (¹ ² ³) with an ↗ arrow. */
export const CONTACT: { label: string; href: string }[] = [
  { label: "GitHub", href: LINKS.github },
  { label: "LinkedIn", href: LINKS.linkedin },
  { label: "Email", href: LINKS.email },
];

export interface Role {
  company: string;
  role: string;
  dates: string;
  /** Optional internal link, e.g. to a case study. */
  href?: string;
}

/** Software roles — the Experience block. */
export const EXPERIENCE: Role[] = [
  {
    company: "Covena AI",
    role: "Software Engineer Intern, Forward Deployed",
    dates: "May 2026 – Present",
  },
  {
    company: "Nuansa Musik",
    role: "Software Engineer",
    dates: "Jan 2026 – Apr 2026",
    href: "/collection/nuansa",
  },
];

/** Leadership / club roles — separate from software experience. */
export const LEADERSHIP: Role[] = [
  {
    company: "UBC BizTech",
    role: "Partnerships Director",
    dates: "Apr 2026 – Present",
  },
];

export interface CaseSection {
  heading: string;
  body: string[];
  /** Optional image shown under this section's text (path in /public). */
  image?: string;
  /** Optional caption for the section image. */
  caption?: string;
}

/** A supporting image, shown in the gallery after the sections. */
export interface Shot {
  src: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  caption: string;
  credential?: string;
  image: string;
  role: string;
  year: string;
  statement: string;
  /** 2–3 short stat callouts shown as a row under the problem. */
  stats?: { value: string; label: string }[];
  /** Ordered case-study sections (problem, solution, pivot, reflection, …). */
  sections: CaseSection[];
  /** Optional extra images shown after the sections. */
  gallery?: Shot[];
  stack?: string;
  link?: { label: string; href: string };
}

export const PROJECTS: Project[] = [
  {
    slug: "nuansa",
    title: "Nuansa",
    caption:
      "A four-app platform and agentic memory layer that turns four decades of scattered retail data into something you can query.",
    credential: "Nuansa Musik",
    image: "/projects/nuansa-brain.png",
    role: "Software Engineer, end to end",
    year: "2026",
    statement:
      "Four decades of scattered records, turned into an agentic memory layer that finally gives the business observability.",
    stats: [
      { value: "~20 hrs/wk", label: "manual reporting removed" },
      { value: "6,842", label: "item catalog under search" },
      { value: "4 apps", label: "one shared backend" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Nuansa is a music retail business in Indonesia, built up over four decades and run on habit, memory, and daily updates over chat. It works. But the business has almost no observability. What sells where, which store is quietly losing money, what a customer asked for and walked out without. The data is scattered across separate systems that never talk to each other, or it lives in one person's head and leaves when they do, so even basic questions about the business can't really be answered.",
          "I researched it, sat with the people who actually do the work, and built it end to end. The constraint was physical: a fixed window on the ground, and it had to be live before I left. The principle was to integrate, not replace. The old systems stay; I built a layer that reads from all of them and reconciles them into one picture, so the business can be ranked and compared instead of guessed at.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "It starts with how staff already work: they send daily reports over chat, and now the system listens. An ingestion pipeline parses each free-text message into structured records at a 90% straight-through rate, with exactly-once semantics so nothing double-counts. Four apps sit on one Postgres backend with cross-app SSO and role-based access: ingestion, an analytics dashboard, a marketing pipeline, and a company hub.",
          "Search matches free-text product names against a 6,842-item catalog at 95%+ accuracy, using cosine-similarity embeddings with LLM re-ranking for the close calls, tuned against a labeled eval harness instead of eyeballed. Years of fragmented sales and accounting records get stitched into one warehouse, so for the first time which store carries the business and which quietly loses money is a question with an answer.",
        ],
        image: "/projects/nuansa-review.png",
        caption:
          "Every inbound message becomes structured line items, matched against the catalog with a confidence score. A human confirms the edge cases, and each correction trains the matcher.",
      },
      {
        heading: "Citta, the company brain",
        body: [
          "On top of the platform sits an agentic memory layer: atomic, self-linking facts connected in a Hebbian graph, retrieval with provenance, and autonomous agents on a schedule. You ask a question in plain language; it answers from the real numbers, queried live at answer time, never raw SQL. Citta is 'mind' in Pali. The interesting part was that building a memory system for a business meant translating how the people who run it actually think about it into schema, which took real time on the ground to understand.",
        ],
      },
      {
        heading: "One brain, any client",
        body: [
          "The shared memory is exposed over a remote MCP server, so the company brain isn't locked inside one app. Any AI client can reach it: I can catch up on the whole company, summarize what shipped, or create and update tasks straight from my IDE, and it all reads and writes the same store the team's chat uses. Writes land in a review queue, so an agent can propose but a human confirms before anything sticks. It turns the business into something you can query and act on from wherever you already work.",
        ],
        image: "/projects/nuansa-mcp.png",
        caption:
          "The company brain, queried from an AI client over MCP: catch up, summarize, and write tasks back to the shared store.",
      },
      {
        heading: "Agents that do the legwork",
        body: [
          "Scheduled agents run over the same memory: they take a snapshot, generate candidate insights and actions, then judge their own output and publish or kill each one. Nothing lands unreviewed, so the system proposes constantly but a human still decides. It is the difference between a dashboard you have to interrogate and a brain that surfaces things on its own.",
        ],
        image: "/projects/nuansa-agents.png",
        caption:
          "An agent run: generate candidates, judge each, publish or kill. The brain works even when no one is asking.",
      },
      {
        heading: "Security",
        body: [
          "A cross-repo hardening pass: row-level security to lock down browser-exposed tables, constant-time secret comparison in webhooks to close timing attacks, and fencing untrusted agent input behind human-review queues before it can act.",
        ],
      },
    ],
    stack:
      "Next.js, TypeScript, Cloudflare Workers, Deno, Postgres, pgvector, MCP",
  },
  {
    slug: "repo-to-resume",
    title: "repo-to-resume",
    caption:
      "A Claude Code skill for tailoring resumes fast, with bullets grounded in what your code actually shows.",
    credential: "Side quest",
    image: "/projects/repo-to-resume.png",
    role: "Solo",
    year: "2026",
    statement:
      "Tailoring a resume for every opening is slow. Your code already proves what you built, so let it do the work.",
    sections: [
      {
        heading: "The problem",
        body: [
          "I was applying to a lot of roles, and every one wanted a slightly different resume. Tailoring by hand was slow, and each round I'd re-explain the same projects from scratch and throw away the context I'd built up the time before. It's also way too easy to drift into numbers you can't actually defend in an interview.",
        ],
      },
      {
        heading: "What it does",
        body: [
          "So I built a Claude Code skill that holds the context for me. It reads a repo into evidenced facts, checks my resume against a posting for coverage and gaps, and writes bullets traced back to real evidence, flagging anything it can't prove. I just ask in plain English: turn this repo into bullets, how well do I match this job, what keywords am I missing. Every line stays something I can defend.",
        ],
      },
    ],
    stack: "Claude Code skill, Python",
    link: {
      label: "github.com/keananwongso/repo-to-resume",
      href: "https://github.com/keananwongso/repo-to-resume",
    },
  },
  {
    slug: "vancouver-rental-finder",
    title: "vancouver-rental-finder",
    caption:
      "A rental hunter that reads move-in dates out of listing text and ranks what fits. Found my own place with it.",
    credential: "Side quest",
    image: "/projects/vancouver-rental-finder.png",
    role: "Solo",
    year: "2026",
    statement:
      "I found my current place on day one of using this. Before it, the search was a daily slog.",
    sections: [
      {
        heading: "The problem",
        body: [
          "Hunting for a place near UBC meant checking five-plus sites, Wesbrook, liv.rent, Craigslist, apartments.com, Zumper, every single day. That's 200+ searches, and most of what comes back is junk. Worse, the one thing you actually filter on, the move-in date, is almost never a field. It's buried in a human-written blurb ('available Sept 1, 2 bed, no pets…'), so the listings for the month you want get lost under everything else. A lot of wasted time.",
        ],
      },
      {
        heading: "What it does",
        body: [
          "Describe what you want in plain English and an LLM turns it into a search. It pulls listings from all the sources at once, reads the real move-in date out of the free text, scores each against your criteria, flags likely scams, and ranks the survivors in a local dashboard you can filter by beds, price, distance, and move-in window. New listings get a badge; ones that vanish are marked gone, not deleted.",
        ],
      },
      {
        heading: "How each source is accessed",
        body: [
          "The interesting part was that every site exposes its data differently, so the effort escalates per source. liv.rent is a server-rendered Next.js site with the full listing embedded as JSON in the HTML, so I just pull that out, clean and structured, no LLM. Craigslist has no structure at all, just a paragraph a human wrote, so that's where the LLM earns its place, extracting the move-in date and fields from prose. apartments.com and Zumper actively block scrapers, so those run through pre-built Apify actors that handle the anti-bot layer. Same goal every time, structured listings, with escalating effort depending on how the site hides its data.",
        ],
      },
      {
        heading: "The payoff",
        body: [
          "I found my current rental on the first day I used it.",
        ],
      },
    ],
    stack: "Python, DeepSeek, Apify",
    link: {
      label: "github.com/keananwongso/vancouver-rental-finder",
      href: "https://github.com/keananwongso/vancouver-rental-finder",
    },
  },
  {
    slug: "synapse",
    title: "Synapse",
    caption:
      "A spatial brainstorming canvas that thinks with you and acts for you.",
    credential: "ProduHacks 2026",
    image: "/projects/synapse-landing.png",
    role: "Lead",
    year: "2026",
    statement:
      "Ideas die in the gap between thinking and doing. That's a UI problem, not a model problem.",
    stats: [
      { value: "50", label: "concurrent AI agents" },
      { value: "24h", label: "hackathon build" },
      { value: "Live", label: "at trysynapse.co" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "I kept losing ideas in the gap between having them and doing anything with them. Chat is a bad container for that: a linear thread flattens non-linear thinking, and the second an idea has to leave the thread to become a task, it dies.",
          "So we built Synapse on an infinite canvas instead. You dump raw thoughts, they float with soft physics, and the AI finds connections between them as you go. Related ideas drift into clusters, and labels fade in above each group, naming themes you never consciously picked.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "I wanted the AI to feel like another person at the board, not a sidebar. It brainstorms alongside you, dropping its own nodes that push back on or extend your thinking. When a cluster feels ready you click it, pick an action (research this, draft a doc, generate a mockup), and an agent runs it in the background and drops the result back as new nodes. You never leave the canvas.",
        ],
      },
      {
        heading: "The pivot",
        body: [
          "Halfway through the 24 hours I cut features the team had gotten attached to. My job was less writing code than keeping design, product, and engineering pointed at the same thing, catching bad assumptions before they turned into bugs.",
          "Building it moved where I think the real frontier in AI is: not model capability, interaction design.",
        ],
      },
    ],
    gallery: [
      {
        src: "/projects/synapse-canvas.png",
        caption: "The canvas: ideas cluster and branch as the agents work alongside you.",
      },
    ],
    stack: "TypeScript, React, Claude API",
    link: { label: "trysynapse.co", href: "https://trysynapse.co" },
  },
  {
    slug: "lockout",
    title: "Lockout",
    caption:
      "Focus as a social contract, not a personal promise. A behavior design system, not another AI wrapper.",
    credential: "nwHacks 2026",
    image: "/projects/lockout.svg",
    role: "Full-stack, de facto lead",
    year: "2026",
    statement:
      "People follow through more when someone else is watching. So we made the watching real.",
    stats: [
      { value: "5-state", label: "session machine" },
      { value: "Team of 4", label: "24h build" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "I'd already built Naiya to plan the week. The thing Naiya couldn't do was make me actually follow the plan. Planning alone never stuck; the commitment stayed abstract until something outside me made it real.",
          "We didn't want to build another AI wrapper, so we started from the behavior, not the model. The bet was simple: people follow through when someone else is watching.",
        ],
      },
      {
        heading: "What we built",
        body: [
          "So I made the watching real. It runs on a five-state session machine (Created → Active → Pending Verification → Resolved → Expired) persisted in Firestore across reconnects. Friends act as witnesses who approve or reject your session. Before your phone unlocks, before-and-after photos get checked by Gemini Vision. Streaks only count verified sessions, not self-report. And the social leaderboard stays accurate under concurrent votes because I ran the updates through database transactions.",
        ],
      },
      {
        heading: "Honest weaknesses",
        body: [
          "AI proof is gameable. The witness step adds friction that might hurt retention. There's a cold-start problem too: no friends means no value. So before building further we put together a real user-research kit, a two-phase interview guide and a survey, to test it with UBC students first.",
        ],
      },
    ],
    stack:
      "React Native, Expo, TypeScript, Zustand, Firebase, Gemini Vision",
    link: {
      label: "devpost.com/software/lockedout",
      href: "https://devpost.com/software/lockedout-5nge0b",
    },
  },
  {
    slug: "naiya",
    title: "Naiya",
    caption:
      "A scheduling copilot that turns a life dump into a week that accounts for your actual time.",
    credential: "BizTech KickStart 2025",
    image: "/projects/naiya.svg",
    role: "Full-stack",
    year: "2025",
    statement:
      "To-do lists and time blocking fail for the same reason: your tasks never sync with your actual time.",
    stats: [
      { value: "90%", label: "lower inference cost" },
      { value: "60%", label: "lower latency" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "I kept bouncing between a to-do list and a calendar, and they never agreed with each other. So I built Naiya to collapse the two. You dump your life at it, by voice or text, and it turns that into a full week that accounts for classes, deadlines, social stuff, exercise, and energy. When the week falls apart, which it always does, it re-plans instead of leaving you with a schedule that's already wrong.",
        ],
      },
      {
        heading: "The architecture decision",
        body: [
          "The obvious build is a pure LLM. I split it instead: DeepSeek-V3 handles the genuinely ambiguous part, pulling structured events out of natural language, and a plain TypeScript engine does the scheduling. That cut inference cost by 90% and latency by 60% against the pure-LLM version.",
          "It's a rule I keep coming back to: use the model for the part that's actually ambiguous, use code for the part that has a right answer.",
        ],
      },
    ],
    stack: "TypeScript, PostgreSQL, Supabase, DeepSeek-V3, Next.js",
    link: { label: "github.com/keananwongso/naiya", href: "https://github.com/keananwongso/naiya" },
  },
  {
    slug: "mathcom",
    title: "Mathcom",
    caption:
      "A nonprofit math learning platform I built alone on a gap year, and deliberately wound down.",
    credential: "Founder",
    image: "/projects/mathcom.svg",
    role: "Founder",
    year: "2024 – 2025",
    statement:
      "It's easy to build when there's pressure. The gap year taught me I build just as hard when there isn't.",
    stats: [
      { value: "15", label: "person volunteer team" },
      { value: "1yr 4mo", label: "start to wind-down" },
    ],
    sections: [
      {
        heading: "The story",
        body: [
          "I'd already gotten into UBC. Gap year, nobody watching, no deadlines, no grades, no admissions officer to impress. I built a nonprofit math learning platform alone, for no external reason except wanting to see if I could.",
          "It ran three departments: an AI and Web team shipping MathCom AI, a tutoring assistant that was deliberately not a calculator; a Content team making math feel human through reels and explainers; and a Social team running charity outreach.",
        ],
      },
      {
        heading: "The real work",
        body: [
          "The code was Flask REST APIs with streamed responses and usage logging, a dozen behavioral guardrails across two LLMs. But the hard part wasn't code. It was recruiting and managing 15 volunteers who weren't paid and weren't obligated to show up. That's a completely different problem, and it's the honest answer to how I grew that year.",
          "I wound it down on purpose. It didn't fizzle, I ended it, and that's the part I'm most sure about.",
        ],
      },
    ],
    stack: "Flask, Python, LLM integration",
  },
];

export const ABOUT = {
  heading: "A little bit about me",
  intro:
    "I'm a computer science student at UBC. I grew up in Jakarta, came to Vancouver on scholarship, and have been building things the whole way. The thread through most of it is figuring out how something actually works before turning it into software.",
  funFactsLead: "Some fun facts:",
  // Each fun fact can weave in inline links via {label|href} tokens.
  funFacts: [
    "Forward Deployed Engineer at Covena, shipping WhatsApp-native sales agents.",
    "Built a sales-intelligence platform for {Nuansa Musik|https://nuansamusik.com}.",
    "Partnerships Director for UBC BizTech, UBC's largest tech club.",
    "I play violin and piano, and I journal by hand every night.",
  ],
  photosLead: "A few moments from along the way.",
  photos: [
    // TODO: replace src with real photos under /public/about/.
    { src: "/about/photo-1.svg", caption: "Jakarta, Indonesia", date: "2024" },
    { src: "/about/photo-2.svg", caption: "Vancouver, Canada", date: "2025" },
    { src: "/about/photo-3.svg", caption: "UBC campus", date: "2025" },
    { src: "/about/photo-4.svg", caption: "Somewhere new", date: "2026" },
  ],
};

export interface CVEntry {
  org: string;
  location: string;
  role: string;
  dates: string;
  bullets: string[];
}

/** Mirrors the PDF resume exactly. Update alongside the PDF. */
export const RESUME: {
  education: CVEntry[];
  experience: CVEntry[];
  projects: CVEntry[];
  leadership: CVEntry[];
  skills: { category: string; items: string }[];
} = {
  education: [
    {
      org: "University of British Columbia",
      location: "Vancouver, BC",
      role: "B.Sc. Computer Science (GPA: 3.73, Dean's List)",
      dates: "Sep 2025 – May 2029",
      bullets: [
        "IMES + OIS Scholarships: $100,000 CAD merit award to the top 100 international students.",
        "Relevant Coursework: Software Construction, Computation & Program Design, Discrete Mathematics, Data Structures & Algorithms.",
      ],
    },
  ],
  experience: [
    {
      org: "Covena AI",
      location: "Jakarta, Indonesia",
      role: "Software Engineer Intern - Forward Deployed",
      dates: "May 2026 – Present",
      bullets: [
        "Reached 95% containment and 40% average conversion across 10+ client agent builds, partnering with client teams from scoping to fully autonomous launch.",
        "Converted 20% of inbound chats into booked pickups for a national e-waste client, cutting response time from 2 weeks to under a minute with an autonomous scheduling agent.",
        "Scaled a distributed multi-agent pipeline to 2,000+ conversations/day in TypeScript, with layered guardrails and escalation routes debugged through LangSmith traces and evals.",
        "Integrated accounting, payments, inventory, and shipping systems into agents via HMAC-signed REST APIs, backed by MongoDB with files in AWS S3.",
      ],
    },
    {
      org: "Nuansa Musik",
      location: "Remote",
      role: "Software Engineer",
      dates: "Jan 2026 – Apr 2026",
      bullets: [
        "Architected a production web platform with cross-app SSO and RBAC, giving a retail chain live sales visibility.",
        "Cut manual reporting by 50 hrs/week with a webhook-driven NLP pipeline in TypeScript and Python that turns free-text sales messages into structured records at a 90% straight-through rate.",
        "Matched free-text product names to a 7,000+ item catalog at 95%+ accuracy via a RAG pipeline combining cosine-similarity embedding search with LLM re-ranking.",
        "Secured the platform with row-level security, authenticated webhooks, and read-only SQL for LLM queries.",
      ],
    },
  ],
  projects: [
    {
      org: "Synapse",
      location: "TypeScript, React, Claude API",
      role: "ProduHacks '26",
      dates: "Mar 2026",
      bullets: [
        "Engineered a live multi-agent brainstorming canvas supporting 50 concurrent AI agents that critique and synthesize ideas in real time.",
      ],
    },
    {
      org: "Naiya",
      location: "TypeScript, PostgreSQL, DeepSeek-V3",
      role: "BizTech KickStart '25",
      dates: "Nov 2025",
      bullets: [
        "Cut inference time 90% and latency 60% in an open-source AI scheduling copilot with a hybrid LLM-plus-deterministic architecture.",
      ],
    },
  ],
  leadership: [
    {
      org: "UBC BizTech",
      location: "Vancouver, BC",
      role: "Partnerships Director",
      dates: "Apr 2026 – Present",
      bullets: [
        "Selected from 200+ applicants to own end-to-end partnerships for UBC's largest tech club (1,000+ members).",
        "Ran outreach and coordination across 100+ sponsors, event partners, and media contacts, closing sponsorships and cross-team logistics for the club's flagship events.",
      ],
    },
  ],
  skills: [
    {
      category: "Languages",
      items: "Java, JavaScript, Python, TypeScript, SQL, HTML/CSS",
    },
    {
      category: "Technologies",
      items:
        "web application development (React, React Native, Next.js), back-end (Node.js, Flask, Deno), PostgreSQL, MongoDB (NoSQL), Supabase, pgvector, Redis, Firebase",
    },
    {
      category: "Cloud Infrastructure",
      items:
        "Cloudflare Workers, GCP, AWS (S3), Unix/Linux, distributed systems, serverless/edge functions, CI/CD (GitHub Actions)",
    },
    {
      category: "AI & Data Science",
      items:
        "machine learning, natural language processing, LLM integration (Claude, OpenAI, Gemini), multi-agent systems, RAG, embeddings, semantic search, agent evals & guardrails, LangChain, LangSmith, MCP",
    },
  ],
};
