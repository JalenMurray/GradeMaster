import { AddCircleOutline, Delete, Lock, LockOpenRounded } from '@mui/icons-material';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { useContext, useState } from 'react';
import { createAssignment, updateAssignment, updateAssignmentType } from '../../graphql/mutations';
import { listAssignments } from '../../graphql/queries';
import Assignment from './Assignment';
import { ClassContext } from '../../context/class';

const client = generateClient();

function AssignmentType({ at }) {
  const queryClient = useQueryClient();
  const queryKey = [`${at.id}-assignments`];
  const [locked, setLocked] = useState(at.lockWeights);
  const newAssignment = {
    assignmentAssignmentTypeId: at.id,
    name: at.defaultName,
    score: at.maxScore,
    maxScore: at.maxScore,
    weight: 0,
  };

  const toggleLockWeights = async () => {
    try {
      await client.graphql({
        query: updateAssignmentType,
        variables: {
          input: { id: at.id, lockWeights: !at.lockWeights },
        },
        authMode: 'userPool',
      });
      setLocked(!locked);
      console.log('Update Sent');
    } catch (err) {
      console.error('Error Toggling Lock Weights', err);
      throw new Error(err.message);
    }
  };

  const { data: assignments } = useQuery({
    queryKey,
    queryFn: async () => {
      const result = await client.graphql({
        query: listAssignments,
        authMode: 'userPool',
        variables: {
          filter: {
            assignmentAssignmentTypeId: {
              eq: at.id,
            },
          },
        },
      });
      return result.data.listAssignments.items;
    },
    initialData: undefined,
  });

  const createNewAssignment = async () => {
    try {
      await client.graphql({
        query: createAssignment,
        variables: {
          input: newAssignment,
        },
        authMode: 'userPool',
      });
    } catch (err) {
      console.error('Error adding assignment', err);
      throw new Error(err.message);
    }
  };

  const saveAssignment = useMutation({
    mutationFn: createNewAssignment,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousAssignments = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) => [...old, newAssignment]);
      return { previousAssignments };
    },
    onError: (err, newA, context) => {
      queryClient.setQueryData(queryKey, context.previousAssignments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  if (!assignments) {
    return (
      <div className="w-full max-w-4xl flex-grow pt-10">
        <div className="flex flex-col gap-4 w-1/2">
          <div className="skeleton h-64 w-full" />
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
        </div>
      </div>
    );
  }

  return (
    <details className="collapse collapse-arrow bg-base-200">
      <summary className="collapse-title text-4xl font-medium">{at.name}</summary>
      <div className="collapse-content">
        <div className="flex flex-col py-6">
          <div className="flex gap-2" id={`${at.id}-buttons`}>
            <button className="btn-success class-button" onClick={() => saveAssignment.mutate()}>
              <AddCircleOutline />
              <p>New Assignment</p>
            </button>
            <button className="btn-secondary class-button" onClick={toggleLockWeights}>
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
        <div className="overflow-x-auto">
          <table className="table text-2xl">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Weight</th>
                <th>Weighted Score</th>
                <th>Lost Points</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <Assignment at={at} assignment={assignment} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </details>
  );
}

export default AssignmentType;
