import React from 'react'
import FormItem from './FormItem'
import GridElement from './GridElement'
import MyInput from './MyInput'



function renderSquare(i, myForm) {
  const x = i % 5
  const y = Math.floor(i / 5)
  const fill = myForm.find(pos => x === pos.positionX && y === pos.positionY)
  // const isInpitHere = x === positionX && y === positionY
  const myInput = fill ? <MyInput /> : null

  return (
    <div key={i}>
      <GridElement classIndex={i}>{myInput}</GridElement>
    </div>
  )
}
function GridArea({ length, myForm }) {
  // console.log(myForm);
  const areaElements = []
  for (let i = 0; i < length; i++) {
    areaElements.push(renderSquare(i, myForm));
  }
  console.log(areaElements);
  return <>
    {areaElements}
  </>
}

export default GridArea