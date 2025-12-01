'use client';

import { useEffect, useRef } from "react";
import Node from "./components/Node";

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
  const nodeARef = useRef(null);

  useEffect(() => {
    if (nodeARef.current) {
      console.log(nodeARef.current.getBoundingClientRect());
    }
  }, []);  
  return (
    <div id='graph'>
      <div className="row">
        <Node id='A' ref={nodeARef}/>
        <Node id='D' />
        <Node id='G' />
      </div>
      <div className="row">
        <Node id='C' />
        <Node id='F' />
      </div>
      <div className="row">
        <Node id='B' />
        <Node id='E' />
        <Node id='H' />
      </div>
    </div>
  );
}
