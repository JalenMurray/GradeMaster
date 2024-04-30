import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { createSemester } from '../graphql/mutations';
import { listSemesters } from '../graphql/queries';
import SemesterCreateForm from '../ui-components/SemesterCreateForm';

import { listSemestersPromise } from '../utils/queryPromises';

async function handleFetchUserAttributes() {
  try {
    const userAttributes = await fetchUserAttributes();
    return userAttributes;
  } catch (error) {
    console.log(error);
    return null;
  }
}
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
  const currYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    season: 'SPRING',
    year: currYear,
    current: true,
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

  console.log(semesters);

  // const updateSemesters = async () => {
  //   try {
  //     const results = await client.graphql({ query: listSemesters, authMode: 'userPool' });
  //     setSemesters(results.data.listSemesters.items);
  //     console.log(results.data.listSemesters.items);
  //   } catch (error) {
  //     console.error('Error fetching semesters', error);
  //   }
  // };

  const submitNewSemester = async () => {
    try {
      await client.graphql({
        query: createSemester,
        variables: {
          input: formData,
        },
        authMode: 'userPool',
      });
      console.log('SEMESTER ADDED!!!!');
    } catch (err) {
      console.error('Error adding semester', err);
    }
  };

  return (
    <div className="m-8 p-4 border-2 border-green-600">
      <h1 className="mb-4 text-lg ">Playground Component</h1>
      <div className="p-4 flex flex-col">
        <button className="btn btn-primary" onClick={() => document.getElementById('new_semester_modal').showModal()}>
          Create New Semester
        </button>
        <dialog id="new_semester_modal" className="modal">
          <div className="modal-box flex flex-col gap-4 items-center">
            <h3 className="font-bold text-lg">New Semester</h3>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Select the Semester&apos;s Season</span>
                </div>
                <select
                  value={formData.season}
                  onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value="SPRING">Spring</option>
                  <option value="SUMMER">Summer</option>
                  <option value="FALL">Fall</option>
                  <option value="WINTER">Winter</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Year</span>
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full max-w-xs"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </label>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Current Semester</span>
                  <input
                    onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                    type="checkbox"
                    checked={formData.current}
                    className="checkbox checkbox-success"
                  />
                </label>
              </div>
            </div>

            <div className="mt-4 p-4">
              <form method="dialog">
                <button className="btn btn-primary btn-wide" onClick={submitNewSemester}>
                  Submit
                </button>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
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
      <SemesterCreateForm onError={(modelFields, messages) => console.log(messages)} />
    </div>
  );
};

export default Playground;
