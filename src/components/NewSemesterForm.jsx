import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { createSemester } from '../graphql/mutations';

const client = generateClient();

function NewSemesterForm() {
  const queryKey = ['semesters'];
  const queryClient = useQueryClient();
  const currYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    season: 'SPRING',
    year: currYear,
    current: true,
  });

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
      throw new Error(err.message);
    }
  };

  const saveSemester = useMutation({
    mutationFn: submitNewSemester,
    onMutate: async (newSemester) => {
      await queryClient.cancelQueries({ queryKey });
      const previousSemesters = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) => [...old, newSemester]);
      return { previousSemesters };
    },
    onError: (err, newSemester, context) => {
      queryClient.setQueryData(queryKey, context.previousSemesters);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <>
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
          <button
            className="btn btn-primary btn-wide"
            onClick={() => saveSemester.mutate(formData)}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default NewSemesterForm;
