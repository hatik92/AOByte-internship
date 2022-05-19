import React, { useState } from "react";
import { useDrop } from "react-dnd";
import styles from "./dragDrop.module.css";
import Input from "./Input";

const InputList = [
  {
    id: 1,
    type: 'text',
  },
  {
    id: 2,
    type: 'radio',
  },
  {
    id: 3,
    type: 'checkbox',
  },
];

function DragDrop() {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "input",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const inputList = InputList.filter((input) => id === input.id);
    setBoard((board) => [...board, inputList[0]]);
  };
  return (
    <>
      <div className={styles.inputs}>
        {InputList.map((input) => {
          return <Input id={input.id} type={input.type} key={input.id} />
        })}
      </div>
      <form>
        <div className={styles.form} ref={drop}>
          {board.map((input) => {
            return <input type={input.type} id={input.id} />;
          })}
        </div>
      </form>
    </>
  );
}

export default DragDrop;
