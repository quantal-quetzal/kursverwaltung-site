import { gql } from "apollo-boost"

export const GET_PARTICIPANT = gql`
  query GetParticipant($id: ID!) {
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
    }
  }
`
