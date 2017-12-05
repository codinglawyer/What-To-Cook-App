export default function sagaWrapper (saga) {
  let nextValue = saga.next()

  return {
    next (value) {
      const currentValue = nextValue

      nextValue = saga.next(value)

      return currentValue
    },
    throw (exception) {
      const currentValue = nextValue

      nextValue = saga.throw(exception)

      return currentValue
    }
  }
}
