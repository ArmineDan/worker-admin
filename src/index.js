import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
const theme = createMuiTheme({
   palette: {
       primary: orange,
   }
});
//console.log(theme);
ReactDOM.render(
   <MuiThemeProvider theme={theme}>
       <App />
   </MuiThemeProvider>,
   document.getElementById('root')
);