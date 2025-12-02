'use client';

import { useLayoutEffect, useMemo, useState, createRef } from "react";
import Node from "./components/Node";
import Line from "./components/Line"

const adjacencyList = {
  A: ['B', 'C', 'D'],
  B: ["A", "C", "E"],
  C: ["A", "B", "D", "E", "F"],
  D: ["A", "C", "F", "G"],
  E: ["B", "C", "F", "H"],
  F: ["C", "D", "E", "G", "H"],
  G: ["D", "F", "H"],
  H: ["E", "F", "G"]
};

export default function Home() {
  // This allows us to colour our nodes by passing the inspected node into our nodes and colouring dynamically
  const [inspectedNode, setInspectedNode] = useState("A")

  // ids corresponding to nodes. We need useMemo to cache the return value to prevent continuous rerenders in useLayoutEffect 
  // (ids are used in useLayoutEffect - this is a silly React thing don't worry too much about it)
  const ids = useMemo(() => Object.keys(adjacencyList), []);

  // programmatic refs for each id (stable because of useMemo)
  const nodeRefs = useMemo(() => {
    const map = {};
    ids.forEach(id => (map[id] = createRef())); // createRef is an alternative to useRef that can be used in callbacks - it allows us to create refs dyanmically for each node
    return map;
  }, [ids]);

  // layout of nodes
  const rows = [
    ['A', 'D', 'G'],
    ['C', 'F'],
    ['B', 'E', 'H']
  ];

  const [lines, setLines] = useState([]); // array of unique edges

  useLayoutEffect(() => {
    let mounted = true;
    let ro;

    const allReady = () => ids.every(id => nodeRefs[id].current);

    function updatePositions() {
      if (!allReady()) return;

      // compute centers (viewport coordinates)
      const centers = {};
      ids.forEach(id => {
        const r = nodeRefs[id].current.getBoundingClientRect();
        centers[id] = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });

      // unique edges (start < end to avoid duplicates that we have due to adjacency list being multidirectional)
      const out = [];
      for (const start of ids) {
        for (const end of adjacencyList[start]) {
          if (start >= end) continue;
          out.push({
            start,
            end,
            x1: centers[start].x,
            y1: centers[start].y,
            x2: centers[end].x,
            y2: centers[end].y
          });
        }
      }

      setLines(out);
      // This is testing that we can change our coloured node after three seconds - it works. We will be able to use this for our bfs
      setTimeout(() => setInspectedNode("C"), 3000)
    }

    // wait until all nodes have mounted (DOM refs populated). Ignore this
    function tryInit() {
      if (!mounted) return;
      if (!allReady()) {
        requestAnimationFrame(tryInit);
        return;
      }

      updatePositions();
      ro = new ResizeObserver(updatePositions);
      ids.forEach(id => ro.observe(nodeRefs[id].current));
      window.addEventListener('resize', updatePositions);
      window.addEventListener('scroll', updatePositions, { passive: true });
    }

    tryInit();

    return () => {
      mounted = false;
      ro?.disconnect();
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, [ids, nodeRefs]);

  return (
    <div id='graph'>
      {rows.map((row, i) => (
        <div className="row" key={i}>
          {row.map((id) => <Node id={id} key={id} reference={nodeRefs[id]} inspectedNode={inspectedNode}/>)}
        </div>
      ))}

      {lines.map((line) => (
        <Line key={`${line.start}-${line.end}`} line={line} />
      ))}
    </div>
  );
}