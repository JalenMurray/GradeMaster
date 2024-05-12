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

export const validateAssignmentType = (name, value) => {
  if (name === 'name') {
    const valid = value.length <= 30;
    return {
      valid,
      message: valid ? 'Valid Name' : 'Max length for an assignment type name is 30',
    };
  }
  if (name === 'weight') {
    const valid = value.length < 4;
    return { valid, message: valid ? 'Valid Weight' : 'Cannot have 4+ digit weights' };
  }
  if (name === 'maxScore') {
    const valid = value.length < 5;
    return { valid, message: valid ? 'Valid Max Score' : 'Cannot have 5+ digit scores' };
  }
  if (name === 'defaultName') {
    const valid = value.length < 20;
    return { valid, message: valid ? 'Valid Name' : 'Max length for an assignment name is 20' };
  }
  return { valid: false, message: 'Invalid field passed' };
};

export const getUpdatedAssignmentTypeScores = (at, updatedAssignments, newAtWeight) => {
  const totalScore = updatedAssignments.reduce(
    (acc, a) => acc + (a.score / a.maxScore) * a.weight,
    0
  );
  const maxTotalScore = updatedAssignments.reduce((acc, a) => {
    if (typeof a.weight === 'string') {
      return acc;
    }
    return acc + a.weight;
  }, 0);
  const weight = at.lockWeights ? newAtWeight || at.weight : maxTotalScore;
  console.log(weight, newAtWeight);
  return { totalScore, maxTotalScore, weight };
};

export const balanceAssignments = (updatedAssignments, atWeight) => {
  const newWeight = atWeight / updatedAssignments.length;
  console.log('NEW ASSIGNMENT WEIGHT', newWeight);
  return updatedAssignments.map((assignment) => ({ ...assignment, weight: newWeight }));
};
