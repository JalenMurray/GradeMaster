import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { createClass } from '../../graphql/mutations';

const client = generateClient();

function NewClassForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    classSemesterId: null,
    code: '',
    title: '',
    desired_score: 100.0,
    units: 3,
    display_color: '#00CDB7',
  });
  const [queryKey, setQueryKey] = useState(null);

  useEffect(() => {
    setQueryKey([`${formData.classSemesterId}-classes`]);
  }, [formData.classSemesterId]);

  const submitNewClass = async () => {
    try {
      await client.graphql({
        query: createClass,
        variables: {
          input: formData,
        },
        authMode: 'userPool',
      });
      console.log('CLASS ADDED!!!!');
    } catch (err) {
      console.error('Error adding class', err);
      throw new Error(err.message);
    }
  };

  const saveClass = useMutation({
    mutationFn: submitNewClass,
    onMutate: async (newClass) => {
      await queryClient.cancelQueries({ queryKey });
      const previousClasses = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) => [...old, newClass]);
      return { previousClasses };
    },
    onError: (err, newClass, context) => {
      queryClient.setQueryData(queryKey, context.previousClasses);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <>
      <h3 className="font-bold text-lg">New Class</h3>
      <div className="w-3/4">
        <input id="new_class_modal_semester" hidden />
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Code</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g CMSC420, MATH140, HIST100"
            value={formData.code}
            onChange={(e) => {
              setFormData({
                ...formData,
                classSemesterId: document.getElementById('new_class_modal_semester').value,
                code: e.target.value,
              });
            }}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g Intro to Calculus, Data Structures + Algorithms"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Desired Score</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full"
            value={formData.desired_score}
            onChange={(e) => setFormData({ ...formData, desired_score: e.target.value })}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Units</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full"
            value={formData.units}
            onChange={(e) => setFormData({ ...formData, units: e.target.value })}
            onFocus={(e) => e.target.select()}
          />
        </label>
      </div>
      <div className="mt-4 p-4">
        <form method="dialog">
          <button className="btn btn-primary btn-wide" onClick={() => saveClass.mutate(formData)}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default NewClassForm;
