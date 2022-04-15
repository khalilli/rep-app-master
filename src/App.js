import React from 'react';
import Homepage from "./pages/Homepage.js";
import DisplayTasks from "./pages/DisplayTasks.js";
import AppProvider from "./providers/AppProvider.js"
import AppRoutes from "./routers/AppRoutes.js"
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <div>
      {/* <AppProvider>
        <AppRoutes />
      </AppProvider> */}
      <DisplayTasks />
    </div>
  );
}

export default App;
