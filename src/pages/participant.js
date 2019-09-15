import React from "react"
import { Router } from "@reach/router"
import Participant from "../components/Participant"

export default () => {
  return (
    <Router>
      <Participant path="/participant/:id" />
    </Router>
  )
}
