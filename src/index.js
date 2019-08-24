import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './components/login';
import {ShowUserList,ShowUserArchieves,ShowCategories, ShowStatistics, ShowSubscriptions,ShowIcons } from './components/ShowUserList';
import ResponsiveDrawer from "./drawer";




const theme = createMuiTheme({
    palette: {
        primary: orange,

    }

});

const route=(
    <MuiThemeProvider theme={theme}>
        <Router>

             <Route exact path="/" component ={Login}/>
             <Route exact path="/users" component ={ShowUserList}/>
            <Route exact path="/archives" component ={ShowUserArchieves}/>
            <Route exact path="/categories" component ={ShowCategories}/>
            <Route exact path="/statistics" component ={ShowStatistics}/>
            <Route exact path="/subscriptions" component ={ShowSubscriptions}/>
            <Route exact path="/icons" component ={ShowIcons}/>
             <Route exact path="/dashboard" component={ResponsiveDrawer} />


        </Router>
    </MuiThemeProvider>

)


ReactDOM.render(
    route,
    document.getElementById('root')

);

serviceWorker.unregister();
