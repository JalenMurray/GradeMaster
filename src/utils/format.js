export const formatSeason = (season) =>
  season.charAt(0).toUpperCase() + season.slice(1).toLowerCase();

export const getSemesterStr = (semester) => `${formatSeason(semester.season)} ${semester.year}`;

export const formatFloat = (num, n) => {
  if (num) {
    if (typeof num === 'string') {
      return parseFloat(parseFloat(num).toFixed(n));
    }
    return parseFloat(num.toFixed(n));
  }
  return '';
};
