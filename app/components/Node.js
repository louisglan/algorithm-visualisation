import React from 'react';
export default function Node({ id, reference, currentNode, queuedNode, routeNodes }) {
  return (
    <div ref={reference} className="node" style={{backgroundColor: routeNodes.includes(id) ? "green" : currentNode==id ? "yellow" : queuedNode==id ? "lightBlue" : "white"}}>
      {id}
    </div>
  );
};