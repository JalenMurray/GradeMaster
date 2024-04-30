/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAssignment = /* GraphQL */ `
  subscription OnCreateAssignment(
    $filter: ModelSubscriptionAssignmentFilterInput
  ) {
    onCreateAssignment(filter: $filter) {
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
export const onUpdateAssignment = /* GraphQL */ `
  subscription OnUpdateAssignment(
    $filter: ModelSubscriptionAssignmentFilterInput
  ) {
    onUpdateAssignment(filter: $filter) {
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
export const onDeleteAssignment = /* GraphQL */ `
  subscription OnDeleteAssignment(
    $filter: ModelSubscriptionAssignmentFilterInput
  ) {
    onDeleteAssignment(filter: $filter) {
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
export const onCreateAssignmentType = /* GraphQL */ `
  subscription OnCreateAssignmentType(
    $filter: ModelSubscriptionAssignmentTypeFilterInput
  ) {
    onCreateAssignmentType(filter: $filter) {
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
export const onUpdateAssignmentType = /* GraphQL */ `
  subscription OnUpdateAssignmentType(
    $filter: ModelSubscriptionAssignmentTypeFilterInput
  ) {
    onUpdateAssignmentType(filter: $filter) {
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
export const onDeleteAssignmentType = /* GraphQL */ `
  subscription OnDeleteAssignmentType(
    $filter: ModelSubscriptionAssignmentTypeFilterInput
  ) {
    onDeleteAssignmentType(filter: $filter) {
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
export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass($filter: ModelSubscriptionClassFilterInput) {
    onCreateClass(filter: $filter) {
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
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass($filter: ModelSubscriptionClassFilterInput) {
    onUpdateClass(filter: $filter) {
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
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass($filter: ModelSubscriptionClassFilterInput) {
    onDeleteClass(filter: $filter) {
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
export const onCreateSemester = /* GraphQL */ `
  subscription OnCreateSemester($filter: ModelSubscriptionSemesterFilterInput) {
    onCreateSemester(filter: $filter) {
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
export const onUpdateSemester = /* GraphQL */ `
  subscription OnUpdateSemester($filter: ModelSubscriptionSemesterFilterInput) {
    onUpdateSemester(filter: $filter) {
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
export const onDeleteSemester = /* GraphQL */ `
  subscription OnDeleteSemester($filter: ModelSubscriptionSemesterFilterInput) {
    onDeleteSemester(filter: $filter) {
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
