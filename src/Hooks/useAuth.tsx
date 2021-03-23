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
  const [login] = useMutation(UPDATE_TODO, {
    variables: {
      accessToken: accessToken,
    },

    onCompleted: (res: LoginResponse) => {
      localStorage.setItem('AUTH_TOKEN', res.socialAuth.token)
      window.location.reload()
    },
  })

  function logIn(response: any) {
    const accessToken: string = response.accessToken
    const profileObj: string = JSON.stringify(response.profileObj)
    setAccessToken(accessToken)
    login()
    localStorage.setItem('AUTH_PROFILE_OJB', profileObj)
  }

  function logOut() {
    client.resetStore()
    localStorage.clear()
    window.location.reload()
  }
  const AUTH_PROFILE_OJB: string | null = localStorage.getItem(
    'AUTH_PROFILE_OJB',
  )
  const profile = AUTH_PROFILE_OJB
    ? JSON.parse(AUTH_PROFILE_OJB)
    : {
        givenName: null,
        imageUrl: null,
      }

  return [logOut, logIn, profile]
}

export default useAuth
