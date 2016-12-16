import Emitter from 'es6-event-emitter'

const searchSliceIndexByName = (slice = [], name) => {
  for (let i = 0; i < slice.length; i ++) {
    if (slice[i].name === name) {
      return i
    }
  }

  return -1
}

class TzEmitter extends Emitter {}

let emitterList = []
export const myEmitter = new TzEmitter()

export function emitterOn(name, callback) {
  if (searchSliceIndexByName(emitterList, name) > -1) {
    throw new Error(`${name} already has an event`)
  } else {
    myEmitter.on(name, callback)
    emitterList.push({
      name,
      callback,
    })
  }
}

export function removeEmitter(name) {
  const index = searchSliceIndexByName(emitterList, name)
  if (index > -1) {
    myEmitter.off(name, emitterList[index].callback)
    emitterList.splice(index, 1)
  }
}

