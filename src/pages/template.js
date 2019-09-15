import * as React from "react"
import { Router } from "@reach/router"
import TemplateNew from "../components/templates/TemplateNew"
import TemplateEdit from "../components/templates/TemplateEdit"
import TemplateView from "../components/templates/TemplateView"

export default () => {
  return (
    <Router>
      <TemplateNew path="/template/new" />
      <TemplateView path="/template/:id" />
      <TemplateEdit path="/template/:id/edit" />
    </Router>
  )
}
