"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { GraphNode } from "@/lib/content";

const TYPE_LABELS: Record<string, string> = {
  domain: "domain",
  work: "work",
  project: "project",
};

export default function DetailPanel({
  node,
  connections,
}: {
  node: GraphNode;
  connections: string[];
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.aside
      key={node.id}
      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={(e) => e.stopPropagation()}
      className="pointer-events-auto absolute bottom-[8svh] left-6 z-10 max-w-sm rounded-xl border-[0.5px] border-hairline bg-paper-raised p-6 md:left-20"
    >
      <div className="flex items-center gap-2.5">
        <span aria-hidden className="bloom h-2.5 w-2.5 rounded-full blur-[2px]" />
        <p className="mono-label">
          {node.label} / {TYPE_LABELS[node.type]}
        </p>
      </div>
      <p className="mt-3 max-w-[40ch] text-ink-soft">{node.detail}</p>
      <p className="mono-label mt-4">Connects to: {connections.join(", ")}</p>
    </motion.aside>
  );
}
