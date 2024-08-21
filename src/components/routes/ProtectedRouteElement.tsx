import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';

interface RouteGuardProps {
  element: React.ReactElement;
  isProtected: boolean;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ element, isProtected }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (isProtected && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isProtected && isAuthenticated) {
    const redirectPath = location.state?.from?.pathname || "/";
    return <Navigate to={redirectPath} replace />;
  }

  return element;
};

export { RouteGuard };
