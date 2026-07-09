/**
 * All editable site content lives here. Edit data, not JSX.
 */

export const LINKS = {
  linkedin: "https://linkedin.com/in/keananwongso",
  github: "https://github.com/keananwongso",
  email: "mailto:keananwongso7@gmail.com",
  resume: "/resume.pdf",
};

export const HERO = {
  label: "SOPHOMORE / UBC COMPUTER SCIENCE / VANCOUVER × JAKARTA",
  greeting: "Hi, I’m Keanan, a sophomore at UBC studying CS.",
};

/** /now — update this one object. */
export const NOW = {
  lastUpdated: "July 9, 2026",
  reading: "…",
  practicing: "…",
  thinkingAbout: "…",
};

export type NodeType = "domain" | "work" | "project";

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  detail: string;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export const GRAPH_NODES: GraphNode[] = [
  // Domains
  {
    id: "music",
    label: "MUSIC",
    type: "domain",
    detail:
      "Violin and piano since childhood. These days approached the way code is: daily practice until it becomes yours.",
  },
  {
    id: "meditation",
    label: "MEDITATION",
    type: "domain",
    detail:
      "Grew up around Dhamma. Nightly journaling by hand. The quiet discipline underneath everything else.",
  },
  {
    id: "movement",
    label: "MOVEMENT",
    type: "domain",
    detail: "Staying active. The body keeps the mind clear.",
  },
  {
    id: "building",
    label: "BUILDING",
    type: "domain",
    detail:
      "Software, mostly. The center of gravity that everything else feeds into.",
  },
  // Work
  {
    id: "covena",
    label: "COVENA",
    type: "work",
    detail:
      "Forward Deployed Engineer. Ships WhatsApp-native sales agents for clients.",
  },
  {
    id: "biztech",
    label: "BIZTECH",
    type: "work",
    detail: "Partnerships Director, UBC BizTech 2026/27.",
  },
  // Projects
  {
    id: "synapse",
    label: "SYNAPSE",
    type: "project",
    detail: "Multi-agent AI canvas. ProduHacks 2025. Live at trysynapse.co.",
  },
  {
    id: "naiya",
    label: "NAIYA",
    type: "project",
    detail: "Adaptive planning app. BizTech Kickstart 2025. Next.js, Supabase.",
  },
  {
    id: "lockout",
    label: "LOCKOUT",
    type: "project",
    detail:
      "Social accountability app. nwHacks 2026. React Native, Firebase, Gemini.",
  },
  {
    id: "mathcom",
    label: "MATHCOM",
    type: "project",
    detail:
      "Nonprofit math learning platform with an AI tutoring layer. 15-person team.",
  },
  {
    id: "jipt",
    label: "JIPT",
    type: "project",
    detail:
      "LLM training data pipeline. Tesseract OCR, Gemini classification, 500+ JSONL pairs.",
  },
];

export const GRAPH_EDGES: GraphEdge[] = [
  { source: "music", target: "building" },
  { source: "meditation", target: "building" },
  { source: "movement", target: "meditation" },
  { source: "building", target: "covena" },
  { source: "building", target: "synapse" },
  { source: "building", target: "naiya" },
  { source: "building", target: "lockout" },
  { source: "building", target: "mathcom" },
  { source: "building", target: "jipt" },
  { source: "covena", target: "synapse" },
  { source: "synapse", target: "naiya" },
  { source: "naiya", target: "biztech" },
  { source: "lockout", target: "meditation" },
  { source: "mathcom", target: "jipt" },
  { source: "covena", target: "biztech" },
];
