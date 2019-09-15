// @flow
import * as React from "react"
import ParticipantForm from "../components/ParticipantForm"
import Layout from "../components/Layout"
import type { ParticipantData } from "../components/ParticipantForm"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import database from "./ApolloClient"
import { message, Modal, Spin } from "antd"

const renderWithLayout = (children: React.Node): React.Node => {
  return <Layout pageTitle="Teilnehmer">{children}</Layout>
}

const updateHandler = (
  id: string,
  courseId: string,
  setSaving: boolean => void
) => (data: ParticipantData) => {
  setSaving(true)
  database
    .mutate({
      mutation: gql`
        mutation registration {
          updateParticipant(id: "${id}", data: {
            firstName: "${data.firstName}"
            lastName: "${data.lastName}"
            street: "${data.street}"
            houseNumber: "${data.houseNumber}"
            postalCode: "${data.postalCode}"
            city: "${data.city}"
          }) {
            _id
          }
        }`,
    })
    .then(result => {
      message.success("Änderungen gespeichert.")
    })
    .catch(err => {
      message.error(err.message, 10)
    })
    .finally(() => setSaving(false))
}

type Props = {
  id: string,
}

export default (props: Props) => {
  const [saving, setSaving] = React.useState(false)

  const { data, loading, error } = useQuery(
    gql`
    query getParticipant {
        findParticipantByID(id: ${props.id}) {
            _id
            firstName
            lastName
            street
            houseNumber
            postalCode
            city
            course {
              _id
              name
            }
        }
    }`,
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
        <Spin tip="Lade Teilnehmerinformationen"></Spin>
      </div>
    )
  }

  return renderWithLayout(
    <ParticipantForm
      onUpdate={updateHandler(
        props.id,
        data.findParticipantByID.course._id,
        setSaving
      )}
      loading={false}
      participantData={data.findParticipantByID}
    />
  )
}
