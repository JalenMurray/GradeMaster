import { useContext, useEffect, useState } from 'react';
import { ClassContext } from '../../context/class';

function Assignment({ at, assignment }) {
  const { updateAssignmentType } = useContext(ClassContext);
  const [name, setName] = useState(assignment.name);
  const [score, setScore] = useState(assignment.score);
  const [maxScore, setMaxScore] = useState(assignment.maxScore);
  const [weight, setWeight] = useState(assignment.weight);
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

  return (
    <>
      <td>
        <input />
        {assignment.name}
      </td>
      <td>
        {assignment.score} / {assignment.maxScore}
      </td>
      <td>{assignment.weight}</td>
      <td>{weightedScore}</td>
      <td>{lostPoints}</td>
    </>
  );
}

export default Assignment;
