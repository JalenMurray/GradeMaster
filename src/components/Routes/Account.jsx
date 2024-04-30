import { useQuery } from '@tanstack/react-query';
import { fetchUserAttributes } from 'aws-amplify/auth';

const getUserData = async () => {
  const userAttributes = await fetchUserAttributes();
  return userAttributes;
};

// const updateUser = async () => {};

function Account() {
  const queryKey = ['user'];
  const { data: user, isLoading } = useQuery({
    queryKey,
    queryFn: getUserData,
    initialData: {},
  });

  if (isLoading) {
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

  console.log(user);

  return (
    <div className="w-full max-w-4xl flex-grow pt-10">
      <h1 className="text-5xl">Welcome {user.name}</h1>
      <h2 className="mt-4 text-2xl flex gap-4 align-center">
        User Profile <button className="btn btn-sm btn-outline btn-primary ml-4">Edit</button>
      </h2>
      <div className="mt-2 flex flex-col gap-2 w-fit">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" value={user.email} disabled />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" className="grow" value={user.name} disabled />
        </label>
      </div>
    </div>
  );
}

export default Account;
