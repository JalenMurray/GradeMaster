import { useQuery } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { listAssignmentTypes } from '../../graphql/queries';

import ProgressBar from './ProgressBar';
import AssignmentType from './AssignmentType';

const client = generateClient();

function GradeCalculator({ cls }) {
  const queryKey = [`${cls.id}-assignment-types`];
  const { data: assignmentTypes } = useQuery({
    queryKey,
    queryFn: async () => {
      const result = await client.graphql({
        query: listAssignmentTypes,
        authMode: 'userPool',
        variables: {
          filter: {
            assignmentTypeClassId: {
              eq: cls.id,
            },
          },
        },
      });
      return result.data.listAssignmentTypes.items;
    },
    initialData: undefined,
  });

  if (!assignmentTypes) {
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
    <div>
      <ProgressBar score={cls.score} />
      <div className="mt-4 flex flex-col gap-6" id="assignment-types">
        {assignmentTypes.map((at) => (
          <AssignmentType at={at} key={at.id} />
        ))}
      </div>
    </div>
  );
}

export default GradeCalculator;
