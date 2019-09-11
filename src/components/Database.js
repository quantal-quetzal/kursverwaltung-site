import ApolloClient from "apollo-boost"

const apolloClient = new ApolloClient({
  uri: "https://graphql.fauna.com/graphql",
  headers: {
    authorization:
      "Basic Zm5BRFg5SXBfaUFDQzFnVktpcmozalJtODBFZ19ZeWl5cE1jTGNZUTo=",
  },
})
export default apolloClient
