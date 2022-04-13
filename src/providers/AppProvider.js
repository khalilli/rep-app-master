import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

const AppProvider = (props) => {
    return (
                <div>
                    <Router>
                       {props.children}
                    </Router>
                </div>
    )
}

export default AppProvider;