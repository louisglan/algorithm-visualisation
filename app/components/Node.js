import React from 'react';
export default function Node({ id, reference, inspectedNode }) {
  return (
    <div ref={reference} className="node" style={{color: inspectedNode==id ? "red" : "black"}}>
      {id}
    </div>
  );
};