import React from "react";
import { useDrag } from "react-dnd";

function Input({ id, url, type }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "input",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <input
      ref={drag}
      type={type}
      // style={{ border: isDragging ? "5px solid pink" : "0px", boxSizing: "border-box" }}
    />
  );
}

export default Input;
