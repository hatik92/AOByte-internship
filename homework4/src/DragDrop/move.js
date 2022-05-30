let inputPosition = [0, 0]
let observer = null

function emitChange() {
  observer(inputPosition)
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.')
  }

  observer = o
  emitChange()
}

export function moveInput(toX, toY) {
  inputPosition = [toX, toY]
  emitChange()
}