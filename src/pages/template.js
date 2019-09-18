import * as React from "react"
import apolloClient from "../components/ApolloClient"
import { ApolloProvider } from "react-apollo"
import { Router } from "@reach/router"
import TemplateNew from "../components/templates/TemplateNew"
import TemplateEdit from "../components/templates/TemplateEdit"
import TemplateView from "../components/templates/TemplateView"

export default () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <TemplateNew path="/template/new" />
        <TemplateView path="/template/:id" />
        <TemplateEdit path="/template/:id/edit" />
      </Router>
    </ApolloProvider>
  )
}
