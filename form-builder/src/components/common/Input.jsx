import React, { useState } from 'react'
import DragMove from './DragMove';

const Input = ({ type, placeholder }) => {
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0
  });
  const handleDragMove = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY
    });
  };
  return <>
    <DragMove onDragMove={handleDragMove}>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
          cursor:'grab'
        }}
        disabled
      />
    </DragMove>
  </>
}

export default Input