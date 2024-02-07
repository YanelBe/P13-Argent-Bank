import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfile } from './redux/actions/userActions';

const AppInitializer = ({ children }) => {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      dispatch(getUserProfile({ token: jwtToken }))
        .then(() => setIsAuthInitialized(true))
        .catch((error) => {
          console.error('Error during profile fetch:', error);
          setIsAuthInitialized(true); // Continue initialization even if there's an error
        });
    } else {
      setIsAuthInitialized(true); // No token, consider auth as initialized
    }
  }, [dispatch]);

  if (!isAuthInitialized) {
    return <div>Loading...</div>; // Or any other loading state
  }

  return children;
};

export default AppInitializer;
