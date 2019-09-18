import { gql } from "apollo-boost"

export const GET_ALL_INSTRUCTORS = gql`
  query GetAllInstructors {
    allInstructors {
      data {
        _id
        firstName
        lastName
        registrationNumber
      }
    }
  }
`
