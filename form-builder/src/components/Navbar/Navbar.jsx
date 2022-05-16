// import React from "react"
import Input from "../common/Input"
import './navbar.module.css'

const Navbar = () => {

  const inputTypes = [
    { type: 'text', placeholder: 'Text' },
    { type: 'textarea', placeholder: 'Textarea' },
    { type: 'select', placeholder: '' },
    { type: 'radio', placeholder: '' },
    { type: 'checkbox', placeholder: '' },
    { type: 'submit', placeholder: '' }
  ]
  return <>
    <nav>
      {inputTypes.map((input, index) =>
        <Input key={index} type={input.type} placeholder={input.placeholder} />
      )}
    </nav>
  </>
}


export default Navbar