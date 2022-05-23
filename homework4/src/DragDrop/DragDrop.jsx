import React, { useState } from "react";
import { useDrop } from "react-dnd";
import styles from "./dragDrop.module.css";
import Input from "./Input";

const inputList = [
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
    drop: (item) => addInputToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addInputToBoard = (id) => {
    const currentInputList = inputList.filter((input) => id === input.id);
    setBoard((board) => [...board, currentInputList[0]]);
  };
  return <div className={styles.formContainer}>
    <div className={styles.inputs}>
      {inputList.map((input) => {
        return <Input id={input.id} type={input.type} key={input.id} />
      })}
    </div>
    <div className={styles.formBlock}>
      <form ref={drop}>
        <div className={styles.form}>
          {board.map((input, i) => {
            return <input key={i} className={styles[`div` + i]} type={input.type} id={input.id} />;
          })}
          {/* {isOver && <div className={styles.addNewInput} />} */}
        </div>
      </form>
    </div>
  </div>
}

export default DragDrop;
