import { AddCircleOutline, Delete, Lock, LockOpenRounded } from '@mui/icons-material';
import { useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { useState } from 'react';
import { v4 } from 'uuid';
import { updateAssignmentType } from '../../graphql/mutations';

const client = generateClient();

function AssignmentType({ at }) {
  const queryClient = useQueryClient();
  const [locked, setLocked] = useState(at.lockWeights);

  console.log(at);

  const addAssignment = async () => {
    const newAssignment = {
      id: v4(),
      name: at.defaultName,
      score: at.maxScore,
      maxScore: at.maxScore,
      weight: 0,
      weightedScore: 0,
      lostPoints: 0,
    };
    const assignments = [newAssignment];
    console.log('NEW ASSIGNMENTS', assignments);
    try {
      await client.graphql({
        query: updateAssignmentType,
        variables: {
          input: { id: at.id, assignments: newAssignment },
        },
        authMode: 'userPool',
      });
      console.log('ASSIGNMENT UPDATED!!');
    } catch (err) {
      console.error('Error adding assignment', err);
      throw new Error(err.message);
    }
  };

  return (
    <details className="collapse collapse-arrow bg-base-200">
      <summary className="collapse-title text-4xl font-medium">{at.name}</summary>
      <div className="collapse-content">
        <div className="flex flex-col py-6">
          <div className="flex gap-2" id={`${at.id}-buttons`}>
            <button className="btn-success class-button" onClick={() => addAssignment()}>
              <AddCircleOutline />
              <p>New Assignment</p>
            </button>
            <button className="btn-secondary class-button" onClick={() => setLocked(!locked)}>
              {locked ? <LockOpenRounded /> : <Lock />}
              <p>{locked ? 'Unlock Weights' : 'Lock Weights'}</p>
            </button>
            <button className="btn-error class-button">
              <Delete />
              <p>Delete Assignment Type</p>
            </button>
          </div>
          <div className="flex">Weight: {at.weight}</div>
        </div>
        {/* {at.assignments ??
          at.assignments.map((assignment) => (
            <div key={assignment.name}>
              {assignment.name} {assignment.score} {assignment.maxScore}
            </div>
          ))} */}
      </div>
    </details>
  );
}

export default AssignmentType;
