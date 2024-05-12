import { createContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    console.log('Updating Class Score');
    const newScore = assignmentTypes
      ? Object.values(assignmentTypes).reduce((acc, at) => acc + at.totalScore, 0)
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
