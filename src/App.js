import React from 'react';
import Homepage from "./pages/Homepage.js";
import DisplayTasks from "./pages/DisplayTasks.js";
import AppProvider from "./providers/AppProvider.js"
import AppRoutes from "./routers/AppRoutes.js"
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <div>
      <AppProvider>
        <Navbar/>
        <AppRoutes />
      </AppProvider>
      {/* <Homepage /> */}
    </div>
    // <Router>
    //   <div className="App">
    //     <Navbar/>
    //     <Routes>
    //           <Route exact path='/' element={< Homepage />}></Route>
    //           <Route exact path='/displaytasks' element={< DisplayTasks />}></Route>
    //     </Routes>
    //   </div>
    // </Router>
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
