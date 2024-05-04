/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAssignmentType = /* GraphQL */ `
  subscription OnCreateAssignmentType(
    $filter: ModelSubscriptionAssignmentTypeFilterInput
    $owner: String
  ) {
    onCreateAssignmentType(filter: $filter, owner: $owner) {
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
      assignments
      createdAt
      updatedAt
      assignmentTypeClassId
      owner
      __typename
    }
  }
`;
export const onUpdateAssignmentType = /* GraphQL */ `
  subscription OnUpdateAssignmentType(
    $filter: ModelSubscriptionAssignmentTypeFilterInput
    $owner: String
  ) {
    onUpdateAssignmentType(filter: $filter, owner: $owner) {
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
      assignments
      createdAt
      updatedAt
      assignmentTypeClassId
      owner
      __typename
    }
  }
`;
export const onDeleteAssignmentType = /* GraphQL */ `
  subscription OnDeleteAssignmentType(
    $filter: ModelSubscriptionAssignmentTypeFilterInput
    $owner: String
  ) {
    onDeleteAssignmentType(filter: $filter, owner: $owner) {
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
      assignments
      createdAt
      updatedAt
      assignmentTypeClassId
      owner
      __typename
    }
  }
`;
export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass(
    $filter: ModelSubscriptionClassFilterInput
    $owner: String
  ) {
    onCreateClass(filter: $filter, owner: $owner) {
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
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass(
    $filter: ModelSubscriptionClassFilterInput
    $owner: String
  ) {
    onUpdateClass(filter: $filter, owner: $owner) {
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
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass(
    $filter: ModelSubscriptionClassFilterInput
    $owner: String
  ) {
    onDeleteClass(filter: $filter, owner: $owner) {
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
export const onCreateSemester = /* GraphQL */ `
  subscription OnCreateSemester(
    $filter: ModelSubscriptionSemesterFilterInput
    $owner: String
  ) {
    onCreateSemester(filter: $filter, owner: $owner) {
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
export const onUpdateSemester = /* GraphQL */ `
  subscription OnUpdateSemester(
    $filter: ModelSubscriptionSemesterFilterInput
    $owner: String
  ) {
    onUpdateSemester(filter: $filter, owner: $owner) {
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
export const onDeleteSemester = /* GraphQL */ `
  subscription OnDeleteSemester(
    $filter: ModelSubscriptionSemesterFilterInput
    $owner: String
  ) {
    onDeleteSemester(filter: $filter, owner: $owner) {
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
