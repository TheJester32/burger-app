import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '../header/appHeader';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';
import appStyles from './app.module.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Header />
        <main className={appStyles.main}>
          <div className={appStyles.main__inner_content}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </main>
      </Router>
    </DndProvider>
  );
}

export default App;
