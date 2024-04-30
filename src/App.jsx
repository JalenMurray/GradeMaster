import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Amplify
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';

// Components
import Playground from './components/Playground';
import ThemeToggle from './components/ThemeToggle';

import config from './amplifyconfiguration.json';
import Layout from './components/Layout/Layout';

Amplify.configure(config);
const queryClient = new QueryClient();

function App({ signOut, user }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function handleFetchUserAttributes() {
      try {
        const userAttributes = await fetchUserAttributes();
        setUserData(userAttributes);
      } catch (error) {
        console.log(error);
      }
    }
    handleFetchUserAttributes();
  }, [user, setUserData]);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}

export default withAuthenticator(App);

//  <div>
//         <ThemeToggle />
//         <div className="flex gap-4">Current User:
//         {userData ? userData.email : 'No User Signed In'}</div>
//         <button className="btn" onClick={signOut}>
//           Sign Out
//         </button>
//         <Playground />
//       </div>
