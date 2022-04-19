import React from 'react';
import AppProvider from "./providers/AppProvider.js"
import AppRoutes from "./routers/AppRoutes.js"
import Navbar from './components/Navbar.js';
import Homepage from "./pages/Homepage.js";
import DisplayTasks from "./pages/DisplayTasks.js";

function App() {
  return (
    <div>
      <AppProvider>
        <Navbar />
        <AppRoutes />
      </AppProvider>
      {/* <Homepage /> */}
    </div>
  );
}

export default App;