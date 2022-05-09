
const REQUIRED = 'required'
const MAX = 'max'
const MIN = 'min'
const PHONE = 'phone'
const URL = 'url'

export default class Schema {
  constructor(contacts) {
    this.contacts = contacts
  }
  validate(payload) {
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
        }
      }
    }
    return errors
  }
}
const passportValidator = (extra, message = 'Default error message') => {
  return {
    validate: () => {
      if (extra.length === 8 && /^.[A-Z][0-9][0-9][0-9][0-9][0-9][0-9]/.test(extra)) {
        return false
      } else {
        return true
      }
      // returns true/false
    },
    message
  }
}