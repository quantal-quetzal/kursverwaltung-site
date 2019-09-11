import * as React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import Courses from "../components/Courses"
import Registration from "../components/Registration"

export default () => {
  return (
    <Router>
      <Courses path="/course/" />
      <Registration path="/course/:courseId/registration" />
    </Router>
  )
}
