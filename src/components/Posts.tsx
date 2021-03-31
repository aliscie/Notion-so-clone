import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import useStyles from '../uiStyles/useStyles'
import usePosts from '../Hooks/usePosts'
import RichText from '../slatejs/RichText'
import { useSnackbar } from 'notistack'
import Options from '../ui/Options'
import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client'
import CardPost from '../ui/CardPost'
import Comment from '../ui/Comment'
import { Button } from '@material-ui/core'

function Posts(props: any) {
  const client: any = useApolloClient()
  const { enqueueSnackbar } = useSnackbar()

  const classes = useStyles()
  const [
    loading,
    error,
    data,
    res,
    setstate,
    setDelete,
    createNewPost,
  ]: any = usePosts()

  if (loading) return <CircularProgress />
  else if (error) {
    enqueueSnackbar(JSON.stringify(error), { variant: 'error' })
    return <p> Error </p>
  }
  return (
    <div>
      <Button
        onClick={() => {
          createNewPost()
        }}
      >
        + create a new post
      </Button>
      {data.posts.map((item: any) => (
        <CardPost
          action={
            <Options
              options={[{ title: 'delete', action: () => setDelete(item.id) }]}
            />
          }
          content={<RichText item={item} />}
          header={{
            content:
              item.comment.length > 0 ? (
                <List>
                  {item.comment.map((item: any) => {
                    return <Comment comment={item} />
                  })}
                </List>
              ) : (
                ''
              ),
            title: `${item.comment.length} Comment${
              item.comment.length > 1 ? 's' : ''
            }`,
          }}
          item={item}
        />
      ))}
    </div>
  )
}
export default Posts
