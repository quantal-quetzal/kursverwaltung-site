// @flow
import React from "react"
import RegistrationForm from "../components/RegistrationForm"
import type { RegistrationData } from "../components/RegistrationForm"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import database from "../components/Database"
import { message, Modal } from "antd"
import { navigate } from "gatsby"
import Layout from "../components/Layout"

type Props = {
  courseId: number,
}

export default (props: Props) => {
  console.log(props.courseId)

  const [loading, setLoading] = React.useState(false)

  const registrationHandler = (data: RegistrationData) => {
    setLoading(true)
    Modal.confirm({
      title: "Sind deine Angaben korrekt?",
      content: (
        <div>
          <p>
            {data.firstName} {data.lastName}
          </p>
          <p>
            <b>{data.email}</b>
          </p>
        </div>
      ),
      okText: "Ja, jetzt registrieren",
      cancelText: "Nein",
      onOk: () => {
        database
          .mutate({
            mutation: gql`
          mutation registration {
            createParticipant(data: {
              firstName: "${data.firstName}"
              lastName: "${data.lastName}"
              course: {
                connect: "${props.courseId}"
              }
            }) {
              _id
              firstName
              lastName
              course {
                name
              }
            }
          }`,
          })
          .then(result => {
            message.success("Herzlich willkommen!", 2, () =>
              navigate(`/participant/${result.data.createParticipant._id}`)
            )
          })
          .catch(err => {
            message.error(err.message, 10)
          })
          .finally(() => setLoading(false))
      },
    })
  }

  return (
    <Layout pageTitle="Kursregistrierung">
      <RegistrationForm onRegister={registrationHandler} loading={loading} />
    </Layout>
  )
}
