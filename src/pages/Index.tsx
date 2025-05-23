// This file is now just a redirect to the main app
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OfferPage from './OfferPage';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;

