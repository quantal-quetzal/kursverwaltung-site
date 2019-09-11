// @flow
import * as React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import Courses from "../components/Courses"
import { gql } from "apollo-boost"
import database from "../components/Database"
import { useQuery } from "@apollo/react-hooks"
import { message, Modal, Spin, Card, Icon } from "antd"
import { Link } from "gatsby"

const renderWithLayout = (children: React.Node): React.Node => {
  return <Layout pageTitle="Kurse">{children}</Layout>
}

export default () => {
  const { data, loading, error } = useQuery(
    gql`
      query loadCourses {
        findCourseByID(id: "243143659524981255") {
          _id
          name
          start
          instructor {
            firstName
            lastName
          }
        }
      }
    `,
    {
      client: database,
    }
  )

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
