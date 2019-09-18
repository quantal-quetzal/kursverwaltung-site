// @flow
import * as React from "react"
import TemplateForm from "./TemplateForm"
import Layout from "../Layout"
import type { Template } from "../Types"
import { useQuery } from "@apollo/react-hooks"
import { ApolloConsumer } from "react-apollo"
import ApolloClient from "apollo-boost"
import { message, Modal, Spin } from "antd"
import { GET_TEMPLATE } from "./TemplateQueries"
import type {
  GetTemplate,
  GetTemplateVariables,
} from "./__generated__/GetTemplate"

const renderWithLayout = (children: React.Node): React.Node => {
  return <Layout pageTitle="Kursvorlage">{children}</Layout>
}

type Props = {
  id: string,
  client: ApolloClient,
}

export default (props: Props) => {
  const [saving, setSaving] = React.useState(false)

  const variables: GetTemplateVariables = {
    id: props.id,
  }
  const { data, loading, error } = useQuery<GetTemplate, GetTemplateVariables>(
    GET_TEMPLATE,
    {
      client: props.client,
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
        <Spin tip="Lade Vorlage"></Spin>
      </div>
    )
  }

  const templateData = (data: GetTemplate)

  const template: Template = {
    ...data.findTemplateByID,
    prerequisites: templateData.findTemplateByID
      ? templateData.findTemplateByID.prerequisites.data
      : [],
    tests: templateData.findTemplateByID
      ? templateData.findTemplateByID.tests.data
      : [],
  }

  return renderWithLayout(<TemplateForm readOnly={true} template={template} />)
}
