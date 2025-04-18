
// This file now serves as a redirect to the main dashboard
// The actual dashboard is in Dashboard.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default Index;
