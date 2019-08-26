import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './components/login';
import ResponsiveDrawer from "./drawer";
import Users from './Users/userslist';



const theme = createMuiTheme({
    palette: {
        primary: orange,

    }

});

const route=(
    <MuiThemeProvider theme={theme}>
        <Router >

             <Route exact path="/" component ={Login}/>;
             <Route exact path="/dashboard" component={ResponsiveDrawer} />


        </Router>
    </MuiThemeProvider>

)


ReactDOM.render(
    route,
    document.getElementById('root')

);

serviceWorker.unregister();
