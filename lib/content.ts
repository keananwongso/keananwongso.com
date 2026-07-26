/**
 * All editable site content lives here. Edit data, not JSX.
 * Case-study copy is drawn from the resume + case-study inventory. Numbers use
 * the confirmed resume figures; anything still unverified is marked TODO.
 */

export const LINKS = {
  linkedin: "https://linkedin.com/in/keananwongso",
  github: "https://github.com/keananwongso",
  email: "mailto:keananwongso7@gmail.com",
  resume: "/resume.pdf",
};

export const INTRO = {
  heading: "Hi, I'm Keanan",
  body: "I'm a CS student at UBC who builds software end to end, mostly AI systems that have to work in front of real people. I like the messy part: figuring out how something actually works before turning it into a system.",
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
  stack?: string;
  link?: { label: string; href: string };
}

export const PROJECTS: Project[] = [
  {
    slug: "synapse",
    title: "Synapse",
    caption:
      "A spatial brainstorming canvas that thinks with you and acts for you.",
    credential: "ProduHacks 2026",
    image: "/projects/synapse.svg",
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
          "The chat interface flattens thinking. A linear thread is a bad container for non-linear work, and the moment an idea has to leave the thread to become a task, it usually dies.",
          "Synapse puts the whole thing on an infinite canvas. You dump raw thoughts, they float with soft physics, and the AI finds connections between them in real time. Related ideas drift toward each other into clusters, and labels fade in above each group, naming themes you never consciously identified.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "The AI co-brainstorms alongside you as an equal participant, dropping its own nodes that challenge or extend your thinking. When a cluster feels ready, you click it and an action panel slides open: research this, draft a doc, generate a mockup. An agent picks up the task, works in the background, and drops results back onto the canvas as new nodes. You never leave the canvas.",
        ],
      },
      {
        heading: "The pivot",
        body: [
          "Halfway through the 24 hours I cut features the team had gotten attached to. My job was less writing code than keeping design, product, and engineering pointed at the same thing, catching assumptions between the two sides before they became bugs.",
          "Building it changed where I think the real frontier in AI is: not model capability, interaction design.",
        ],
      },
    ],
    stack: "TypeScript, React, Claude API",
    link: { label: "trysynapse.co", href: "https://trysynapse.co" },
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
          "To-do lists and time blocking both break because you end up maintaining two systems that disagree with each other. Naiya takes a conversational life dump, by voice or text, and turns it into a full weekly schedule that accounts for classes, deadlines, social events, exercise, and energy. When life changes, which it always does, an adaptive loop re-plans.",
        ],
      },
      {
        heading: "The architecture decision",
        body: [
          "The obvious build is a pure LLM. I split it instead: DeepSeek-V3 handles the genuinely ambiguous part, extracting structured events from natural language, and a deterministic TypeScript engine does the actual scheduling. That cut inference cost by 90% and latency by 60% against the pure-LLM baseline.",
          "The principle transfers: use the model for the part that's ambiguous, use code for the part that has a correct answer.",
        ],
      },
    ],
    stack: "TypeScript, PostgreSQL, Supabase, DeepSeek-V3, Next.js",
    link: { label: "github.com/keananwongso/naiya", href: "https://github.com/keananwongso/naiya" },
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
          "Naiya answers what your week should look like. Lockout answers how you actually do the thing you planned. Planning alone isn't enough, commitment stays abstract until something external makes it tangible.",
          "We refused to build another AI wrapper. The insight came before the code: people follow through when someone else is watching.",
        ],
      },
      {
        heading: "What we built",
        body: [
          "A five-state session machine (Created → Active → Pending Verification → Resolved → Expired) persisted in Firestore across reconnects. A witness system where friends approve or reject your session. A proof system where before-and-after photos are verified by Gemini Vision before your phone unlocks. Verified streaks tied to real sessions, not self-report. Social voting with credibility scores, kept accurate under concurrent updates with database transactions.",
        ],
      },
      {
        heading: "Honest weaknesses",
        body: [
          "AI proof is gameable. Witness friction may hurt retention. There's a cold-start problem: no friends means no value. And over-gamification is a real risk. We built a full user-research kit, a two-phase interview guide and a distributed survey, to validate with UBC students before building further.",
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
          "The code was Flask REST APIs with streamed responses and usage logging, a dozen behavioral guardrails across two LLMs. But the hard part was recruiting and managing 15 volunteers who weren't paid and weren't obligated. That's a fundamentally different problem from writing code, and it's the honest answer to how I grew that year.",
          "I wound it down on purpose. Framed as a decision rather than a fizzle, that ending is the part I'm most sure about.",
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
    "Forward Deployed Engineer at {Covena|https://covena.ai}, shipping WhatsApp-native sales agents.",
    "Built a sales-intelligence platform for {Nuansa Musik|https://github.com/keananwongso}, my family's 20-year-old business.",
    "Partnerships Director for {UBC BizTech|https://www.ubcbiztech.com}, UBC's largest tech club.",
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

export const RESUME: {
  education: CVEntry[];
  experience: CVEntry[];
  leadership: CVEntry[];
} = {
  education: [
    {
      org: "University of British Columbia",
      location: "Vancouver, BC",
      role: "B.Sc. Computer Science — GPA 3.73, Dean's List",
      dates: "Sep 2025 – May 2029",
      bullets: [
        "IMES + OIS Scholarships: $100,000 CAD merit award to the top 100 international students.",
      ],
    },
  ],
  experience: [
    {
      org: "Covena AI",
      location: "Jakarta, Indonesia",
      role: "Software Engineer Intern — Forward Deployed",
      dates: "May 2026 – Present",
      bullets: [
        "Reached 95% containment and 40% average conversion across 10+ client agent builds, partnering with client teams from scoping to fully autonomous launch.",
        "Converted 20% of inbound chats into booked pickups for a national e-waste client, cutting response time from two weeks to under a minute with an autonomous scheduling agent.",
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
};
