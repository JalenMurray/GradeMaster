import { useEffect, useState } from 'react';

import { fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { createSemester } from '../graphql/mutations';
import { listSemesters } from '../graphql/queries';

async function handleFetchUserAttributes() {
  try {
    const userAttributes = await fetchUserAttributes();
    return userAttributes;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const Playground = () => {
  const currYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    season: 'SPRING',
    year: currYear,
    current: true,
  });
  const [semesters, setSemesters] = useState(null);
  const client = generateClient();

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const results = await client.graphql({ query: listSemesters });
        setSemesters(results.data.listSemesters.items);
        console.log(results.data.listSemesters.items);
      } catch (error) {
        console.error('Error fetching semesters', error);
      }
    };
    fetchSemesters();
  }, [client]);

  const updateSemesters = async () => {
    try {
      const results = await client.graphql({ query: listSemesters });
      setSemesters(results.data.listSemesters.items);
      console.log(results.data.listSemesters.items);
    } catch (error) {
      console.error('Error fetching semesters', error);
    }
  };

  const submitNewSemester = async () => {
    try {
      await client.graphql({
        query: createSemester,
        variables: {
          input: formData,
        },
      });
    } catch (error) {
      console.error('Error adding semester', error);
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
              <button className="btn btn-primary btn-wide" onClick={submitNewSemester}>
                Submit
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div>
        <h1>Semesters:</h1>
        <button className="btn" onClick={updateSemesters}>
          Update Semesters
        </button>
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
