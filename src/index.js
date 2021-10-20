import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from "./context/UserContext";

import {CssBaseline} from "@mui/material";


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <CssBaseline/>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
