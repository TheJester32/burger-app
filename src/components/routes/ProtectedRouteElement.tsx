import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';

interface ProtectedRouteElementProps {
  element: React.ReactElement;
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({ element }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export { ProtectedRouteElement };
