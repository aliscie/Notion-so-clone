import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from '@apollo/client'
import { client } from '../App'
import { BlockOutlined, LocalGroceryStoreTwoTone } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

const UPDATE_TODO = gql`
  mutation($accessToken: String!) {
    socialAuth(provider: "google-oauth2", accessToken: $accessToken) {
      token
      social {
        user {
          id
          username
          imageUrl
        }
      }
    }
  }
`

type LoginResponse = {
  socialAuth: {
    token: string
    social: { id: string; provider: 'google-oauth2'; uid: string }
  }
}

function useAuth() {
  const [accessToken, setAccessToken] = React.useState<string>('')
  console.log(accessToken)
  console.log('authentication function successfully activated')
  const [login] = useMutation(UPDATE_TODO, {
    variables: {
      accessToken: accessToken,
    },

    onCompleted: (res: any) => {
      localStorage.setItem('image', res.socialAuth.social.user.imageUrl)
      localStorage.setItem('username', res.socialAuth.social.user.username)
      localStorage.setItem('userId', res.socialAuth.social.user.id)
      localStorage.setItem('AUTH_TOKEN', res.socialAuth.token)
      window.location.reload()
    },
  })

  function logIn(response: any) {
    const accessToken: string = response.accessToken
    const profileObj: any = response.profileObj
    setAccessToken(accessToken)
    login()
  }

  function logOut() {
    client.resetStore()
    localStorage.clear()
    window.location.reload()
  }

  return [logOut, logIn]
}

export default useAuth
