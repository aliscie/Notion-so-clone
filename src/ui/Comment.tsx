import React from 'react'
import { Avatar, Paper } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import RichText from '../slatejs/RichText'

function Comment(props: any) {
  console.log(props)
  const comment: any = props.comment
  return (
    <Paper
      style={{ background: 'lightgray', borderRadius: '10px', margin: '5px' }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt={comment.addedBy.username}
            src={comment.addedBy.imageUrl}
          />
        </ListItemAvatar>
        <ListItemText
          primary={comment.addedBy.username}
          secondary={<RichText item={comment} />}
        />
      </ListItem>
    </Paper>
  )
}

export default Comment
