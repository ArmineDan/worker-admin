import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers} from '@fortawesome/free-solid-svg-icons';
import { faListUl} from '@fortawesome/free-solid-svg-icons';
import Users from './userslist';
import {history} from 'react-router-dom';
import Catlist from './components/cgt';

const drawerWidth = 240;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
        
      width: `calc(100% - ${drawerWidth}px)`, 
    },
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
      
    }, 
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "Black",
    color: 'white',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    
    
  },
  

}));

function ResponsiveDrawer(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
    const [show_current, setShow_current] = React.useState('Users');
  // function handleDrawerToggle(props) {
  //   setMobileOpen(!mobileOpen);
  // }
    useEffect(()=> {

    },[show_current] )

const openCurrent =(e)=>{

    setShow_current(e)
   console.log(e,"wwww")


  }
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["Users","Categories"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon  >{index % 2 === 0 ? <FontAwesomeIcon icon={faUsers} style={{color: 'orange'}}  /> : <FontAwesomeIcon icon={faListUl} style={{color: 'orange'}} />}</ListItemIcon>
            <ListItemText primary={text} onClick={()=>{openCurrent(text)}}/>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <FontAwesomeIcon icon={faUsers} style={{color: 'orange'}}  /> : <FontAwesomeIcon icon={faListUl} style={{color: 'orange'}} />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
          {show_current==='Users'?
              <Users/>:
              show_current==='Categories'?<Catlist/>:
                  null
                   }

         </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
 
  container: PropTypes.object,
};

export default ResponsiveDrawer;