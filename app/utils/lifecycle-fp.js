import { isFunction } from 'lodash'
import { lifecycle as recomposeLifecycle } from 'recompose'

const lifecycleMethods = [
  'getInitialState',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
]

function lifecycle (spec) {
  const functionalSpec = lifecycleMethods.reduce((oldSpec, methodName) => {
    const newSpec = { ...oldSpec } // Clone
    const method = newSpec[methodName]

    if (isFunction(method)) {
      newSpec[methodName] = function (...args) {
        // eslint-disable-line
        return method.apply(this, [this.props, ...args])
      }
    }

    return newSpec
  }, spec)

  return recomposeLifecycle(functionalSpec)
}

export { lifecycle }
