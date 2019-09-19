// @flow
import * as React from "react"
import { Router } from "@reach/router"
import Layout from "../Layout"
import Courses from "./Courses"
import { gql } from "apollo-boost"
import apolloClient from "../ApolloClient"
import { useQuery } from "@apollo/react-hooks"
import { message, Modal, Spin, Card, Icon } from "antd"
import { Link } from "gatsby"
import { GET_OPEN_COURSES } from "./CourseQueries"

const renderWithLayout = (children: React.Node): React.Node => {
  return <Layout pageTitle="Kurse">{children}</Layout>
}

export default () => {
  const { data, loading, error } = useQuery(GET_OPEN_COURSES)

  if (error) {
    return renderWithLayout(
      <div>
        <h4>Entschuldigung, es ist ein Fehler aufgetreten:</h4>
        <p>{error.message}</p>
      </div>
    )
  }

  if (loading) {
    return renderWithLayout(
      <div>
        <Spin tip="Lade offene Kurse"></Spin>
      </div>
    )
  }

  return renderWithLayout(
    <Card
      style={{ width: 300 }}
      title={data.findCourseByID.name}
      actions={[
        <Link to={`/course/${data.findCourseByID._id}/registration`}>
          <Icon type="login" />
          &nbsp;&nbsp;&nbsp;Registrieren
        </Link>,
      ]}
    >
      <p>
        Kursleiter: {data.findCourseByID.instructor.firstName}{" "}
        {data.findCourseByID.instructor.lastName}
      </p>
    </Card>
  )
}
