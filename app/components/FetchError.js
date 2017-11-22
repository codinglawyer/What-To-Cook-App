import React from 'react'

const FetchError = ({ message, onRetry }) => (
  <div>
    <div>Oops, You've got an error: {message}</div>
    <button onClick={onRetry}>Refresh</button>
  </div>
)

export default FetchError
