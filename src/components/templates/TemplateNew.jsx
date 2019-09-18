// @flow
import * as React from "react"
import Layout from "../Layout"
import type { Template, Prerequisite, Test } from "../Types"
import TemplateForm from "./TemplateForm"
import { gql } from "apollo-boost"
import { ApolloConsumer } from "react-apollo"
import { message } from "antd"
import { navigate } from "gatsby"
import ApolloClient from "apollo-boost"
import { NEW_TEMPLATE } from "./TemplateQueries"
import type {
  NewTemplate,
  NewTemplateVariables,
  PrerequisiteInput,
  TestInput,
} from "./__generated__/NewTemplate"

const renderWithLayout = (children: React.Node): React.Node => {
  return <Layout pageTitle="Teilnehmer">{children}</Layout>
}

const onSave = (apolloClient: ApolloClient, setSaving: boolean => void) => (
  template: Template
): void => {
  setSaving(true)

  const variables: NewTemplateVariables = {
    name: template.name,
    prerequisites: template.prerequisites.map(
      (p: Prerequisite): PrerequisiteInput => ({
        name: p.name,
        description: p.description,
        requiresDocumentScan: p.requiresDocumentScan,
      })
    ),
    tests: template.tests.map((p: Test): TestInput => ({
      name: p.name,
      description: p.description,
      requiresDocumentScan: p.requiresDocumentScan,
    })),
  }

  apolloClient
    .mutate<NewTemplate, NewTemplateVariables>({
      mutation: NEW_TEMPLATE,
      variables: variables,
    })
    .then(result => {
      message.success("Vorlage gespeichert.", 1, () =>
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

  return (
    <ApolloConsumer>
      {client =>
        renderWithLayout(
          <TemplateForm
            readOnly={false}
            onSave={onSave(client, setSaving)}
            showSavingIndicator={saving}
          />
        )
      }
    </ApolloConsumer>
  )
}
