import React from 'react'
import { useApolloClient } from '@apollo/client'
import useStyles from '../uiStyles/useStyles'
import { useSelected, useFocused } from 'slate-react'
function UserChip(username: string, select?: boolean) {
  // const classes = useStyles()
  const selected = useSelected()
  const focused = useFocused()

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
    <span
      // className={selected ? classes.focused : classes.chip}
      style={{
        paddingRight: '0.3em',
        paddingBottom: '0px',
        display: 'inline-block',
        borderRadius: '50em',
        backgroundColor: selected && focused ? 'lightblue' : 'lightgray',
      }}
    >
      <img
        style={{
          border: '4px solid gray',
          float: 'left',
          height: '1.2em',
          width: '1.2em',
          borderRadius: '50em',
        }}
        alt={username[0]}
        src={user.imageUrl}
      />
      {username}
    </span>
  )
}

export default UserChip
