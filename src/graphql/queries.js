/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAssignment = /* GraphQL */ `
  query GetAssignment($id: ID!) {
    getAssignment(id: $id) {
      id
      name
      score
      max_score
      weight
      assignmentType {
        id
        name
        maxScore
        weight
        defaultName
        lockWeights
        totalScore
        maxTotalScore
        createdAt
        updatedAt
        assignmentTypeClassId
        owner
        __typename
      }
      createdAt
      updatedAt
      assignmentAssignmentTypeId
      owner
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
        score
        max_score
        weight
        createdAt
        updatedAt
        assignmentAssignmentTypeId
        owner
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
      maxScore
      weight
      defaultName
      lockWeights
      class {
        id
        code
        title
        score
        desiredScore
        displayColor
        units
        createdAt
        updatedAt
        classSemesterId
        owner
        __typename
      }
      totalScore
      maxTotalScore
      createdAt
      updatedAt
      assignmentTypeClassId
      owner
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
        maxScore
        weight
        defaultName
        lockWeights
        totalScore
        maxTotalScore
        createdAt
        updatedAt
        assignmentTypeClassId
        owner
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
      score
      semester {
        id
        season
        year
        current
        createdAt
        updatedAt
        owner
        __typename
      }
      desiredScore
      displayColor
      units
      createdAt
      updatedAt
      classSemesterId
      owner
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
        score
        desiredScore
        displayColor
        units
        createdAt
        updatedAt
        classSemesterId
        owner
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
      owner
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
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
