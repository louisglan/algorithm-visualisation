import React from 'react';
export default function Node({ id, reference }) {
  return (
    <div ref={reference} className="node">
      {id}
    </div>
  );
};