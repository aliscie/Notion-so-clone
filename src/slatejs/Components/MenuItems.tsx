import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import { Editor } from 'slate'
import { Tooltip } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import UserChip from '../../Components/UserChip'

function MenuItems(
  chars: any,
  setIndex: any,
  activate_mention_insert: any,
  ref: any,
  index: any,
  Component?: any,
) {
  const ComponentsItems = (char: any, i: number) => {
    return (
      <Tooltip
        title={
          <div>
            <b>Click</b> or Hit <b>Enter</b>: for new block
            <div>
              <b>Tab</b>: to modify the current block.
            </div>
          </div>
        }
      >
        <div>
          <MenuItem style={{ background: i === index ? 'lightgray' : 'white' }}>
            <Typography variant={char}>{char}</Typography>

            {/* the current is {current} */}
          </MenuItem>
        </div>
      </Tooltip>
    )
  }

  const HastagesItems = (char: string, i: number) => {
    return <div>xxx</div>
  }

  return (
    <Paper
      ref={ref}
      style={{
        maxHeight: '30%',
        overflow: 'auto',
        cursor: 'pointer',
        top: '-9999px',
        left: '-9999px',
        position: 'absolute',
        zIndex: 1,
        padding: '3px',
        backgroundColor: 'white',
      }}
    >
      {chars.map((char: string, i: number) => {
        //   var current: any
        //   const [match]: any = Editor.nodes(editor, {
        //     match: (n: any) => (current = n.type),
        //   })

        return (
          <div
            onMouseDown={activate_mention_insert}
            onMouseEnter={() => setIndex(i)}
          >
            {!Component && ComponentsItems(char, i)}
            {Component && UserChip(char, i === index)}
            {/* {Component && UserChip(char, i === index)} */}
          </div>
        )
      })}
    </Paper>
  )
}

export default MenuItems
