import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '../header/appHeader';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';
import { Register } from '../../pages/register/register';
import { ForgotPassword } from '../../pages/forgotPassword/forgotPassword';
import { ResetPassword } from '../../pages/resetPassword/resetPassword';
import { Profile } from '../../pages/profile/profile';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Header />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
