import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import { useApolloClient } from '@apollo/client'
function UserChip(username: string, select?: boolean) {
  const client: any = useApolloClient()

  var user: { username: string; imageUrl: string } = {
    username: '',
    imageUrl: '',
  }
  const parsed_users = client.cache.data.data.ROOT_QUERY.users
  if (username && parsed_users) {
    user = parsed_users.find((item: any) => item.username == username)
  }

  return (
    <Chip
      size="small"
      color={select ? 'primary' : 'default'}
      avatar={<Avatar alt={username} src={user.imageUrl} />}
      label={username}
    />
  )
}

export default UserChip
