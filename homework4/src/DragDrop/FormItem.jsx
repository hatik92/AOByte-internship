import React from "react";
import { useDrag } from "react-dnd";

function FormItem({ id, url, type }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "input",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontWeight: 'bold',
        cursor: 'move',
      }}
      // style={{ border: isDragging ? "5px solid pink" : "0px", boxSizing: "border-box" }}
    >{type}</div>
  );
}

export default FormItem;
