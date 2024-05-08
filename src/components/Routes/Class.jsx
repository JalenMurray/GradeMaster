import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AddCircleOutline, Delete, Edit } from '@mui/icons-material';
import { generateClient } from 'aws-amplify/api';
import { getClass } from '../../graphql/queries';
import GradeCalculator from '../ClassComponents/GradeCalculator';
import { ClassContext } from '../../context/class';
import { getSemesterStr } from '../../utils/format';

const client = generateClient();

function Class() {
  const { classId } = useParams();
  const { cls, setCls } = useContext(ClassContext);

  const fetchClass = async () => {
    const result = await client.graphql({
      query: getClass,
      authMode: 'userPool',
      variables: { id: classId },
    });
    return result.data.getClass;
  };

  const queryKey = ['class'];
  const { data: foundCls, refetch } = useQuery({
    queryKey,
    queryFn: fetchClass,
    initialData: undefined,
  });

  useEffect(() => {
    refetch();
  }, [classId, refetch]);

  useEffect(() => {
    if (foundCls) {
      setCls(foundCls);
    }
  }, [foundCls, setCls]);

  if (!foundCls) {
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
    <div className="w-full max-w-7xl flex-grow pt-10">
      <h1 className="text-5xl" style={{ color: cls.displayColor }}>
        {cls.code} <span className="text-xl text-neutral-600">{getSemesterStr(cls.semester)}</span>
      </h1>
      <h1 className="text-3xl mt-2" style={{ color: cls.displayColor }}>
        {cls.title}
      </h1>
      <h2 className="mt-6 text-2xl flex gap-4 align-center">Actions</h2>
      <div className="mt-2 flex gap-3 w-full">
        <button className="btn btn-neutral">
          <Edit />
          Edit Class
        </button>
        <button
          className="btn btn-success text-white"
          // Set the Value of the class so that the user doesn't have to choose the class
          onClick={() => {
            document.getElementById('new_assignment_type_modal_class').value = cls.id;
            document.getElementById('new_assignment_type_modal').showModal();
          }}
        >
          <AddCircleOutline />
          New Assignment Type
        </button>

        <button className="btn btn-error text-white">
          <Delete />
          Delete Class
        </button>
      </div>
      <GradeCalculator cls={cls} />
    </div>
  );
}

export default Class;
