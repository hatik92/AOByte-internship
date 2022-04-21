
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'


class CustomPromise {
  constructor(executor) {
    this.state = PENDING
    this.result = undefined
    this.onFulfilledFn = []
    this.onRejectedFn = []
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.result = value
        this.onFulfilledFn.forEach(fn => {
          fn(this.result)
        })
      }
    }
    const reject = (error) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.result = error
        this.onRejectedFn.forEach(fn => {
          fn(this.result)
        })
      }
    }

    executor(resolve, reject)
  }
  then(onFulfilled, onRejected) {
    // debugger
    if (this.state === PENDING) {
      if (onFulfilled) {
        this.onFulfilledFn.push(onFulfilled)
      }
      if (onRejected) {
        this.onRejectedFn.push(onRejected)
      }
    }
    if (onFulfilled && this.state === FULFILLED) {
      onFulfilled(this.result)
      return
    }
    if (onRejected && this.state === REJECTED) {
      onRejected(this.result)
      return
    }
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
}


function load(url, type, callback, err) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = type;
  xhr.onload = function() {
    callback(xhr.response);
  };

  xhr.onerror = function(e) {
    err(e);
  };
  xhr.send();
}

const todos = new CustomPromise((resolve, reject) => {
  load('https://jsonplaceholder.typicode.com/todos/1', 'json', resolve, reject)
})
.then(res => console.log(res))
// .catch(err => console.log(err))
