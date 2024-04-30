import { useQuery } from '@tanstack/react-query';

import { generateClient } from 'aws-amplify/api';
import { listSemesters } from '../../graphql/queries';

import SemesterMenuItem from './SemesterMenuItem';

const client = generateClient();

const fetchSemesters = async () => {
  const result = await client.graphql({ query: listSemesters, authMode: 'userPool' });
  return result.data.listSemesters.items;
};

function Menu() {
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

  return (
    <ul className="menu px-4 py-0">
      <li>
        <details id="semesters">
          <summary className="group">Semesters</summary>
          <ul>
            {semesters &&
              semesters.map((semester) => {
                console.log('IN MAP', semester);
                return (
                  <li key={semester.id}>
                    <SemesterMenuItem semester={semester} />
                  </li>
                );
              })}
          </ul>
        </details>
      </li>
    </ul>
  );
}

export default Menu;
