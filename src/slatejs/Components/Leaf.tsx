import React from 'react'
import RichText from '../RichText'
import Popper from '@material-ui/core/Popper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import useStyles from '../../uiStyles/useStyles'
import { Paper } from '@material-ui/core'

const Leaf = (props: any) => {
  const ref = React.useRef<HTMLButtonElement | null>(null)
  const classes = useStyles()
  var { attributes, children, leaf }: any = props
  const [anchorEl, setAnchorEl]: any = React.useState<null | HTMLElement>(null)

  const handleClick: any = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  if (leaf.Special) {
    // if (props.is_just_created){
    //    handleClick()
    // }

    children = (
      <span>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <span aria-describedby={id}>
            <span
              className={classes.hoverig}
              style={{
                borderBottom: '2px solid #FFD400',
              }}
              onClick={handleClick}
            >
              {children}
            </span>
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Paper>
                xx
                {/* <RichText
                  item={{
                    addedBy: { id: 0 },
                    id: 0,
                    username: '',
                    description:
                      '[{"type":"paragraph","children":[{"text":"my values are here"}]}]',
                    whoCanSee: [],
                    whoCanEdite: [],
                  }}
                /> */}
              </Paper>
            </Popper>
          </span>
        </ClickAwayListener>
      </span>
    )
  }
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = (
      <code
        style={{
          background: '#F0F0F7',
          borderRadius: '5px',
          color: 'tomato',
        }}
      >
        {children}
      </code>
    )
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}
export default Leaf
