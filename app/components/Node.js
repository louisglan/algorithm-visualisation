import React from 'react';
export default function Node({ id, ref }) {
  return (
    <div ref={ref} className="node">
      {id}
    </div>
  );
};