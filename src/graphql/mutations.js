/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAssignment = /* GraphQL */ `
  mutation CreateAssignment(
    $input: CreateAssignmentInput!
    $condition: ModelAssignmentConditionInput
  ) {
    createAssignment(input: $input, condition: $condition) {
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
export const updateAssignment = /* GraphQL */ `
  mutation UpdateAssignment(
    $input: UpdateAssignmentInput!
    $condition: ModelAssignmentConditionInput
  ) {
    updateAssignment(input: $input, condition: $condition) {
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
export const deleteAssignment = /* GraphQL */ `
  mutation DeleteAssignment(
    $input: DeleteAssignmentInput!
    $condition: ModelAssignmentConditionInput
  ) {
    deleteAssignment(input: $input, condition: $condition) {
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
export const createAssignmentType = /* GraphQL */ `
  mutation CreateAssignmentType(
    $input: CreateAssignmentTypeInput!
    $condition: ModelAssignmentTypeConditionInput
  ) {
    createAssignmentType(input: $input, condition: $condition) {
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
export const updateAssignmentType = /* GraphQL */ `
  mutation UpdateAssignmentType(
    $input: UpdateAssignmentTypeInput!
    $condition: ModelAssignmentTypeConditionInput
  ) {
    updateAssignmentType(input: $input, condition: $condition) {
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
export const deleteAssignmentType = /* GraphQL */ `
  mutation DeleteAssignmentType(
    $input: DeleteAssignmentTypeInput!
    $condition: ModelAssignmentTypeConditionInput
  ) {
    deleteAssignmentType(input: $input, condition: $condition) {
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
export const createClass = /* GraphQL */ `
  mutation CreateClass(
    $input: CreateClassInput!
    $condition: ModelClassConditionInput
  ) {
    createClass(input: $input, condition: $condition) {
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
export const updateClass = /* GraphQL */ `
  mutation UpdateClass(
    $input: UpdateClassInput!
    $condition: ModelClassConditionInput
  ) {
    updateClass(input: $input, condition: $condition) {
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
export const deleteClass = /* GraphQL */ `
  mutation DeleteClass(
    $input: DeleteClassInput!
    $condition: ModelClassConditionInput
  ) {
    deleteClass(input: $input, condition: $condition) {
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
      __typename
    }
  }
`;
