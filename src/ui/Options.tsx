import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Paper, CardHeader, Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
export default function Options(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        aria-label="settings"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.options.map((item: any) => (
          <MenuItem
            onClick={() => {
              handleClose()
              item.action()
            }}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
