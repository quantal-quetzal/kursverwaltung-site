// @flow
import React from "react"
import Layout from "../components/Layout"
import ParticipantForm from "../components/ParticipantForm"
import type { ParticipantFormData } from "../components/ParticipantForm"

export default () => {
  const [text, setText] = React.useState("")

  const submitHandler = (data: ParticipantFormData) => {
    setText(
      "Registriert: " +
        data.firstName +
        " " +
        data.lastName +
        ", geboren am " +
        data.dateOfBirth.toString()
    )
  }

  return (
    <Layout pageTitle="Registrierung">
      <ParticipantForm onSubmit={submitHandler} />
      {text.length > 0 ? text : null}
    </Layout>
  )
}
