import { useEffect, useState } from 'react';

// Amplify
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';

// Components
import Playground from './components/Playground';
import ThemeToggle from './components/ThemeToggle';

import config from './amplifyconfiguration.json';

Amplify.configure(config);

function App({ signOut, user }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function handleFetchUserAttributes() {
      try {
        const userAttributes = await fetchUserAttributes();
        console.log(userAttributes);
        setUserData(userAttributes);
      } catch (error) {
        console.log(error);
      }
    }
    handleFetchUserAttributes();
  }, [user, setUserData]);

  return (
    <div>
      <ThemeToggle />
      <div className="flex gap-4">Current User: {userData ? userData.email : 'No User Signed In'}</div>
      <button className="btn" onClick={signOut}>
        Sign Out
      </button>
      <Playground />
    </div>
  );
}

export default withAuthenticator(App);
