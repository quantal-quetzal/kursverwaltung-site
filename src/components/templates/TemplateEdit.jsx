// @flow
import * as React from "react"
import TemplateForm from "./TemplateForm"
import Layout from "../Layout"
import type { Template } from "../Types"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import database from "../ApolloClient"
import { message, Modal, Spin } from "antd"
import { navigate } from "gatsby"

const renderWithLayout = (children: React.Node): React.Node => {
  return <Layout pageTitle="Kursvorlage">{children}</Layout>
}

type Props = {
  id: string,
}

const onSave = (original: Template, setSaving: boolean => void) => (
  template: Template
): void => {
  const originalPrerequisiteIDs: Array<string> = original.prerequisites //
    .map(p => (p._id ? p._id : ""))
  const newPrerequisiteIDs: Array<string> = template.prerequisites //
    .map(p => (p._id ? p._id : ""))
  const originalTestIDs: Array<string> = original.tests //
    .map(p => (p._id ? p._id : ""))
  const newTestIDs: Array<string> = template.tests //
    .map(p => (p._id ? p._id : ""))

  debugger

  const query = gql`
    mutation changeTemplate { 
        updateTemplate(id: "${original._id}", data: {
            name: "${template.name}"
            prerequisites: {create: [${template.prerequisites
              .filter(p => p._id && p._id.startsWith("NEW"))
              .map(
                p =>
                  `{name: "${p.name}", description: "${
                    p.description ? p.description : ""
                  }", requiresDocumentScan: ${p.requiresDocumentScan.toString()}}`
              )
              .join(", ")}], 
                disconnect: [${originalPrerequisiteIDs
                  .filter(x => !newPrerequisiteIDs.includes(x))
                  .join(", ")}]}
            tests: {create: [${template.tests
              .filter(p => p._id && p._id.startsWith("NEW"))
              .map(
                p =>
                  `{name: "${p.name}", description: "${
                    p.description ? p.description : ""
                  }", requiresDocumentScan: ${p.requiresDocumentScan.toString()}}`
              )
              .join(", ")}], 
                disconnect: [${originalTestIDs
                  .filter(x => !newTestIDs.includes(x))
                  .join(", ")}]}
        }) {
        _id
       }  
  }`
  console.log(query)

  setSaving(true)
  database
    .mutate({
      mutation: query,
    })
    .then(result => {
      message.success("Vorlage gespeichert.", 2, () =>
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

  const { data, loading, error } = useQuery(
    gql`
      query getParticipant {
          findTemplateByID(id: "${props.id}") {
              _id
              name
              prerequisites {
                data {
                  _id
                  name
                  description
                  requiresDocumentScan
                }
              }
              tests {
                data {
                  _id
                  name
                  description
                  requiresDocumentScan
                }
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
        <Spin tip="Lade Vorlage"></Spin>
      </div>
    )
  }

  const template: Template = {
    ...data.findTemplateByID,
    prerequisites: data.findTemplateByID.prerequisites.data,
    tests: data.findTemplateByID.tests.data,
  }

  return renderWithLayout(
    <TemplateForm
      readOnly={false}
      onSave={onSave({ ...template }, setSaving)}
      showSavingIndicator={saving}
      template={template}
    />
  )
}
