import React from 'react'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ListItem from '@material-ui/core/ListItem'

function Collaps({ children, title }: any) {
  const [open, setOpen] = React.useState<any>(false)

  const handleClick: any = () => {
    setOpen(!open)
  }
  return (
    <div>
      <ListItem button onClick={handleClick}>
        {title}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </div>
  )
}

export default Collaps
