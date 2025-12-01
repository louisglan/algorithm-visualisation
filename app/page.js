'use client';

import { useLayoutEffect, useRef, useState, useMemo } from "react";
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
  const nodeARef = useRef(null)
  const nodeBRef = useRef(null)
  const nodeCRef = useRef(null)
  const nodeDRef = useRef(null)
  const nodeERef = useRef(null)
  const nodeFRef = useRef(null)
  const nodeGRef = useRef(null)
  const nodeHRef = useRef(null)
  
  const rowRefs = useMemo(() =>[
    [nodeARef, nodeDRef, nodeGRef],
    [nodeCRef, nodeFRef],
    [nodeBRef, nodeERef, nodeHRef]
  ], [nodeARef, nodeBRef, nodeCRef, nodeDRef, nodeERef, nodeFRef, nodeGRef, nodeHRef])

  const [lines, setLines] = useState({A: {B: {x1: 0, y1: 0}}});

  // measure DOM and set state — useLayoutEffect so measurement happens before paint
  useLayoutEffect(() => {
    function updatePositions() {
      for (let row of rowRefs) {
        for (let ref of row) {
          if (!ref.current) return; 
        }
      }
      const rects = {
        A: nodeARef.current.getBoundingClientRect(),
        B: nodeBRef.current.getBoundingClientRect(),
        C: nodeCRef.current.getBoundingClientRect(),
        D: nodeDRef.current.getBoundingClientRect(),
        E: nodeERef.current.getBoundingClientRect(),
        F: nodeFRef.current.getBoundingClientRect(),
        G: nodeGRef.current.getBoundingClientRect(),
        H: nodeHRef.current.getBoundingClientRect()
      }

      const linesTemp = {}

      for (let key in adjacencyList) {
        linesTemp[key] = {}
        const neighbours = adjacencyList[key]
        for (let neighbour of neighbours) {
          linesTemp[key][neighbour] = {
            x1: rects[key].left + rects[key].width / 2,
            y1: rects[key].top + rects[key].height / 2,
            x2: rects[neighbour].left + rects[neighbour].width / 2,
            y2: rects[neighbour].top + rects[neighbour].height / 2
          }
        }
      }

      setLines(linesTemp);
    }

    updatePositions();
    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions, { passive: true });

    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, [rowRefs]); // re-run when refs populate
  const offset = {
    ax1: lines.A.B.x1,
    ay1: lines.A.B.y1
  }
  const rows = [
    ['A', 'D', 'G'],
    ['C', 'F'],
    ['B', 'E', 'H']
  ]
  return (
    <div id='graph'>
      {rows.map((row, i) => (
        <div className="row" key={i}>
          {row.map((el, j) => <Node id={el} key={j} reference={rowRefs[i][j]}/>)}
        </div>
      ))}
      {Object.keys(lines).map((startPoint, i) => {
        return Object.keys(lines[startPoint]).map((endPoint, j) => {
          console.log(startPoint, endPoint, lines[startPoint][endPoint]);
          return <Line line={lines[startPoint][endPoint]} offset={offset} key={`${i}-${j}`}/>
        })
      })}
    </div>
  );
}