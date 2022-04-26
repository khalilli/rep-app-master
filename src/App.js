import React from 'react';
import AppProvider from "./providers/AppProvider.js"
import AppRoutes from "./routers/AppRoutes.js"
import Navbar from './components/Navbar.js';

function App() {
  return (
    <div>
      <AppProvider>
        <Navbar />
        <AppRoutes />
      </AppProvider>
    </div>
  );
}

export default App;