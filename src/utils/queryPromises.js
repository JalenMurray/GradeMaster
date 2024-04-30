import { listSemesters } from '../graphql/queries';

export const listSemestersPromise = async (client) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  client
    .graphql({ query: listSemesters, authMode: 'userPool' })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const createSemesterPromise = async (client) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  client
    .graphql({ query: listSemesters, authMode: 'userPool' })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
