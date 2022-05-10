import React, { Component } from 'react';
import Schema from './Schema';


const schema = new Schema({
  firstName: {
    type: 'string',
    validators: ['required', 'min:3', 'max:8'],
    message: 'The field must contain min {min} letters'
  },
  email: {
    type: 'string',
    validators: ['email']
  },
  age: {
    type: 'numeric',
    validators: ['required']
  },
  passport: {
    type: 'string',
    validators: ['max:9', 'passport'],
    message: 'Invalid phone inputs'
  },
  website: {
    type: 'string',
    validators: ['url']
  },
  phoneNumbers: {
    type: 'array[string]',
    validators: ['phone']
  }
});


export class FormCustom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: {
        firstName: '',
        email: '',
        age: '',
        passport: '',
        website: '',
        phoneNumbers: []
      },
      error: {
        firstName: '',
        email: '',
        age: '',
        passport: '',
        website: '',
        phoneNumbers: ''
      }
    }
  }

  
  validateHandler = (e) => {
    e.preventDefault();
    const payload = {}
    for (let index = 0; index < e.target.length; index++) {
      if (e.target[index].name) {
        payload[e.target[index].name] = e.target[index].value
      }
    }
    const errors = schema.validate(payload);
    console.log(errors);
    for (const key in errors) {
      if (Object.hasOwnProperty.call(errors, key)) {
        const element = errors[key];
        let errorMessages = ''
        for (let index = 0; index < element.length; index++) {
          errorMessages += element[index]+', '
        }
        this.setState(state => ({
          error: {
            ...state.error,
            [key]: errorMessages
          }
        }))
      }
    }
  }
  onChange = () => {}
  errors = () => {
    return "AAA"
  }
  render() {
    return <>
        <form onSubmit={this.validateHandler}>
          <Input name='firstName' onChange={this.onChange} />
          <ErrorMessage name='firstName' errors={this.state.error.firstName} />
          <Email name='email' onChange={this.onChange} />
          <ErrorMessage name='email' errors={this.state.error.email} />
          <Numeric name='age' onChange={this.onChange} />
          <ErrorMessage name='age' errors={this.state.error.age} />
          <Passport name='passport' onChange={this.onChange} />
          <ErrorMessage name='passport' errors={this.state.error.passport} />
          <Url name='website' onChange={this.onChange} />
          <ErrorMessage name='website' errors={this.state.error.website} />
          <PhoneNumbers name='phoneNumbers' onChange={this.onChange} />
          <ErrorMessage name='phoneNumbers' errors={this.state.error.phoneNumbers} />
          <Button type='submit' />
        </form>
      </>
  }
}

export default FormCustom

const ErrorMessage = ({name, errors}) => {
  return (
    <>
      <p name={name}>{errors}</p>
    </>
  )
}

const Input = ({name, onChange}) => {
  return (
    <div>
      <input name={name} onChange={onChange}/>
    </div>
  )
}

const Numeric = ({name, onChange}) => {
  return (
    <div>
      <input type='number' name={name} onChange={onChange}/>
    </div>
  )
}


const Email = ({name, onChange}) => {
  return (
    <div>
      <input type='text' name={name} onChange={onChange}/>
    </div>
  )
}

const Passport = ({name, onChange}) => {
  return (
    <div>
      <input type='text' name={name} onChange={onChange} />
    </div>
  )
}

const Url = ({name, onChange}) => {
  return (
    <div>
      <input type='text' name={name} onChange={onChange} />
    </div>
  )
}

const PhoneNumbers = ({name, onChange}) => {
  return (
    <div>
      <input type='text' name={name} onChange={onChange} />
    </div>
  )
}

const Button = ({type}) => {
  return (
    <div>
      <input type={type}/>
    </div>
  )
}
