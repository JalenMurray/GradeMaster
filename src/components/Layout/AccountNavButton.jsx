import { AccountBox } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { fetchUserAttributes } from 'aws-amplify/auth';

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
      <a href="/" disabled className="btn btn-ghost drawer-button font-normal" aria-label="Loading">
        <span className="loading loading-dots loading-md" />
      </a>
    );
  }

  return (
    <a href="/account" className="btn btn-ghost drawer-button font-normal">
      <AccountBox /> {user.name}
    </a>
  );
}

export default AccountNavButton;
