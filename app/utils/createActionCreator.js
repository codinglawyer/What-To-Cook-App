const createActionCreator = (type, ...argNames) => (...args) => {
  let action = { type }
  argNames.forEach((arg, i) => {
    action[argNames[i]] = args[i]
  })
  return action
}

export default createActionCreator
