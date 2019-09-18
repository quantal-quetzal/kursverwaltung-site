import * as React from "react"
import { Router } from "@reach/router"
import apolloClient from "../components/ApolloClient"
import { ApolloProvider } from "react-apollo"
import Layout from "../components/Layout"
import Courses from "../components/courses/Courses"
import CourseNew from "../components/courses/CourseNew"
import Registration from "../components/Registration"

export default () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Courses path="/course/" />
        <CourseNew path="/course/new" />
        <Registration path="/course/:courseId/registration" />
      </Router>
    </ApolloProvider>
  )
}
