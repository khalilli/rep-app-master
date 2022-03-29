import React from 'react';
import Homepage from "../pages/Homepage";
import Somepage from "../pages/Somepage";

export const publicRoutes = [
    {
        path: '/homepage',
        element: <Homepage/>
    },
    {
        path: '/somepage',
        element: <Somepage/>
    }
]