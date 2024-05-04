import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { getSemester } from '../../graphql/queries';
import { formatSeason, getSemesterStr } from '../../utils/format';
import ClassCard from '../ClassCard';

const client = generateClient();

function Semester() {
  const { semesterId } = useParams();
  const queryClient = useQueryClient();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((e) => {
      const key = e.query.queryKey;
      const expectedKey = [`${semesterId}-classes`];
      if (key[0] === expectedKey[0]) {
        setClasses(e.query.state.data);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient, semesterId]);

  const fetchSemester = async () => {
    const result = await client.graphql({
      query: getSemester,
      authMode: 'userPool',
      variables: { id: semesterId },
    });
    return result.data.getSemester;
  };

  const queryKey = ['semester'];
  const { data: semester, refetch } = useQuery({
    queryKey,
    queryFn: fetchSemester,
    initialData: undefined,
  });

  useEffect(() => {
    refetch();
    setClasses(queryClient.getQueryData([`${semesterId}-classes`]));
  }, [semesterId, refetch, queryClient]);

  if (!semester) {
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
      <h1 className="text-5xl">{semester.season && getSemesterStr(semester)}</h1>
      <h2 className="mt-4 text-2xl flex gap-4 align-center">
        Semester Information
        <button className="btn btn-sm btn-outline btn-primary ml-4">Edit</button>
      </h2>
      <div className="mt-2 flex gap-3 w-fit">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Semester</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={semester.season && formatSeason(semester.season)}
            disabled
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Year</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full"
            value={semester.year}
            disabled
          />
        </label>
        <div className="flex gap-3 items-center">
          <span className="label-text">Current Semester</span>
          <input
            type="checkbox"
            checked={semester.current}
            className="checkbox checkbox-success"
            disabled
          />
        </div>
      </div>
      <h2 className="mt-8 text-2xl flex gap-4 align-center">Classes</h2>
      <div className="flex gap-4 mt-2 flex-wrap">
        {classes && classes.length > 0
          ? classes.map((cls) => <ClassCard cls={cls} key={cls.id} />)
          : 'No Classes'}
      </div>
    </div>
  );
}

export default Semester;
