import React from 'react';
import { AppProvider } from './AppContext';
import Sidebar from './Sidebar';
import MainPanel from './MainPanel';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Sidebar />
        <MainPanel />
      </div>
    </AppProvider>
  );
}

export default App;
