export const formatSeason = (season) =>
  season.charAt(0).toUpperCase() + season.slice(1).toLowerCase();

export const getSemesterStr = (semester) => `${formatSeason(semester.season)} ${semester.year}`;
