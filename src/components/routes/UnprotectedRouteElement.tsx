import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';

interface UnprotectedRouteElementProps {
  element: React.ReactElement;
}

const UnprotectedRouteElement: React.FC<UnprotectedRouteElementProps> = ({ element }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  return !isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export { UnprotectedRouteElement };
