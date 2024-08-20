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
import { ProtectedRouteElement } from '../routes/ProtectedRouteElement';
import { UnprotectedRouteElement } from '../routes/UnprotectedRouteElement';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UnprotectedRouteElement element={<LoginPage />} />} />
          <Route path="/register" element={<UnprotectedRouteElement element={<Register />} />} />
          <Route path="/forgot-password" element={<UnprotectedRouteElement element={<ForgotPassword />} />} />
          <Route path="/reset-password" element={
            sessionStorage.getItem('forgotPasswordInitiated') === 'true' 
              ? <UnprotectedRouteElement element={<ResetPassword />} />
              : <Navigate to="/forgot-password" replace />
          } />
          <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;