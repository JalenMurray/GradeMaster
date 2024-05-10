import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

const EMPTY_CLASS = {
  code: '',
  title: '',
  desiredScore: 100.0,
  units: 3,
  displayColor: '#FF0000',
  score: 100,
  semester: {
    season: '',
    year: 2000,
  },
};

export const ClassContext = createContext({
  cls: EMPTY_CLASS,
  setCls: () => null,
  assignmentTypes: null,
  setAssigmentTypes: () => null,
  warnings: null,
  setWarnings: () => null,
});

export const ClassProvider = ({ children }) => {
  const [cls, setCls] = useState(EMPTY_CLASS);
  const [assignmentTypes, setAssignmentTypes] = useState({});
  const [warnings, setWarnings] = useState({});

  /**
   *
   * Calculates the total and max total score for an assignment type
   * based on the updated assignments
   *
   * @param {Assignment[]} assignments array of assignments
   * @returns The new total and max total scores
   */
  const getAtScores = (assignments) => {
    if (!assignments) {
      return { totalScore: 0, maxSscore: 0 };
    }
    const totalScore = assignments.reduce((acc, a) => acc + (a.score / a.maxScore) * a.weight, 0);
    const maxTotalScore = assignments.reduce((acc, a) => acc + a.weight, 0);
    return { totalScore, maxTotalScore };
  };

  useEffect(() => {
    console.log('Updating Class Score');
    const newScore = assignmentTypes
      ? Object.values(assignmentTypes).reduce((acc, at) => {
          if (at && at.assignments) {
            const { totalScore } = getAtScores(at.assignments);
            return acc + totalScore;
          }
          return acc;
        }, 0)
      : 0;
    const toUpdate = { score: newScore };
    setCls((prevCls) => ({ ...prevCls, ...toUpdate }));
  }, [assignmentTypes]);

  const value = {
    cls,
    setCls,
    assignmentTypes,
    setAssignmentTypes,
    warnings,
  };

  return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>;
};
