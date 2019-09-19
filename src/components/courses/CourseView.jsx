// @flow
import * as React from "react"
import CourseForm from "./CourseForm"
import Layout from "../Layout"
import type { Course } from "../Types"
import { useQuery } from "@apollo/react-hooks"
import { ApolloConsumer } from "react-apollo"
import ApolloClient from "apollo-boost"
import { message, Modal, Spin } from "antd"
import { GET_COURSE } from "./CourseQueries"
import type { GetCourse, GetCourseVariables } from "./__generated__/GetCourse"

const renderWithLayout = (children: React.Node): React.Node => {
  return <Layout pageTitle="Kurs">{children}</Layout>
}

type Props = {
  id: string,
  client: ApolloClient,
}

export default (props: Props) => {
  const [saving, setSaving] = React.useState(false)

  const variables: GetCourseVariables = {
    id: props.id,
  }
  const { data, loading, error } = useQuery<GetCourse, GetCourseVariables>(
    GET_COURSE,
    {
      variables: variables,
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
        <Spin tip="Lade Kurs"></Spin>
      </div>
    )
  }

  return renderWithLayout(
    <CourseForm
      readOnly={true}
      course={data.findCourseByID}
      newCourse={false}
    />
  )
}
