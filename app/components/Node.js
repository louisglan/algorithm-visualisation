import React from 'react';
export default function Node({ id, reference, currentNode, queuedNode }) {
  return (
    <div ref={reference} className="node" style={{backgroundColor: currentNode==id ? "yellow" : queuedNode==id ? "blue" : "white"}}>
      {id}
    </div>
  );
};