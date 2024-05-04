/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAssignmentType = /* GraphQL */ `
  mutation CreateAssignmentType(
    $input: CreateAssignmentTypeInput!
    $condition: ModelAssignmentTypeConditionInput
  ) {
    createAssignmentType(input: $input, condition: $condition) {
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
export const updateAssignmentType = /* GraphQL */ `
  mutation UpdateAssignmentType(
    $input: UpdateAssignmentTypeInput!
    $condition: ModelAssignmentTypeConditionInput
  ) {
    updateAssignmentType(input: $input, condition: $condition) {
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
export const deleteAssignmentType = /* GraphQL */ `
  mutation DeleteAssignmentType(
    $input: DeleteAssignmentTypeInput!
    $condition: ModelAssignmentTypeConditionInput
  ) {
    deleteAssignmentType(input: $input, condition: $condition) {
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
export const createClass = /* GraphQL */ `
  mutation CreateClass(
    $input: CreateClassInput!
    $condition: ModelClassConditionInput
  ) {
    createClass(input: $input, condition: $condition) {
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
export const updateClass = /* GraphQL */ `
  mutation UpdateClass(
    $input: UpdateClassInput!
    $condition: ModelClassConditionInput
  ) {
    updateClass(input: $input, condition: $condition) {
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
export const deleteClass = /* GraphQL */ `
  mutation DeleteClass(
    $input: DeleteClassInput!
    $condition: ModelClassConditionInput
  ) {
    deleteClass(input: $input, condition: $condition) {
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
export const createSemester = /* GraphQL */ `
  mutation CreateSemester(
    $input: CreateSemesterInput!
    $condition: ModelSemesterConditionInput
  ) {
    createSemester(input: $input, condition: $condition) {
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
export const updateSemester = /* GraphQL */ `
  mutation UpdateSemester(
    $input: UpdateSemesterInput!
    $condition: ModelSemesterConditionInput
  ) {
    updateSemester(input: $input, condition: $condition) {
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
export const deleteSemester = /* GraphQL */ `
  mutation DeleteSemester(
    $input: DeleteSemesterInput!
    $condition: ModelSemesterConditionInput
  ) {
    deleteSemester(input: $input, condition: $condition) {
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
