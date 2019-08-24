import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import Subscribe from './components/subscribe'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Icons from './components/icons list';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers} from '@fortawesome/free-solid-svg-icons';
import { faListUl} from '@fortawesome/free-solid-svg-icons';
import { faBoxes} from '@fortawesome/free-solid-svg-icons'
import Users from './Users/userslist';
import SkillList from './components/cgt';
import UsersArchive from './Users/archiveusers';
import {faUserTimes} from '@fortawesome/free-solid-svg-icons';
import{faBell} from '@fortawesome/free-solid-svg-icons';
import './styles/skillListStyle.css';
import IconButton from '@material-ui/core/IconButton';
import { faChartBar} from '@fortawesome/free-solid-svg-icons';
import Statics from '../src/statics';
import MenuIcon from '@material-ui/icons/Menu';
import {fire} from './firebase/firebase';
import Logout from './components/logout'



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
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  

}));



function ResponsiveDrawer(props) {
  const {container} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
    const [show_current, setShow_current] = React.useState('Users');
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
    useEffect(()=> {
        user_status();


    },[show_current,props,] )


const openCurrent =(e)=>{

    setShow_current(e)
   //console.log(e,"wwww")


  }
  const user_status =()=>{

      fire.auth().onAuthStateChanged((user) => {
          if (user) {
          }
          else
          {
              props.history.push('/')
          }

      })



  }
  const drawer = (
    <div>
      <div className={classes.toolbar} />

        <List>
            {["Users","Archived Users"].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon >{index % 2 === 0 ?  <FontAwesomeIcon icon={faUsers} style={{color: 'orange'}}  /> : <FontAwesomeIcon icon={faUserTimes} style={{color: 'orange'}}/>}</ListItemIcon>
                    <ListItemText  primary={text} onClick={()=>{openCurrent(text)}}/>
                </ListItem>
            ))}
           {["Categories",'Statistics'].map((text, index) => (
            <ListItem  button key={text}>
                    <ListItemIcon>{index % 2 === 0 ?  <FontAwesomeIcon icon={faListUl} style={{color: 'orange'}} />:<FontAwesomeIcon icon={faChartBar} style={{color: 'orange'}}  />}</ListItemIcon>
                    <ListItemText primary={text}  onClick={()=>{openCurrent(text)}} />
                </ListItem>
            ))}

            {["Icons Collection"].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ?  <FontAwesomeIcon icon={faBoxes} style={{color: 'orange'}} />:<FontAwesomeIcon icon={faListUl} style={{color: 'orange'}}  />}</ListItemIcon>
                    <ListItemText primary={text}  onClick={()=>{openCurrent(text)}} />
                </ListItem>
            ))}
            {["Subscripetions"].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ?  <FontAwesomeIcon icon={faBell} style={{color: 'orange'}} />:<FontAwesomeIcon icon={faListUl} style={{color: 'orange'}}  />}</ListItemIcon>
                    <ListItemText primary={text}  onClick={()=>{openCurrent(text)}} />
                </ListItem>
            ))}

        </List>
    </div>

)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
          ><MenuIcon  /> </IconButton>
          <Typography variant="h6" noWrap>
            Admin
          </Typography>
          <Logout/>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                  paper: classes.drawerPaper,
              }}
              ModalProps={{
                  keepMounted: true,
              }}
          >
              {drawer}
          </Drawer>
        </Hidden>
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
            <Users/> :
                show_current==='Archived Users'?
                <UsersArchive/> :
                    show_current==='Categories'?
                        <SkillList/>:
                    show_current==='Statistics'?
                    <Statics/>:                       
                        show_current==='Icons Collection'?
                            <Icons/> :
                            show_current==='Subscribetions'?
                                <Subscribe/>:
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