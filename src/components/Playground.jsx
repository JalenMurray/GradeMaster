// import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// import { fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { listSemesters } from '../graphql/queries';

// async function handleFetchUserAttributes() {
//   try {
//     const userAttributes = await fetchUserAttributes();
//     return userAttributes;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
const client = generateClient();

const fetchSemesters = async () => {
  const result = await client.graphql({ query: listSemesters, authMode: 'userPool' });
  return result.data.listSemesters.items;
};

const Playground = () => {
  const { data: semesters, isLoading } = useQuery({
    queryKey: ['semesters'],
    queryFn: fetchSemesters,
    initialData: [],
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full" />
        <div className="skeleton h-4 w-28" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
      </div>
    );
  }

  // const updateSemesters = async () => {
  //   try {
  //     const results = await client.graphql({ query: listSemesters, authMode: 'userPool' });
  //     setSemesters(results.data.listSemesters.items);
  //     console.log(results.data.listSemesters.items);
  //   } catch (error) {
  //     console.error('Error fetching semesters', error);
  //   }
  // };

  return (
    <div className="m-8 p-4 border-2 border-green-600">
      <h1 className="mb-4 text-lg ">Playground Component</h1>
      <div>
        <h1>Semesters:</h1>
        <ul>
          {semesters &&
            semesters.map((semester) => (
              <li key={semester.id}>
                {semester.season} {semester.year} -- isCurrent: {semester.current ? 'Yes' : 'No'}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Playground;
