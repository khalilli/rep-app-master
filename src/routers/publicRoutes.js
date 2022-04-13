import React from 'react';
import Homepage from "../pages/Homepage";
import Somepage from "../pages/Somepage";

export const publicRoutes = [
    {
        path: window.nextUrl + '/homepage',
        element: <Homepage/>
    },
    {
        path: window.nextUrl + '/somepage',
        element: <Somepage/>
    }
]