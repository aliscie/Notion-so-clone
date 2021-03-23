import React from 'react'
// Libraries
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// components
import PrimarySearchAppBar from './ui/PrimarySearchAppBar'
import Posts from './components/Posts'

const TOKEN = localStorage.getItem('AUTH_TOKEN')!
export const client = new ApolloClient({
  // uri: 'http://127.0.0.1:8000/graphql/',
  uri: 'https://autodox-backend.herokuapp.com/graphql/',
  cache: new InMemoryCache(),
  headers: {
    authorization: `JWT ${TOKEN}`,
    // 'client-name': 'WJT',
    // 'client-version': '1.0.0'
  },
})

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/">
              <PrimarySearchAppBar />
              <Posts />
            </Route>
            <Route path="/about">about page</Route>
            <Route path="/users">users are here</Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  )
}

export default App
