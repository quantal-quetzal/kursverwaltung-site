// @flow
import * as React from "react"
import Layout from "../Layout"
import type { Template } from "../Types"
import TemplateForm from "./TemplateForm"
import { gql } from "apollo-boost"
import apolloClient from "../ApolloClient"
import { message } from "antd"
import { navigate } from "gatsby"

const renderWithLayout = (children: React.Node): React.Node => {
  return <Layout pageTitle="Teilnehmer">{children}</Layout>
}

const onSave = (setSaving: boolean => void) => (template: Template): void => {
  const query = gql(`
  mutation addTemplate { 
      createTemplate(data: {
          name: "${template.name}"
          prerequisites: {create: [${template.prerequisites
            .map(
              p =>
                `{name: "${p.name}", description: "${
                  p.description ? p.description : ""
                }", requiresDocumentScan: ${p.requiresDocumentScan.toString()}}`
            )
            .join(", ")}]}
          tests: {create: [${template.tests
            .map(
              p =>
                `{name: "${p.name}", description: "${
                  p.description ? p.description : ""
                }", requiresDocumentScan: ${p.requiresDocumentScan.toString()}}`
            )
            .join(", ")}]}
      }) {
      _id
     }  
}`)
  console.log(query)

  setSaving(true)
  apolloClient
    .mutate({
      mutation: query,
    })
    .then(result => {
      message.success("Vorlage gespeichert.", 2, () =>
        navigate(`/template/${result.data.createTemplate._id}`)
      )
    })
    .catch(err => {
      message.error(err.message, 10)
    })
    .finally(() => setSaving(false))
}

export default () => {
  const [saving, setSaving] = React.useState(false)

  return renderWithLayout(
    <TemplateForm
      readOnly={false}
      onSave={onSave(setSaving)}
      showSavingIndicator={saving}
    />
  )
}
