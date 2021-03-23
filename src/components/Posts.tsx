// TODO muck this strecture
import React from 'react'
import { render } from 'react-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from '@apollo/client'

import { Paper, CardHeader, Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import useStyles from '../uiStyles/useStyles'
import usePosts from '../Hooks/usePosts'
import RichTextExample from '../slatejs/RichTextExample'

function Posts() {
  const classes = useStyles()
  const { loading, error, data, res, setstate } = usePosts()
  if (loading) return <CircularProgress />
  else if (error) {
    return <p> Error </p>
  }

  return data.posts.map((item: any) => {
    const { id, description, addedBy } = item

    return (
      <Card style={{ margin: '20px' }} key={id}>
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={item.addedBy.imageUrl} />}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={addedBy.username}
          subheader={item.createdDate}
        />
        <CardContent>
          <RichTextExample item={item} />
        </CardContent>
      </Card>
    )
  })
}
export default Posts
