import React, { useState } from "react"
import FormItem from "../../DragDrop/FormItem";
// import { Link, Outlet, useLocation } from "react-router-dom"
import './navbar.module.css'
import styles from './navbar.module.css'

const Navbar = ({ inputList }) => {
  // const loc = useLocation()
  const [isShow, setIsShow] = useState(true);

  return (<>
    {isShow && <nav>
      <p onClick={() => setIsShow(!isShow)}>X</p>
      <div className={styles.inputs}>
        {inputList.map((input) => {
          return <FormItem id={input.id} type={input.type} key={input.id} />
        })}
      </div>
    </nav>}
    {/* <div className={styles.pagesSection}>
      <Outlet />
    </div> */}
  </>)
}


export default Navbar