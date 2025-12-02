import React from 'react';
export default function Node({ id, reference, inspectedNode }) {
  return (
    <div ref={reference} className="node" style={{backgroundColor: inspectedNode==id ? "yellow" : "white"}}>
      {id}
    </div>
  );
};