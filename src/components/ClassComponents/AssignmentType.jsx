import { AddCircleOutline, Delete, Lock, LockOpenRounded } from '@mui/icons-material';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { useContext, useEffect, useState } from 'react';
import { createAssignment, updateAssignmentType, updateAssignment } from '../../graphql/mutations';
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

  useEffect(() => {
    setLostPoints(at.maxTotalScore - at.totalScore);
  }, [at, setLostPoints]);

  const getUpdatedScoreVariables = (updatedAssignments, newAtWeight) => {
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
    const weight = at.lockWeights ? newAtWeight || at.weight : maxTotalScore;
    console.log(weight, newAtWeight);
    return { totalScore, maxTotalScore, weight };
  };

  const getBalancedAssignments = (updatedAssignments, atWeight) => {
    const newWeight = atWeight / updatedAssignments.length;
    console.log('NEW ASSIGNMENT WEIGHT', newWeight);
    return updatedAssignments.map((assignment) => ({ ...assignment, weight: newWeight }));
  };

  const updateAssignmentTypeScores = (newAssignments, newAtWeight) => {
    const { totalScore, maxTotalScore, weight } = getUpdatedScoreVariables(
      newAssignments,
      newAtWeight
    );
    console.log(
      `NEW ASSIGNMENT TYPE SCORES: totalScore: ${totalScore}\tmaxTotalScore: ${maxTotalScore}\tweight: ${weight}`
    );
    const updatedAssignmentType = { ...at, totalScore, maxTotalScore, weight };
    console.log('UPDATED ASSIGNMENT TYPE', updatedAssignmentType);
    setAssignmentTypes({ ...assignmentTypes, [at.id]: updatedAssignmentType });
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

  const saveAssignment = useMutation({
    mutationFn: async (newAssignment) => {
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

  useEffect(() => {
    updateAssignmentTypeScores(assignments);
  }, [assignments]);

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

  const sendBalancedAssignments = async (balancedAssignments) => {
    const promises = balancedAssignments.map((assignment) =>
      client.graphql({
        query: updateAssignment,
        variables: {
          input: { id: assignment.id, weight: assignment.weight },
        },
        authMode: 'userPool',
      })
    );
    try {
      await Promise.all(promises);
      console.log('Balanced Assignments Successfully Sent');
    } catch (err) {
      console.error('Error sending balanced assignments', err);
      throw new Error(err.message);
    }
  };

  const updateAssignmentCallback = {
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
        updateAssignmentTypeScores(updatedAssignments);
      }
    },
    onBlur: async (field) => {
      if (field !== 'name') {
        const { totalScore, maxTotalScore, weight } = getUpdatedScoreVariables(assignments);
        const input = { totalScore, maxTotalScore, weight, id: at.id };
        try {
          await client.graphql({
            query: updateAssignmentType,
            variables: {
              input,
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
      if (locked && name === 'weight') {
        const balancedAssignments = getBalancedAssignments(assignments, value);
        setAssignments(balancedAssignments);
        updateAssignmentTypeScores(balancedAssignments, value);
      }
    } else {
      console.error(message);
    }
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    const input = { id: at.id, [name]: value };
    console.log(input);
    try {
      await client.graphql({
        query: updateAssignmentType,
        variables: {
          input,
        },
        authMode: 'userPool',
      });
      console.log('Assignment Type Update Sent');
      if (name === 'weight') {
        sendBalancedAssignments(assignments);
      }
    } catch (err) {
      console.error('Error Updating Assignment Type', err);
      throw new Error(err.message);
    }
  };

  const clientAddAssignment = (newAssignment) => {
    const updatedAssignments = [...assignments, newAssignment];
    console.log('NEW ASSIGNMENTS', updatedAssignments);
    if (locked) {
      console.log('ASSIGNMENT WEIGHTS LOCKED.  BALANCING NEW ASSIGNMENTS');
      const balancedAssignments = getBalancedAssignments(updatedAssignments, at.weight);
      console.log('BALANCED ASSIGNMENTS', balancedAssignments);
      setAssignments(balancedAssignments);
      updateAssignmentTypeScores(balancedAssignments);
    } else {
      updateAssignmentTypeScores(updatedAssignments);
    }
  };

  const handleAddAssignment = async () => {
    const newAssignment = {
      assignmentAssignmentTypeId: at.id,
      name: at.defaultName,
      score: at.maxScore,
      maxScore: at.maxScore,
      weight: 0,
    };
    clientAddAssignment(newAssignment);
    if (locked) {
      sendBalancedAssignments(assignments);
    } else {
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
    }
  };

  return (
    <details className="collapse collapse-arrow bg-base-200">
      <summary className="collapse-title text-4xl font-medium">{at.name}</summary>
      <div className="collapse-content">
        <div className="flex flex-col py-6">
          <div className="flex gap-2" id={`${at.id}-buttons`}>
            <button className="btn-success class-button" onClick={handleAddAssignment}>
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
                  onBlur={handleBlur}
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
                    updateAssignmentCallback={updateAssignmentCallback}
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
