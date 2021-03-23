import React from 'react'
import GoogleLogin from 'react-google-login'
import useAuth from '../Hooks/useAuth'
import useStorage from '../Hooks/useStorage'

function GoogleAuth() {
  const [logOut, logIn, profile]: any = useAuth()
  function response(res: any) {
    logIn(res)
  }
  return (
    <GoogleLogin
      clientId="13721924041-tnmmge21adu3mg7k7agvcgiqs7f2trnt.apps.googleusercontent.com"
      buttonText="Sign in/up"
      cookiePolicy="single_host_origin"
      onSuccess={response}
      onFailure={response}
    />
  )
}

export default GoogleAuth
