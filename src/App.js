import React from 'react';
import Homepage from "./pages/Homepage.js";
import AppProvider from "./providers/AppProvider.js"
import AppRoutes from "./routers/AppRoutes.js"

function App() {
  return (
    <div>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </div>
  );
}

export default App;
