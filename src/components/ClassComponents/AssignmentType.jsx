import { AddCircleOutline, Delete, Lock, LockOpenRounded } from '@mui/icons-material';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { useContext, useEffect, useState } from 'react';
import { createAssignment, updateAssignmentType } from '../../graphql/mutations';
import { listAssignments } from '../../graphql/queries';
import Assignment from './Assignment';
import { ClassContext } from '../../context/class';
import { formatFloat } from '../../utils/format';
import { validateAssignmentType } from '../../utils/classUtils';

const client = generateClient();

function AssignmentType({ at }) {
  const { assignmentTypes, setAssignmentTypes } = useContext(ClassContext);
  const queryClient = useQueryClient();
  const queryKey = [`${at.id}-assignments`];
  const [locked, setLocked] = useState(at.lockWeights);
  const [assignments, setAssignments] = useState([]);
  const [lostPoints, setLostPoints] = useState(at.maxTotalScore - at.totalScore);
  const newAssignment = {
    assignmentAssignmentTypeId: at.id,
    name: at.defaultName,
    score: at.maxScore,
    maxScore: at.maxScore,
    weight: 0,
  };

  useEffect(() => {
    setLostPoints(at.maxTotalScore - at.totalScore);
  }, [at, setLostPoints]);

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

  const { data: foundAssignments } = useQuery({
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

  useEffect(() => {
    if (foundAssignments) {
      setAssignments(foundAssignments);
    }
  }, [foundAssignments]);

  if (!foundAssignments) {
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

  const getUpdatedScoreVariables = (updatedAssignments) => {
    const totalScore = updatedAssignments.reduce(
      (acc, a) => acc + (a.score / a.maxScore) * a.weight,
      0
    );
    const maxTotalScore = updatedAssignments.reduce((acc, a) => {
      if (typeof a.weight === 'string') {
        return acc;
      }
      return acc + a.weight;
    }, 0);
    const weight = at.lockWeights ? at.weight : maxTotalScore;
    return { totalScore, maxTotalScore, weight };
  };

  const updateAssignment = {
    onChange: (id, field, toUpdate) => {
      const updatedAssignments = assignments.map((assignment) => {
        if (assignment.id === id) {
          return { ...assignment, ...toUpdate };
        }
        return assignment;
      });
      setAssignments(updatedAssignments);
      console.log('MAKING CHANGES ');
      if (field !== 'name') {
        const { totalScore, maxTotalScore, weight } = getUpdatedScoreVariables(updatedAssignments);
        const updatedAssignmentType = { ...at, totalScore, maxTotalScore, weight };
        setAssignmentTypes({ ...assignmentTypes, [at.id]: updatedAssignmentType });
      }
    },
    onBlur: async (field) => {
      if (field !== 'name') {
        const { totalScore, maxTotalScore, weight } = getUpdatedScoreVariables(assignments);
        try {
          await client.graphql({
            query: updateAssignmentType,
            variables: {
              input: { id: at.id, totalScore, maxTotalScore, weight },
            },
            authMode: 'userPool',
          });
          console.log('Update Sent');
        } catch (err) {
          console.error('Error Updating Assignment Type', err);
          throw new Error(err.message);
        }
      }
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const { valid, message } = validateAssignmentType(name, value);
    if (valid) {
      console.log(message);
    } else {
      console.error(message);
    }
  };

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
          <div className="flex gap-4 pt-4 text-2xl">
            <h1>
              Total Weight:
              {locked ? (
                <input
                  onFocus={(e) => e.target.select()}
                  name="weight"
                  value={at.weight}
                  onChange={handleChange}
                  className="input input-ghost w-[4.5rem] mx-2 text-xl"
                  type="number"
                />
              ) : (
                <span className="input input-ghost w-[4.5rem] mx-2 text-xl">{at.weight}</span>
              )}
            </h1>
            <div className="divider divider-horizontal" />
            <h1>
              Weighted Score: {formatFloat(at.totalScore, 2) || 0}/
              {formatFloat(at.maxTotalScore, 2) || 0}
            </h1>
            <div className="divider divider-horizontal" />
            <h1>Lost Points: {formatFloat(lostPoints, 2)}</h1>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table text-xl">
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
                  <Assignment
                    assignment={assignment}
                    weightLocked={locked}
                    assignmentsQueryKey={queryKey}
                    updateAssignmentCallback={updateAssignment}
                  />
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
