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
  const queryKey = ['semesters'];
  const { data: semesters, isLoading } = useQuery({
    queryKey,
    queryFn: fetchSemesters,
    initialData: [],
  });

  const seasonOrder = { WINTER: 1, SPRING: 2, SUMMER: 3, FALL: 4 };

  const sortSemesters = (a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    return seasonOrder[b.season] - seasonOrder[a.season];
  };

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
        <h2 className="menu-title">Semesters</h2>
        <ul>
          <li>
            <button
              className="btn btn-ghost group"
              onClick={() => document.getElementById('new_semester_modal').showModal()}
            >
              New Semester
            </button>
          </li>
          {semesters &&
            semesters.sort(sortSemesters).map((semester) => (
              <li key={semester.id}>
                <SemesterMenuItem semester={semester} />
              </li>
            ))}
        </ul>
      </li>
    </ul>
  );
}

export default Menu;
