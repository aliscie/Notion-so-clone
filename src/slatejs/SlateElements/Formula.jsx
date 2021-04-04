import React from 'react'
import { Parser } from 'hot-formula-parser'
export var parser = new Parser()

function Formula(props) {
  const [s, set] = React.useState(false)
  const { attributes, children, element } = props
  return (
    <span onMouseEnter={() => set(true)} onMouseLeave={() => set(false)}>
      {s && (
        <code style={{ color: 'blue' }}>
          {children}
          {s && '='}
        </code>
      )}
      <span>{`${parser.parse(element.children[0].text).result}`}</span>
    </span>
  )
}

export default Formula
