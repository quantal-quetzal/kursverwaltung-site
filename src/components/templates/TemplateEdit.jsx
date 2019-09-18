// @flow
import * as React from "react"
import TemplateForm from "./TemplateForm"
import Layout from "../Layout"
import { gql } from "apollo-boost"
import { ApolloConsumer } from "react-apollo"
import { useQuery } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"
import { message, Modal, Spin } from "antd"
import { navigate } from "gatsby"
import type { Template, Prerequisite, Test } from "../Types"
import { GET_TEMPLATE, EDIT_TEMPLATE } from "./TemplateQueries"
import type {
  EditTemplate,
  EditTemplateVariables,
  PrerequisiteInput,
  TestInput,
} from "./__generated__/EditTemplate"
import type {
  GetTemplate,
  GetTemplateVariables,
} from "./__generated__/GetTemplate"

const renderWithLayout = (children: React.Node): React.Node => {
  return <Layout pageTitle="Kursvorlage">{children}</Layout>
}

type Props = {
  id: string,
}

const onSave = (
  apolloClient: ApolloClient,
  original: Template,
  setSaving: boolean => void
) => (template: Template): void => {
  setSaving(true)

  const originalPrerequisiteIDs: Array<string> = original.prerequisites //
    .map(p => (p._id ? p._id : ""))
  const newPrerequisiteIDs: Array<string> = template.prerequisites //
    .map(p => (p._id ? p._id : ""))
  const originalTestIDs: Array<string> = original.tests //
    .map(p => (p._id ? p._id : ""))
  const newTestIDs: Array<string> = template.tests //
    .map(p => (p._id ? p._id : ""))

  const variables: EditTemplateVariables = {
    id: original._id ? original._id : "",
    name: template.name,
    newPrerequisites: template.prerequisites
      .filter(p => p._id && p._id.startsWith("NEW"))
      .map(p => ({
        name: p.name,
        description: p.description,
        requiresDocumentScan: p.requiresDocumentScan,
      })),
    disconnectPrerequisites: originalPrerequisiteIDs.filter(
      x => !newPrerequisiteIDs.includes(x)
    ),
    newTests: template.tests
      .filter(p => p._id && p._id.startsWith("NEW"))
      .map(p => ({
        name: p.name,
        description: p.description,
        requiresDocumentScan: p.requiresDocumentScan,
      })),
    disconnectTests: originalTestIDs.filter(x => !newTestIDs.includes(x)),
  }

  apolloClient
    .mutate({
      mutation: EDIT_TEMPLATE,
      variables: variables,
    })
    .then(result => {
      debugger
      message.success("Vorlage gespeichert.", 1, () =>
        navigate(`/template/${result.data.updateTemplate._id}`)
      )
    })
    .catch(err => {
      message.error(err.message, 10)
    })
    .finally(() => setSaving(false))
}

export default (props: Props) => {
  const [saving, setSaving] = React.useState(false)

  const variables: GetTemplateVariables = {
    id: props.id,
  }
  const { data, loading, error } = useQuery<GetTemplate, GetTemplateVariables>(
    GET_TEMPLATE,
    { variables: variables }
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

  return (
    <ApolloConsumer>
      {client =>
        renderWithLayout(
          <TemplateForm
            readOnly={false}
            onSave={onSave(client, { ...template }, setSaving)}
            showSavingIndicator={saving}
            template={template}
          />
        )
      }
    </ApolloConsumer>
  )
}
