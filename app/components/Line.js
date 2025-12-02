export default function Line({line, offset}) {
    // ensure the svg is a full-screen overlay and above nodes
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="line"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'visible'
          }}
        >
          <line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.color}
            strokeWidth="2"
          />
        </svg>
    )
}