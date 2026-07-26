/**
 * All editable site content lives here. Edit data, not JSX.
 * Placeholder copy/images are marked with TODO — swap them for the real thing.
 */

export const LINKS = {
  linkedin: "https://linkedin.com/in/keananwongso",
  github: "https://github.com/keananwongso",
  email: "mailto:keananwongso7@gmail.com",
  resume: "/resume.pdf",
};

export const INTRO = {
  heading: "Welcome to my digital library",
  body: "Thanks for stopping by. I'm a student and builder exploring how software, design, and the people around them shape each other. I like shipping things that feel considered, from AI agents to interfaces to the occasional side project.",
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

/** Experience rows: [dot] Company .... Year. */
export const EXPERIENCE: { company: string; year: string }[] = [
  { company: "Covena", year: "2026 –" },
  { company: "UBC BizTech", year: "2026" },
  { company: "ProduHacks", year: "2025" },
];

export type Category = "design" | "software";

export interface Project {
  slug: string;
  title: string;
  caption: string;
  category: Category;
  credential?: string;
  image: string;
  role: string;
  year: string;
  statement: string;
  body: string[];
  link?: { label: string; href: string };
}

export const PROJECTS: Project[] = [
  {
    slug: "synapse",
    title: "Synapse",
    caption:
      "A multi-agent AI canvas that lets teams orchestrate and watch agents collaborate in real time.",
    category: "software",
    credential: "ProduHacks 2025",
    image: "/projects/synapse.svg",
    role: "Full-stack",
    year: "2025",
    statement: "Multi-agent work should feel like a shared canvas, not a chat box.",
    body: [
      // TODO: replace with the real case study.
      "Synapse is a multi-agent AI canvas built at ProduHacks 2025. Instead of a single linear chat, agents live on a spatial canvas where you can wire them together, hand off context, and watch the collaboration unfold.",
      "We built it with Next.js and a streaming agent runtime so every step is visible as it happens. It's live at trysynapse.co.",
    ],
    link: { label: "trysynapse.co", href: "https://trysynapse.co" },
  },
  {
    slug: "naiya",
    title: "Naiya",
    caption:
      "An adaptive planning app that reshapes your day around what actually happened.",
    category: "software",
    credential: "BizTech Kickstart 2025",
    image: "/projects/naiya.svg",
    role: "Full-stack",
    year: "2025",
    statement: "Plans break the moment life happens. Naiya replans for you.",
    body: [
      // TODO: replace with the real case study.
      "Naiya is an adaptive planning app built during BizTech Kickstart 2025. It watches how your day actually unfolds and quietly reshapes the rest of it, so a blown estimate at 10am doesn't derail everything after.",
      "Built with Next.js and Supabase, with a scheduling layer that treats your plan as a living thing rather than a fixed list.",
    ],
  },
  {
    slug: "lockout",
    title: "Lockout",
    caption:
      "A social accountability app that turns your goals into something your friends can hold you to.",
    category: "software",
    credential: "nwHacks 2026",
    image: "/projects/lockout.svg",
    role: "Mobile",
    year: "2026",
    statement: "Accountability works best when someone's actually watching.",
    body: [
      // TODO: replace with the real case study.
      "Lockout is a social accountability app built at nwHacks 2026. You commit to a goal, and your friends see whether you follow through — the gentle social pressure that makes habits stick.",
      "Built with React Native, Firebase, and Gemini for the smart nudges and check-ins.",
    ],
  },
  {
    slug: "mathcom",
    title: "Mathcom",
    caption:
      "A nonprofit math learning platform with an AI tutoring layer, built with a 15-person team.",
    category: "design",
    credential: "Nonprofit",
    image: "/projects/mathcom.svg",
    role: "Design + Frontend",
    year: "2025",
    statement: "Good tutoring scales when the software carries the patience.",
    body: [
      // TODO: replace with the real case study.
      "Mathcom is a nonprofit math learning platform with an AI tutoring layer, built with a 15-person team. The goal: give students the kind of patient, step-by-step help that usually only a human tutor can offer.",
      "I worked across design and frontend, shaping how the tutoring conversation feels and looks.",
    ],
  },
  {
    slug: "jipt",
    title: "JIPT",
    caption:
      "An LLM training-data pipeline that turns scanned documents into clean instruction pairs.",
    category: "software",
    credential: "Data pipeline",
    image: "/projects/jipt.svg",
    role: "Data engineering",
    year: "2025",
    statement: "The model is only as good as the pairs you feed it.",
    body: [
      // TODO: replace with the real case study.
      "JIPT is an LLM training-data pipeline. It ingests scanned documents with Tesseract OCR, classifies and cleans the content with Gemini, and produces 500+ JSONL instruction pairs ready for fine-tuning.",
      "The hard part wasn't the model — it was making the data trustworthy.",
    ],
  },
];

export const ABOUT = {
  heading: "A little bit about me",
  intro:
    "I'm a computer science student at UBC exploring the space where software, design, and everyday life meet. I grew up in Jakarta, came to Vancouver for school, and have been building things ever since.",
  funFactsLead: "Some fun facts:",
  // Each fun fact can weave in inline links via {label|href} tokens.
  funFacts: [
    "Forward Deployed Engineer at {Covena|https://covena.ai}, shipping WhatsApp-native sales agents.",
    "Partnerships Director for {UBC BizTech|https://www.ubcbiztech.com} 2026/27.",
    "I play violin and piano, and I journal by hand every night.",
    "Grew up around Dhamma — the thread through everything I do is interdependence.",
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

export const CV: {
  education: CVEntry[];
  experience: CVEntry[];
  leadership: CVEntry[];
} = {
  education: [
    {
      org: "University of British Columbia",
      location: "Vancouver, BC",
      role: "Bachelor of Computer Science",
      dates: "Expected 2028",
      bullets: [
        // TODO: fill in with real details.
        "Sophomore studying computer science.",
      ],
    },
  ],
  experience: [
    {
      org: "Covena",
      location: "Remote",
      role: "Forward Deployed Engineer",
      dates: "2026 – Current",
      bullets: [
        "Ship WhatsApp-native sales agents for clients, owning client deployments end to end.",
      ],
    },
    {
      org: "UBC BizTech",
      location: "Vancouver, BC",
      role: "Partnerships Director",
      dates: "2026 – 2027",
      bullets: [
        "Lead partner outreach and manage relationships across the club's sponsor base.",
      ],
    },
  ],
  leadership: [
    {
      org: "Hackathons",
      location: "Various",
      role: "Builder",
      dates: "2025 – 2026",
      bullets: [
        "Shipped Synapse (ProduHacks 2025), Naiya (BizTech Kickstart 2025), and Lockout (nwHacks 2026).",
      ],
    },
  ],
};
