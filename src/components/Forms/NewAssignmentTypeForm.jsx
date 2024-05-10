import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { createAssignmentType } from '../../graphql/mutations';

const client = generateClient();

function NewAssignmentTypeForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    assignmentTypeClassId: null,
    name: '',
    defaultName: '',
    maxScore: 100.0,
    weight: 0,
    lockWeights: false,
    totalScore: 0,
    maxTotalScore: 0,
  });
  const [queryKey, setQueryKey] = useState(null);

  useEffect(() => {
    setQueryKey([`${formData.assignmentTypeClassId}-assignment-types`]);
  }, [formData.assignmentTypeClassId]);

  const submitNewAssignmentType = async () => {
    try {
      console.log(formData);
      await client.graphql({
        query: createAssignmentType,
        variables: {
          input: formData,
        },
        authMode: 'userPool',
      });
      console.log('ASSIGNMENT TYPE ADDED!!!!');
    } catch (err) {
      console.error('Error adding class', err);
      throw new Error(err.message);
    }
  };

  const saveAssignmentType = useMutation({
    mutationFn: submitNewAssignmentType,
    onMutate: async (newAssignmentType) => {
      await queryClient.cancelQueries({ queryKey });
      const previousAssignmentTypes = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) => [...old, newAssignmentType]);
      return { previousAssignmentTypes };
    },
    onError: (err, newAssignmentType, context) => {
      queryClient.setQueryData(queryKey, context.previousAssignmentTypes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <>
      <h3 className="font-bold text-lg">New Assignment Type</h3>
      <div className="w-3/4">
        <input id="new_assignment_type_modal_class" hidden />
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g Quizzes, Homework, Exams"
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                assignmentTypeClassId: document.getElementById('new_assignment_type_modal_class')
                  .value,
                name: e.target.value,
              });
            }}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Default Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g Quiz, HW, Exam"
            value={formData.defaultName}
            onChange={(e) => setFormData({ ...formData, defaultName: e.target.value })}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Max Score</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full"
            value={formData.maxScore}
            onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
          />
        </label>
        <label className="cursor-pointer label">
          <span className="label-text">Lock Weights</span>
          <input
            onChange={(e) => setFormData({ ...formData, lockWeights: e.target.checked })}
            type="checkbox"
            checked={formData.lockWeights}
            className="checkbox checkbox-success"
          />
        </label>
      </div>
      <div className="mt-4 p-4">
        <form method="dialog">
          <button
            className="btn btn-primary btn-wide"
            onClick={() => saveAssignmentType.mutate(formData)}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default NewAssignmentTypeForm;
