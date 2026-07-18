"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ForceGraphMethods,
  ForceGraphProps,
  LinkObject,
  NodeObject,
} from "react-force-graph-2d";
import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from "d3-force";
import {
  GRAPH_EDGES,
  GRAPH_NODES,
  type GraphEdge,
  type GraphNode,
  type NodeType,
} from "@/lib/content";
import GraphFallback from "./GraphFallback";
import DetailPanel from "./DetailPanel";

type GNode = NodeObject<GraphNode>;
type GLink = LinkObject<GraphNode, GraphEdge>;
type GraphMethods = ForceGraphMethods<GNode, GLink>;

type FGProps = ForceGraphProps<GNode, GLink> & {
  graphRef: React.MutableRefObject<GraphMethods | undefined>;
  onReady?: () => void;
};

const ForceGraph2D = dynamic(
  async () => {
    const { default: FG } = await import("react-force-graph-2d");
    function ForceGraphWithRef({ graphRef, onReady, ...rest }: FGProps) {
      useEffect(() => {
        onReady?.();
      }, [onReady]);
      return <FG ref={graphRef} {...rest} />;
    }
    return ForceGraphWithRef;
  },
  { ssr: false, loading: () => null }
);

const LINK_DISTANCE = 130;
const CHARGE_STRENGTH = -460;
const COLLIDE_PADDING = 14;

function nodeFontSize(type: NodeType) {
  return type === "domain" ? 12 : 10.5;
}

function nodePad(type: NodeType) {
  return type === "domain" ? 15 : 11;
}

/**
 * Cheap character-count radius estimate used only for the pre-settle pass,
 * before the label font has been measured. Hanken Grotesk lowercase averages
 * ~0.5em per glyph.
 */
function estimateRadius(node: GraphNode) {
  const fs = nodeFontSize(node.type);
  const width = node.label.length * fs * 0.5;
  return width / 2 + nodePad(node.type);
}

/**
 * Accurate radius: measure the lowercase label in the real label font via an
 * offscreen 2D context. Falls back to the estimate if canvas is unavailable.
 */
function measureRadius(node: GraphNode, font: string): number {
  if (typeof document === "undefined") return estimateRadius(node);
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return estimateRadius(node);
  ctx.font = `500 ${nodeFontSize(node.type)}px ${font}`;
  const width = ctx.measureText(node.label.toLowerCase()).width;
  return width / 2 + nodePad(node.type);
}

const ESTIMATED_RADIUS_BY_ID = new Map(
  GRAPH_NODES.map((n) => [n.id, estimateRadius(n)])
);
const LABEL_BY_ID = new Map(GRAPH_NODES.map((n) => [n.id, n.label]));

const NEIGHBORS_BY_ID = (() => {
  const m = new Map<string, Set<string>>();
  GRAPH_NODES.forEach((n) => m.set(n.id, new Set([n.id])));
  GRAPH_EDGES.forEach((e) => {
    m.get(e.source)!.add(e.target);
    m.get(e.target)!.add(e.source);
  });
  return m;
})();

function endpointId(
  v: string | number | { id?: string | number } | undefined
): string {
  return typeof v === "object" && v !== null ? String(v.id) : String(v);
}

function withAlpha(hex: string, alpha: number) {
  const h = hex.replace("#", "").trim();
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface CanvasTheme {
  paperRaised: string;
  ink: string;
  inkMuted: string;
  hairline: string;
  hairlineStrong: string;
  bloom2: string;
  labelFont: string;
}

/**
 * A gentle ambient "breeze": tiny smooth per-node nudges so the settled
 * graph keeps floating. Velocity is clamped so it never turns frantic.
 */
function makeBreezeForce() {
  const MAX_V = 0.9;
  const ACCEL = 0.045;
  let nodes: GNode[] = [];
  let phases: number[] = [];
  let t = 0;
  const clamp = (v: number) => Math.max(-MAX_V, Math.min(MAX_V, v));
  const force = (() => {
    t += 0.016;
    nodes.forEach((n, i) => {
      if (n.fx != null || n.fy != null) return;
      n.vx = clamp((n.vx ?? 0) + ACCEL * Math.sin(t * 0.55 + phases[i]));
      n.vy = clamp((n.vy ?? 0) + ACCEL * Math.cos(t * 0.42 + phases[i] * 1.7));
    });
  }) as { (alpha: number): void; initialize?: (ns: GNode[]) => void };
  force.initialize = (ns: GNode[]) => {
    nodes = ns;
    phases = ns.map(() => Math.random() * Math.PI * 2);
  };
  return force;
}

/** Pre-settle the layout with the same forces the live sim uses, so the
 *  graph mounts already calm instead of exploding into place. */
function buildSettledGraphData() {
  const nodes: GNode[] = GRAPH_NODES.map((n) => ({ ...n }));
  const simLinks = GRAPH_EDGES.map((e) => ({ ...e }));
  forceSimulation(nodes)
    .force(
      "link",
      forceLink(simLinks)
        .id((n) => (n as GNode).id as string)
        .distance(LINK_DISTANCE)
    )
    .force("charge", forceManyBody().strength(CHARGE_STRENGTH))
    .force("x", forceX(0).strength(0.05))
    .force("y", forceY(0).strength(0.05))
    .force(
      "collide",
      forceCollide<GNode>(
        (n) => ESTIMATED_RADIUS_BY_ID.get(n.id as string)! + COLLIDE_PADDING
      )
    )
    .stop()
    .tick(300);
  return { nodes, links: GRAPH_EDGES.map((e) => ({ ...e })) as GLink[] };
}

/** Read the design tokens off the document root for canvas painting.
 *  Returns null during SSR; the canvas only renders client-side anyway. */
function readTheme(): CanvasTheme | null {
  if (typeof window === "undefined") return null;
  const style = getComputedStyle(document.documentElement);
  const token = (name: string) => style.getPropertyValue(name).trim();
  return {
    paperRaised: token("--paper-raised"),
    ink: token("--ink"),
    inkMuted: token("--ink-muted"),
    hairline: token("--hairline"),
    hairlineStrong: token("--hairline-strong"),
    bloom2: token("--bloom-2"),
    labelFont: token("--font-hanken") || "sans-serif",
  };
}

function readReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function InterdependenceGraph() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<GraphMethods | undefined>(undefined);
  const configuredRef = useRef(false);

  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [theme] = useState<CanvasTheme | null>(readTheme);
  const [reducedMotion] = useState(readReducedMotion);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const graphData = useMemo(() => buildSettledGraphData(), []);

  // Radii measured in the real (proportional) label font. Falls back to the
  // estimate until the theme is read. Drives collision, painting, and hit area.
  const radiusById = useMemo(() => {
    if (!theme) return ESTIMATED_RADIUS_BY_ID;
    return new Map(
      GRAPH_NODES.map((n) => [n.id, measureRadius(n, theme.labelFont)])
    );
  }, [theme]);

  // Track the container size for the canvas.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fit the graph into its canvas (which is already inset below the heading).
  const fitGraph = useCallback(() => {
    const fg = fgRef.current;
    if (!fg || dims.width === 0) return;
    fg.zoomToFit(0, 70);
  }, [dims]);

  // Configure the live simulation the moment the graph mounts, before its
  // first animation frame, so it takes over the pre-settled layout smoothly.
  const handleReady = useCallback(() => {
    const fg = fgRef.current;
    if (!fg || configuredRef.current) return;
    configuredRef.current = true;
    (fg.d3Force("link") as ReturnType<typeof forceLink> | undefined)?.distance(
      LINK_DISTANCE
    );
    (
      fg.d3Force("charge") as ReturnType<typeof forceManyBody> | undefined
    )?.strength(CHARGE_STRENGTH);
    fg.d3Force("x", forceX(0).strength(0.05));
    fg.d3Force("y", forceY(0).strength(0.05));
    fg.d3Force(
      "collide",
      forceCollide<GNode>(
        (n) => radiusById.get(n.id as string)! + COLLIDE_PADDING
      )
    );
    if (!reducedMotion) {
      fg.d3Force("breeze", makeBreezeForce());
    }
    fitGraph();
  }, [reducedMotion, fitGraph, radiusById]);

  // Refit when the viewport is resized.
  useEffect(() => {
    if (configuredRef.current) fitGraph();
  }, [fitGraph]);

  // Close the detail panel on Escape or on clicks outside the graph section.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!sectionRef.current?.contains(e.target as Node)) setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const focusId = hoverId ?? selectedId;
  const activeIds = focusId ? NEIGHBORS_BY_ID.get(focusId) : null;

  const paintNode = useCallback(
    (node: GNode, ctx: CanvasRenderingContext2D) => {
      if (!theme || node.x == null || node.y == null) return;
      const id = node.id as string;
      const r = radiusById.get(id)!;
      const fs = nodeFontSize(node.type);
      const dimmed = activeIds ? !activeIds.has(id) : false;
      const emphasized = activeIds ? activeIds.has(id) : false;

      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
      ctx.fillStyle = dimmed
        ? withAlpha(theme.paperRaised, 0.55)
        : theme.paperRaised;
      ctx.fill();
      ctx.strokeStyle = dimmed
        ? withAlpha(theme.hairline, 0.5)
        : emphasized
          ? theme.hairlineStrong
          : theme.hairline;
      ctx.lineWidth = emphasized ? 1.25 : 0.75;
      ctx.stroke();

      ctx.font = `500 ${fs}px ${theme.labelFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = dimmed ? withAlpha(theme.inkMuted, 0.55) : theme.ink;
      ctx.fillText(node.label.toLowerCase(), node.x, node.y);
    },
    [theme, activeIds, radiusById]
  );

  const paintPointerArea = useCallback(
    (node: GNode, color: string, ctx: CanvasRenderingContext2D) => {
      if (node.x == null || node.y == null) return;
      ctx.fillStyle = color;
      ctx.beginPath();
      // Generous hit target beyond the visible circle.
      ctx.arc(node.x, node.y, radiusById.get(node.id as string)! + 10, 0, 2 * Math.PI);
      ctx.fill();
    },
    [radiusById]
  );

  const linkColor = useCallback(
    (link: GLink) => {
      if (!theme) return "transparent";
      if (!focusId) return theme.hairline;
      const s = endpointId(link.source);
      const t = endpointId(link.target);
      if (s === focusId || t === focusId) return theme.bloom2;
      return withAlpha(theme.hairline, 0.35);
    },
    [theme, focusId]
  );

  const linkWidth = useCallback(
    (link: GLink) => {
      if (!focusId) return 1;
      const s = endpointId(link.source);
      const t = endpointId(link.target);
      return s === focusId || t === focusId ? 2 : 1;
    },
    [focusId]
  );

  const selectedNode = selectedId
    ? GRAPH_NODES.find((n) => n.id === selectedId) ?? null
    : null;
  const selectedConnections = selectedId
    ? [...NEIGHBORS_BY_ID.get(selectedId)!]
        .filter((id) => id !== selectedId)
        .map((id) => LABEL_BY_ID.get(id)!)
    : [];

  return (
    <section
      ref={sectionRef}
      aria-label="Interdependence graph"
      className="relative md:-mt-[16svh]"
    >
      <div className="relative hidden h-[94svh] md:block">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[12svh] right-0 left-0 z-10 flex flex-col items-center text-center"
        >
          <p className="label">interdependence</p>
          <h2 className="mt-3 font-display text-[clamp(24px,2.6vw,36px)] font-medium leading-[1.2] text-ink">
            nothing stands alone.
          </h2>
        </div>

        {/* Canvas is inset below the heading so nodes never reach the title. */}
        <div ref={containerRef} className="absolute inset-x-0 bottom-0 top-[24svh]">
          {theme && dims.width > 0 && (
            <ForceGraph2D
              graphRef={fgRef}
              onReady={handleReady}
              width={dims.width}
              height={dims.height}
              graphData={graphData}
              backgroundColor="rgba(0,0,0,0)"
              warmupTicks={0}
              cooldownTicks={reducedMotion ? 0 : undefined}
              cooldownTime={reducedMotion ? undefined : Infinity}
              d3AlphaDecay={0}
              d3VelocityDecay={0.55}
              autoPauseRedraw={false}
              enableZoomInteraction={false}
              enablePanInteraction={false}
              enableNodeDrag={!reducedMotion}
              nodeLabel={() => ""}
              nodeCanvasObject={paintNode}
              nodePointerAreaPaint={paintPointerArea}
              linkColor={linkColor}
              linkWidth={linkWidth}
              onNodeHover={(node) =>
                setHoverId(node ? (node.id as string) : null)
              }
              onNodeClick={(node) =>
                setSelectedId((prev) =>
                  prev === node.id ? null : (node.id as string)
                )
              }
              onBackgroundClick={() => setSelectedId(null)}
            />
          )}
        </div>

        {selectedNode && (
          <DetailPanel node={selectedNode} connections={selectedConnections} />
        )}
      </div>

      <GraphFallback className="md:sr-only" />
    </section>
  );
}
