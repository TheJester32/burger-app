import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';

interface RouteGuardProps {
  element: React.ReactElement;
  isProtected: boolean;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ element, isProtected }) => {
  const { isAuthentficated } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (isProtected && !isAuthentficated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isProtected && isAuthentficated) {
    return <Navigate to={from} replace />;
  }

  return element;
};

export { RouteGuard };
