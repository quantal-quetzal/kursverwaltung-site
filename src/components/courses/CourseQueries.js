import { gql } from "apollo-boost"

export const NEW_COURSE = gql`
  mutation NewCourse(
    $name: String!
    $description: String
    $start: Date
    $end: Date
    $city: String
    $currentPhase: Phase!
    $instructor: ID
    $template: ID!
  ) {
    createCourse(
      data: {
        name: $name
        description: $description
        start: $start
        end: $end
        city: $city
        currentPhase: $currentPhase
        instructor: { connect: $instructor }
        template: { connect: $template }
      }
    ) {
      _id
      name
      description
      start
      end
      city
      currentPhase
      instructor {
        firstName
        lastName
      }
      template {
        name
      }
    }
  }
`

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    findCourseByID(id: $id) {
      _id
      name
      description
      start
      end
      city
      currentPhase
      instructor {
        firstName
        lastName
      }
      template {
        name
      }
    }
  }
`

export const GET_OPEN_COURSES = gql`
  query GetOpenCourses {
    allFilteredCourses(filter: { currentPhase: OPEN }) {
      _id
      name
      description
      start
      end
      city
      currentPhase
      instructor {
        firstName
        lastName
      }
      template {
        name
      }
    }
  }
`

export const EDIT_COURSE = gql`
  mutation EditCourse(
    $id: ID!
    $name: String!
    $description: String
    $start: Date
    $end: Date
    $city: String
    $currentPhase: Phase!
    $instructor: ID
    $template: ID!
  ) {
    updateCourse(
      id: $id
      data: {
        name: $name
        description: $description
        start: $start
        end: $end
        city: $city
        currentPhase: $currentPhase
        instructor: { connect: $instructor }
        template: { connect: $template }
      }
    ) {
      _id
      name
      description
      start
      end
      city
      currentPhase
      instructor {
        firstName
        lastName
      }
      template {
        name
      }
    }
  }
`
