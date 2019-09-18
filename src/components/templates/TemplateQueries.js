import { gql } from "apollo-boost"

export const GET_TEMPLATE = gql`
  query GetTemplate($id: ID!) {
    findTemplateByID(id: $id) {
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
  }
`

export const NEW_TEMPLATE = gql`
  mutation NewTemplate(
    $name: String!
    $prerequisites: [PrerequisiteInput!]!
    $tests: [TestInput!]!
  ) {
    createTemplate(
      data: {
        name: $name
        prerequisites: { create: $prerequisites }
        tests: { create: $tests }
      }
    ) {
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
  }
`

export const EDIT_TEMPLATE = gql`
  mutation EditTemplate(
    $id: ID!
    $name: String!
    $newPrerequisites: [PrerequisiteInput!]!
    $newTests: [TestInput!]!
    $disconnectPrerequisites: [ID!]!
    $disconnectTests: [ID!]!
  ) {
    updateTemplate(
      id: $id
      data: {
        name: $name
        prerequisites: {
          create: $newPrerequisites
          disconnect: $disconnectPrerequisites
        }
        tests: { create: $newTests, disconnect: $disconnectTests }
      }
    ) {
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
  }
`
export const GET_ALL_TEMPLATES = gql`
  query GetAllTemplates {
    allTemplates {
      data {
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
    }
  }
`
