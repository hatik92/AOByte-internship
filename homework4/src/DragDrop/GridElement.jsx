import React from 'react'

function GridElement({classIndex, children}) {
  return <div
      style={{
        width: '100%',
        height: '100%'
      }}
      className={`div${classIndex + 1}`}
    >
      {children}
    </div>
}

export default GridElement