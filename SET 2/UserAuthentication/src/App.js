import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import AppRoutes from './AppRoutes';
import { saveUserToStorage, removeUserFromStorage } from './utils/localStorage';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Automatically save/remove user data when authentication state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      // Save user to localStorage when authenticated
      saveUserToStorage(user);
    } else if (!isAuthenticated) {
      // Remove user from localStorage when not authenticated
      removeUserFromStorage();
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <main className='column'>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <Router>
          <AppRoutes />
        </Router>
      </MantineProvider>
    </main>
  );
}

export default App;