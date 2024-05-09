import { useEffect, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { validateAssignment } from '../../utils/classUtils';
import { updateAssignment } from '../../graphql/mutations';
import { formatFloat } from '../../utils/format';

const client = generateClient();

function Assignment({ assignment, updateAssignmentCallback, weightLocked, assignmentsQueryKey }) {
  const queryClient = useQueryClient();
  const [weightedScore, setWeightedScore] = useState(
    (assignment.score / assignment.maxScore) * assignment.weight
  );
  const [lostPoints, setLostPoints] = useState(null);

  useEffect(() => {
    setWeightedScore((assignment.score / assignment.maxScore) * assignment.weight);
  }, [setWeightedScore, assignment]);

  useEffect(() => {
    setLostPoints(assignment.weight - weightedScore);
  }, [setLostPoints, assignment, weightedScore]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const { valid, message } = validateAssignment(name, value);
    if (valid) {
      let formatted = value;
      if (name !== 'name') {
        formatted = formatFloat(value, 2);
      }
      updateAssignmentCallback.onChange(assignment.id, name, { [name]: formatted });
    } else {
      console.error(message);
    }
  };

  const updateAssignmentFn = async ({ name, value }) => {
    try {
      await client.graphql({
        query: updateAssignment,
        variables: {
          input: { id: assignment.id, [name]: value },
        },
        authMode: 'userPool',
      });
    } catch (err) {
      console.error('Error Updating Assignment', err);
      throw new Error(err.message);
    }
  };

  const updateAssignmentMutation = useMutation({
    mutationFn: updateAssignmentFn,
    onSuccess: () => {
      queryClient.invalidateQueries(assignmentsQueryKey);
    },
  });

  const handleBlur = async (e) => {
    updateAssignmentMutation.mutate(e.target);
    updateAssignmentCallback.onBlur(e.target.name);
  };

  return (
    <>
      <td>
        <input
          onFocus={(e) => e.target.select()}
          name="name"
          value={assignment.name}
          className="input input-ghost text-xl"
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </td>
      <td>
        <input
          onFocus={(e) => e.target.select()}
          name="score"
          value={assignment.score}
          className="input input-ghost w-[4.5rem] mx-2 text-xl"
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
        />
        /
        <input
          onFocus={(e) => e.target.select()}
          name="maxScore"
          value={assignment.maxScore}
          className="input input-ghost w-[4.5rem] mx-2 text-xl"
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
        />
      </td>
      <td>
        {weightLocked ? (
          <span className="input input-ghost w-[4.5rem] mx-2 text-xl">{assignment.weight}</span>
        ) : (
          <input
            onFocus={(e) => e.target.select()}
            name="weight"
            value={assignment.weight}
            className="input input-ghost w-[4.5rem] mx-2 text-xl"
            onKeyDown={handleKeyPress}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
          />
        )}
      </td>
      <td>{formatFloat(weightedScore, 2)}</td>
      <td>{formatFloat(lostPoints, 2)}</td>
    </>
  );
}

export default Assignment;
