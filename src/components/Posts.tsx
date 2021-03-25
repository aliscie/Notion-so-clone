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
import Chip from '@material-ui/core/Chip'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import useStyles from '../uiStyles/useStyles'
import usePosts from '../Hooks/usePosts'
import RichText from '../slatejs/RichText'

import Collaps from '../ui/Collaps'

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
          title={<a href={`/user/${addedBy.id}`}>{addedBy.username}</a>}
          subheader={<a href={`/post/${item.id}`}>{item.createdDate}</a>}
        />
        <CardContent>
          <RichText item={item} />
        </CardContent>
        <Collaps title="Comments">
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Sandra Adams
                    </Typography>
                    {' — Do you have Paris recommendations? Have you ever…'}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Collaps>
      </Card>
    )
  })
}
export default Posts
