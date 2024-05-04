import { AddCircleOutline, Delete, Lock, LockOpenRounded } from '@mui/icons-material';
import { useState } from 'react';

function AssignmentType({ at }) {
  const [locked, setLocked] = useState(at.lockWeights);

  return (
    <details className="collapse collapse-arrow bg-base-200">
      <summary className="collapse-title text-4xl font-medium">{at.name}</summary>
      <div className="collapse-content">
        <div className="flex flex-col py-6">
          <div className="flex gap-2" id={`${at.id}-buttons`}>
            <button className="btn-success class-button">
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
      </div>
    </details>
  );
}

export default AssignmentType;
