import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import Participant from "../components/Participant"

export default () => {
  return (
    <Router>
      <Participant path="/participant/:id" />
    </Router>
  )
}
