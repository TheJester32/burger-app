import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '../header/appHeader';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';
import { Register } from '../../pages/register/register';
import { ForgotPassword } from '../../pages/forgotPassword/forgotPassword';
import { ResetPassword } from '../../pages/resetPassword/resetPassword';
import { Profile } from '../../pages/profile/profile';
import { RouteGuard } from '../routes/ProtectedRouteElement';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<RouteGuard element={<LoginPage />} isProtected={false} />} />
          <Route path="/register" element={<RouteGuard element={<Register />} isProtected={false} />} />
          <Route path="/forgot-password" element={<RouteGuard element={<ForgotPassword />} isProtected={false} />} />
          <Route path="/reset-password" element={
            sessionStorage.getItem('forgotPasswordInitiated') === 'true' 
              ? <RouteGuard element={<ResetPassword />} isProtected={false} />
              : <Navigate to="/forgot-password" replace />
          } />
          <Route path="/profile" element={<RouteGuard element={<Profile />} isProtected={true} />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
