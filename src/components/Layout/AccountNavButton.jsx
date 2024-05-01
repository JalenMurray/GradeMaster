import { AccountBox } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Link } from 'react-router-dom';

const getUserData = async () => {
  const userAttributes = await fetchUserAttributes();
  return userAttributes;
};

function AccountNavButton() {
  const queryKey = ['user'];
  const { data: user, isLoading } = useQuery({
    queryKey,
    queryFn: getUserData,
    initialData: {},
  });

  if (isLoading) {
    return (
      <Link
        to="./"
        disabled
        className="btn btn-ghost drawer-button font-normal"
        aria-label="Loading"
      >
        <span className="loading loading-dots loading-md" />
      </Link>
    );
  }

  return (
    <Link to="/account" className="btn btn-ghost drawer-button font-normal">
      <AccountBox /> {user.name}
    </Link>
  );
}

export default AccountNavButton;
