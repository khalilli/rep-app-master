import React from 'react';
import Homepage from "./pages/Homepage.js";
import DisplayTasks from "./pages/DisplayTasks.js";
import AppProvider from "./providers/AppProvider.js"
import AppRoutes from "./routers/AppRoutes.js"

function App() {
  return (
    <div>
      {/* <AppProvider>
        <AppRoutes />
      </AppProvider> */}
      <Homepage />
    </div>
  );
}

export default App;
