import React from 'react'

function Char(char: any, i: number, index: number) {
  return (
    <div
      onMouseEnter={(event: any) => {
        event.target.style.backgroundColor = 'lightblue'
      }}
      onMouseLeave={(event: any) => {
        event.target.style.backgroundColor = null
      }}
      onClick={(event: any) => {
        //   Transforms.select(editor, target)
        //   insertMention(editor, chars[index])
        //   setTarget(null)
      }}
      key={char}
      style={{
        padding: '1px 3px',
        borderRadius: '3px',
        background: i === index ? '#B4D5FF' : 'transparent',
      }}
    >
      {char}
    </div>
  )
}

export default Char
