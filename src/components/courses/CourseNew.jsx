// @flow
import * as React from "react"
import Layout from "../Layout"
import type { Course } from "../Types"
import CourseForm from "./CourseForm"
import { ApolloConsumer } from "react-apollo"
import { message } from "antd"
import { navigate } from "gatsby"
import ApolloClient from "apollo-boost"
import { NEW_COURSE } from "./CourseQueries"
import type { NewCourse, NewCourseVariables } from "./__generated__/NewCourse"

const renderWithLayout = (children: React.Node): React.Node => {
  return <Layout pageTitle="Neuen Kurs anlegen">{children}</Layout>
}

const onSave = (apolloClient: ApolloClient, setSaving: boolean => void) => (
  course: Course
): void => {
  setSaving(true)

  const variables: NewCourseVariables = {
    name: course.name,
    currentPhase: "UNPUBLISHED",
    template: course.templateId ? course.templateId : "",
    instructor: course.instructorId,
    start: course.start && course.start.toISOString().slice(0, 10),
    end: course.end && course.end.toISOString().slice(0, 10),
    city: course.city,
  }

  apolloClient
    .mutate<NewCourse, NewCourseVariables>({
      mutation: NEW_COURSE,
      variables: variables,
    })
    .then(result => {
      message.success("Kurs gespeichert.", 1, () =>
        navigate(`/course/${result.data.createCourse._id}`)
      )
    })
    .catch(err => {
      message.error(err.message, 10)
    })
    .finally(() => setSaving(false))
}

export default () => {
  const [saving, setSaving] = React.useState(false)

  return (
    <ApolloConsumer>
      {client =>
        renderWithLayout(
          <CourseForm
            readOnly={false}
            onSave={onSave(client, setSaving)}
            newCourse={true}
            showSavingIndicator={saving}
          />
        )
      }
    </ApolloConsumer>
  )
}
