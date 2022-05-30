import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import { canMoveInput } from "./canMove";
import "./dragDrop.module.css";
import styles from "./dragDrop.module.css";
import GridArea from "./GridArea";
import { moveInput } from "./move";

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
  const position = useSelector(state => state.position)
  const [myForm, setMyForm] = useState([
    // {id: 1,  type: 'text',  positionX: 2,  positionY: 5,},
    // {id: 2,  type: 'text',  positionX: 3,  positionY: 5,},
    // {id: 3,  type: 'text',  positionX: 4,  positionY: 5,},
    // {id: 4,  type: 'text',  positionX: 4,  positionY: 2,},
  ]);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "input",
      canDrop: canMoveInput(position.x, position.y),
      // drop: () => moveInput(position.x, position.y),
      drop: (item) => addInputToBoard(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      }),
    }),
    [position.x, position.y]
  );

  const addInputToBoard = (id) => {
    const currentInputList = inputList.find((input) => id === input.id);
    setMyForm((board) => [...board, currentInputList]);
  };
  return <div className={styles.formContainer}>
    <Navbar inputList={inputList} />
    <div className={styles.formBlock}>
      <form ref={drop}>
        <div className={styles.form}>
          <GridArea length={60} myForm={myForm} />
        </div>
        {isOver && !canDrop && <p>red</p>}
        {!isOver && canDrop && <p>yellow</p>}
        {isOver && canDrop && <p>success</p>}
        {/* <div className={styles.form}>
          {board.map((input, i) => {
            return <input key={i} className={styles[`div` + i]} type={input.type} id={input.id} />;
          })}
          {isOver && <div className={styles.addNewInput} style={{border: '2px solid black', width: '200px', height:'30px'}} />}
        </div> */}
      </form>
    </div>
  </div>
}

export default DragDrop;
