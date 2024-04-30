import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { listSemesters } from '../../graphql/queries';
import { onCreateSemester, onDeleteSemester, onUpdateSemester } from '../../graphql/subscriptions';

import SemesterMenuItem from './SemesterMenuItem';

const client = generateClient();

const fetchSemesters = async () => {
  const result = await client.graphql({ query: listSemesters, authMode: 'userPool' });
  return result.data.listSemesters.items;
};

function Menu() {
  const queryClient = useQueryClient();
  const queryKey = ['semesters'];
  const { data: semesters, isLoading } = useQuery({
    queryKey,
    queryFn: fetchSemesters,
    initialData: [],
  });

  useEffect(() => {
    const createSub = client
      .graphql({ query: onCreateSemester, type: 'subscription', authMode: 'userPool' })
      .subscribe({
        next: ({ value }) => {
          queryClient.setQueryData(queryKey, (current) => {
            const toCreateIndex = current.findIndex(
              (item) => item.id === value.data.onCreateSemester.id
            );
            if (toCreateIndex) {
              return current;
            }
            return [...current, value.data.onCreateSemester];
          });
        },
      });
    const updateSub = client
      .graphql({ query: onUpdateSemester, type: 'subscription', authMode: 'userPool' })
      .subscribe({
        next: ({ value }) => {
          queryClient.setQueryData(queryKey, (current) => {
            const toUpdateIndex = current.findIndex(
              (item) => item.id === value.data.onUpdateSemester.id
            );
            if (toUpdateIndex === -1) {
              return [...current, value.data.onCreateSemester];
            }
            return [
              ...current.slice(0, toUpdateIndex),
              value.data.onUpdateSemester,
              ...current.slice(toUpdateIndex + 1),
            ];
          });
        },
      });
    const deleteSub = client
      .graphql({ query: onDeleteSemester, type: 'subscription', authMode: 'userPool' })
      .subscribe({
        next: ({ value }) => {
          queryClient.setQueryData(queryKey, (current) => {
            const toDeleteIndex = current.findIndex(
              (item) => item.id === value.data.onDeleteSemester.id
            );
            return [...current.slice(0, toDeleteIndex), ...current.slice(toDeleteIndex + 1)];
          });
        },
      });
    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            semesters.map((semester) => (
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
