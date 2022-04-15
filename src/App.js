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
      <DisplayTasks />
    </div>
  );
}

export default App;

/*    
 const [filteredUser, setFilteredUser] = useState('All');

    const filterChange = selectedUser => {
      setFilteredUser(selectedUser);
    };


    
   const filteredTasks = [];
    for( var i=0; i<tasks.length; i++){
      if (tasks[i].userid === filteredUser){
        filteredTasks.push(tasks[i]);
      }
    }
    setTasks(filteredTasks);
    console.log("filtered tasks by users",filteredTasks);
    

*/
