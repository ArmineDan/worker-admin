import React from 'react';
import ResponsiveDrawer from "../drawer";
import Users from "../Users/userslist";
import UsersArchive from "../Users/archiveusers";
import {makeStyles} from '@material-ui/core/styles';
import SkillList from './cgt';
import Statics from '../statics';
import Subscribe from './subscribe';
import Icons from './icons_list';



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
        padding: theme.spacing(0,2,0,40),
        [theme.breakpoints.down('sm')]: {
            padding:theme.spacing(2),
            width: `calc(100% - ${drawerWidth/4}px)`,
        },


    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },


}));





export function ShowUserList(){
    const classes = useStyles();

           return (
                <div className={classes.content}>
                    <ResponsiveDrawer/>
                    <Users/>

                </div>
           )

 }
 export function ShowUserArchieves(){
     const classes = useStyles();

           return (
                <div className={classes.content}>
                    <ResponsiveDrawer/>
                    <UsersArchive/>

                </div>
           )

 }
 export function ShowCategories(){
     const classes = useStyles();

           return (
                <div className={classes.content}>
                    <ResponsiveDrawer/>
                    <SkillList/>

                </div>
           )

 }
export function ShowStatistics(){
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <ResponsiveDrawer/>
            <Statics/>

        </div>
    )

}
export function ShowIcons(){
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <ResponsiveDrawer/>
            <Icons/>

        </div>
    )

}
export function ShowSubscriptions(){
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <ResponsiveDrawer/>
            <Subscribe/>

        </div>
    )

}
