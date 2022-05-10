
const REQUIRED = 'required';
const MAX = 'max';
const MIN = 'min';
const PHONE = 'phone';
const URL = 'url';
const EMAIL = 'email';
const PASSPORT = 'passport';

export default class Schema {
  constructor(contacts) {
    this.contacts = contacts
  }
  validate(payload) {
    console.log(payload);
    const errors = {}
    for (const key in this.contacts) {
      if (Object.hasOwnProperty.call(this.contacts, key)) {
        const element = this.contacts[key];
        console.log(key, element);
        errors[key] = []
        for (let index = 0; index < element.validators.length; index++) {
          const validators = element.validators[index].split(":")
          if (validators[0] === REQUIRED && !payload[key]) {
            errors[key].push("The field must required")
          }
          if (validators[0] === MAX && payload[key].length > validators[1]) {
            errors[key].push(`The field must not contain more than ${validators[1]} letters`)
          }
          if (validators[0] === MIN && payload[key].length < validators[1]) {
            errors[key].push(`The field must contain min ${validators[1]} letters`)
          }
          if (validators[0] === PASSPORT && !passportValidator(payload[key], element.message).validate()) {
            errors[key].push(element.message ? element.message : "Invalid passport series format")
          }
          if (validators[0] === URL && !urlValidator(payload[key])) {
            errors[key].push(element.message ? element.message : "Wrong URL")
          }
          if (validators[0] === EMAIL && !emailValidator(payload[key])) {
            errors[key].push(element.message ? element.message : "Wrong Email")
          }
          if (validators[0] === PHONE && !phoneNumberValidator(payload[key])) {
            errors[key].push(element.message ? element.message : "Wrong telephone number")
          }
        }
      }
    }
    return errors
  }
}
const passportValidator = (extra, message = 'Default error message') => {
  return {
    validate: () => {
      if (extra.length === 9 && /^.[A-Z][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.test(extra)) {
        return true
      } else {
        return false
      }
    },
    message
  }
}
const urlValidator = (extra) => {
  if (/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm.test(extra)) {
    return true
  } else {
    return false
  }
}

const emailValidator = (extra) => {
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(extra)) {
    return true
  } else {
    return false
  }
}

const phoneNumberValidator = (extra) => {
  if (/^[+]*[0-9]{1,4}[-\s\./0-9]*$/g.test(extra)) {
    return true
  } else {
    return false
  }
}