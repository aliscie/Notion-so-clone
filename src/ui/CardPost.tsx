import React from 'react'
import { CardHeader, Avatar } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ListItem from '@material-ui/core/ListItem'

function CardPost(props: any) {
  const [open, setOpen] = React.useState<any>(false)

  const handleClick: any = () => {
    setOpen(!open)
  }
  const { id, description, addedBy, createdDate, comment }: any = props.item
  return (
    <Card style={{ margin: '20px' }} key={id}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={addedBy.imageUrl} />}
        action={props.action}
        title={<a href={`/user/${addedBy.id}`}>{addedBy.username}</a>}
        subheader={<a href={`/post/${id}`}>{createdDate}</a>}
      />
      <CardContent>{props.content}</CardContent>

      {typeof props.header.content !== 'string' ? (
        <div>
          <ListItem button onClick={handleClick}>
            {props.header.title}
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.header.content}
          </Collapse>
        </div>
      ) : (
        ''
      )}
    </Card>
  )
}

export default CardPost
