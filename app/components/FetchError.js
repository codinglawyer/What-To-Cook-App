import React from 'react'
import T from 'prop-types'

const FetchError = ({ message, onRetry }) => (
  <div>
    <div>Oops, You've got an error: {message}</div>
    <button onClick={onRetry}>Refresh</button>
  </div>
)

FetchError.propTypes = {
  message: T.string,
  onRetry: T.func
}

export default FetchError
