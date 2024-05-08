const balanceWeights = (at, assignments, hardLock, weight) => {
  if (at.lockWeights || hardLock) {
    const numAssignments = assignments.length;
    let updatedWeight;
    if (weight) {
      updatedWeight = weight / numAssignments;
    } else {
      updatedWeight = at.weight / numAssignments;
    }
    const weightedAssignments = assignments.map((a) => ({ ...a, weight: updatedWeight }));
    return weightedAssignments;
  }
  return assignments;
};

export const getBalancedWeight = (assignments, weight) => {
  const balancedWeight = weight / assignments.length;
};
