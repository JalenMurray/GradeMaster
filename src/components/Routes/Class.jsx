import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { getClass } from '../../graphql/queries';

const client = generateClient();

function Class() {
  const { classId } = useParams();

  const fetchClass = async () => {
    const result = await client.graphql({
      query: getClass,
      authMode: 'userPool',
      variables: { id: classId },
    });
    return result.data.getClass;
  };

  const queryKey = ['class'];
  const { data: cls, refetch } = useQuery({
    queryKey,
    queryFn: fetchClass,
    initialData: undefined,
  });

  useEffect(() => {
    refetch();
  }, [classId, refetch]);

  if (!cls) {
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
      <h1 className="text-5xl">{cls.code}</h1>
      <h1 className="text-3xl mt-2">{cls.title}</h1>
      <h2 className="mt-6 text-2xl flex gap-4 align-center">
        Class Information
        <button className="btn btn-sm btn-outline btn-primary ml-4">Edit</button>
      </h2>
      <div className="mt-2 flex gap-3 w-full">
        <label className="form-control w-fit">
          <div className="label">
            <span className="label-text">Code</span>
          </div>
          <input type="text" className="input input-bordered w-40" value={cls.code} disabled />
        </label>
        <label className="form-control w-fit">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-[30rem]"
            value={cls.title}
            disabled
          />
        </label>
      </div>
    </div>
  );
}

export default Class;
