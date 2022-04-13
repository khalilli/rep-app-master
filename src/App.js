import React from 'react';
import Homepage from "./pages/Homepage.js";
import Somepage from "./pages/Somepage.js";
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
