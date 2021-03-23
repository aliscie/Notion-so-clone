import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from '@apollo/client'

const GET_TODOS = gql`
  query {
    posts {
      createdDate
      description
      id
      addedBy {
        imageUrl
        id
        username
      }
      whoCanEdite {
        username
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

export default function usePosts() {
  const [state, setstate] = React.useState({ id: null, description: '' })
  const { loading, error, data } = useQuery(GET_TODOS)
  const [updatePost, res]: any = useMutation(UPDATE_TODO)
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const { id, description } = state
      description.length > 1 &&
        updatePost({
          variables: { id, description: description },
        })
    }, 500)
    return () => clearTimeout(timeout)
  }, [state.description])

  return { loading, error, data, res, setstate }
}
