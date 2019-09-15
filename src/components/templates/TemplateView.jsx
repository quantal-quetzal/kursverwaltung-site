// @flow
import * as React from "react"
import TemplateForm from "./TemplateForm"
import Layout from "../Layout"
import type { Template } from "../Types"
import { useQuery } from "@apollo/react-hooks"
import apolloClient from "../ApolloClient"
import { message, Modal, Spin } from "antd"
import { GET_PARTICIPANT } from "./Queries"
import type {
  GetParticipant,
  GetParticipantVariables,
} from "./__generated__/GetParticipant"

const renderWithLayout = (children: React.Node): React.Node => {
  return <Layout pageTitle="Kursvorlage">{children}</Layout>
}

type Props = {
  id: string,
}

export default (props: Props) => {
  const [saving, setSaving] = React.useState(false)

  const variables: GetParticipantVariables = {
    id: props.id,
  }
  const { data, loading, error } = useQuery<
    GetParticipant,
    GetParticipantVariables
  >(GET_PARTICIPANT, {
    client: apolloClient,
    variables: variables,
  })

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
        <Spin tip="Lade Vorlage"></Spin>
      </div>
    )
  }

  console.log(data)

  const template: Template = {
    ...data.findTemplateByID,
    prerequisites: data.findTemplateByID.prerequisites.data,
    tests: data.findTemplateByID.tests.data,
  }

  return renderWithLayout(<TemplateForm readOnly={true} template={template} />)
}
