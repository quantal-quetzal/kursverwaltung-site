// @flow
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { setContext } from "apollo-link-context"
import { createHttpLink } from "apollo-link-http"

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      //authorization: token ? `Bearer ${token}` : "",
      authorization:
        "Basic Zm5BRFg5SXBfaUFDQzFnVktpcmozalJtODBFZ19ZeWl5cE1jTGNZUTo=",
    },
  }
})

const httpLink = createHttpLink({
  uri: "https://graphql.fauna.com/graphql",
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
