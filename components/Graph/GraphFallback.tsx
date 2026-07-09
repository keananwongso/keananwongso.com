import { GRAPH_EDGES, GRAPH_NODES } from "@/lib/content";

const TYPE_LABELS: Record<string, string> = {
  domain: "domain",
  work: "work",
  project: "project",
};

function connectionsOf(id: string): string[] {
  const labelById = new Map(GRAPH_NODES.map((n) => [n.id, n.label]));
  return GRAPH_EDGES.filter(
    (e) => e.source === id || e.target === id
  ).map((e) => labelById.get(e.source === id ? e.target : e.source)!);
}

/**
 * Semantic version of the interdependence graph. Visible on small screens,
 * screen-reader-only where the canvas graph renders. Carries all the real
 * information: every node, its detail, and its connections.
 */
export default function GraphFallback({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`px-6 md:px-20 ${className}`}>
      <p className="mono-label">Interdependence</p>
      <h2 className="mt-4 font-display text-[clamp(30px,4vw,38px)] font-normal text-ink">
        Nothing stands alone.
      </h2>
      <ul className="mt-12 max-w-[52ch] list-none space-y-10">
        {GRAPH_NODES.map((node) => (
          <li key={node.id}>
            <h3 className="mono-label text-[12px] text-ink">
              {node.label}
              <span className="text-ink-muted">
                {" "}
                / {TYPE_LABELS[node.type]}
              </span>
            </h3>
            <p className="mt-2 max-w-[40ch]">{node.detail}</p>
            <p className="mono-label mt-3">
              Connects to: {connectionsOf(node.id).join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
