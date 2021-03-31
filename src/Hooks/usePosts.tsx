import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useSnackbar } from 'notistack'

const GET_TODOS = gql`
  query {
    posts {
      comment {
        whoCanEdite {
          id
        }

        description
        addedBy {
          username
          imageUrl
        }
      }
      createdDate
      description
      id
      addedBy {
        imageUrl
        id
        username
      }
      whoCanEdite {
        id
      }
    }
  }
`

const UPDATE_TODO = gql`
  mutation($id: Int!, $description: String!) {
    updatePost(id: $id, description: $description) {
      post {
        description
      }
    }
  }
`

const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id) {
      post {
        id
        description
      }
    }
  }
`

const ADD_TODO = gql`
  mutation CreatePost($description: String!) {
    createPost(description: $description) {
      post {
        comment {
          whoCanEdite {
            id
          }

          description
          addedBy {
            username
            imageUrl
          }
        }
        createdDate
        description
        id
        addedBy {
          imageUrl
          id
          username
        }
        whoCanEdite {
          id
        }
      }
    }
  }
`

export default function usePosts() {
  const { enqueueSnackbar } = useSnackbar()
  const [state, setstate] = React.useState({ id: null, description: '' })
  const { loading, error, data } = useQuery(GET_TODOS)
  const [updatePost, res]: any = useMutation(UPDATE_TODO)

  const [createPost]: any = useMutation(ADD_TODO, {
    update(cache, { data: { createPost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: createPost.post,
              fragment: gql`
                fragment x on x {
                  id
                  description
                }
              `,
            })
            return existingPosts.concat(newPostRef)
          },
        },
      })
    },
  })

  const [deletePost]: any = useMutation(DELETE_POST, {
    update(cache, { data: { deletePost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef: any = cache.writeFragment({
              data: deletePost.post,
              fragment: gql`
                fragment x on x {
                  id
                  description
                }
              `,
            })

            return existingPosts.filter((item: any) => {
              return item.__ref !== newPostRef.__ref
            })
          },
        },
      })
    },
  })

  function deleteThePost(id: number) {
    deletePost({
      variables: {
        id: id,
      },
    }).catch((e: any) => enqueueSnackbar(`${e}`, { variant: 'error' }))
  }
  function createNewPost() {
    console.log('creating a post')
    createPost({
      variables: {
        description: `[{"type":"paragraph","children":[{"text":""}]}]`,
      },
    })
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const { id, description } = state
      description.length > 1 &&
        updatePost({
          variables: { id, description: description },
        }).catch((e: any) => enqueueSnackbar(`${e}`, { variant: 'error' }))
    }, 500)
    return () => clearTimeout(timeout)
  }, [state.description])

  return [loading, error, data, res, setstate, deleteThePost, createNewPost]
}
