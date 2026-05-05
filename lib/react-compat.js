'use strict'
// Shim for libraries (e.g. @sanity/vision) that import useEffectEvent from 'react'
// before it was added to the stable public API in React 19.
const React = require('react')
module.exports = Object.assign({}, React, {
  useEffectEvent:
    React.useEffectEvent ||
    React.experimental_useEffectEvent ||
    // Minimal polyfill: just return the callback as-is.
    // This is safe because useEffectEvent is only used to create stable
    // event-handler wrappers — returning fn unchanged preserves the behaviour
    // while avoiding the "not exported" build error.
    function useEffectEvent(fn) { return fn },
})
