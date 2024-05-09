export const validateAssignment = (name, value) => {
  if (name === 'name') {
    const valid = value.length <= 20;
    return { valid, message: valid ? 'Valid Name' : 'Max length for an assignment name is 20' };
  }
  if (name === 'weight') {
    const valid = value.length < 4;
    return { valid, message: valid ? 'Valid Weight' : 'Cannot have 4+ digit weights' };
  }
  if (name === 'score' || name === 'maxScore') {
    const valid = value.length < 5;
    return { valid, message: valid ? 'Valid Score' : 'Cannot have 5+ digit scores' };
  }
  return { valid: false, message: 'Invalid field passed' };
};

export const validateAssignmentType = (field, value) => ({
  valid: false,
  message: 'Invalid field passed',
});
