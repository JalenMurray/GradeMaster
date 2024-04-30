/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAssignment = /* GraphQL */ `
  query GetAssignment($id: ID!) {
    getAssignment(id: $id) {
      id
      name
      max_score
      weight
      assignment_type {
        id
        name
        max_score
        weight
        default_name
        lock_weights
        createdAt
        updatedAt
        assignmentTypeClassId
        __typename
      }
      createdAt
      updatedAt
      assignmentAssignment_typeId
      __typename
    }
  }
`;
export const listAssignments = /* GraphQL */ `
  query ListAssignments(
    $filter: ModelAssignmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssignments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        max_score
        weight
        createdAt
        updatedAt
        assignmentAssignment_typeId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAssignmentType = /* GraphQL */ `
  query GetAssignmentType($id: ID!) {
    getAssignmentType(id: $id) {
      id
      name
      max_score
      weight
      default_name
      lock_weights
      class {
        id
        code
        title
        desired_score
        units
        display_color
        createdAt
        updatedAt
        classSemesterId
        __typename
      }
      createdAt
      updatedAt
      assignmentTypeClassId
      __typename
    }
  }
`;
export const listAssignmentTypes = /* GraphQL */ `
  query ListAssignmentTypes(
    $filter: ModelAssignmentTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssignmentTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        max_score
        weight
        default_name
        lock_weights
        createdAt
        updatedAt
        assignmentTypeClassId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getClass = /* GraphQL */ `
  query GetClass($id: ID!) {
    getClass(id: $id) {
      id
      code
      title
      desired_score
      units
      display_color
      semester {
        id
        season
        year
        current
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      classSemesterId
      __typename
    }
  }
`;
export const listClasses = /* GraphQL */ `
  query ListClasses(
    $filter: ModelClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClasses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        title
        desired_score
        units
        display_color
        createdAt
        updatedAt
        classSemesterId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSemester = /* GraphQL */ `
  query GetSemester($id: ID!) {
    getSemester(id: $id) {
      id
      season
      year
      current
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSemesters = /* GraphQL */ `
  query ListSemesters(
    $filter: ModelSemesterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSemesters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        season
        year
        current
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
