import React, {useState,useEffect} from 'react';
import {fire} from '../firebase/firebase';
import SignInImage from "../images/SignInImage.png"
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import '../styles/skillListStyle.css';

const useStyles = makeStyles(theme => ({
    linkStyle: {
        fontSize: "18px!important",
        margin: "16px!important",
    },

    grow: {
        flex: 1,
        width: "100%",

    },

    row:
        {
            display: "flex",
            flexDirection: "row",
        }

}));




export default function Logout(props) {
    const logoutBtnClick =()=>{
        fire.auth().signOut().then((user) =>{
            props.logout_user(user);
            console.log(user);
            console.log('sign out')}).catch(function(error) {
            // Handle Errors here.
            //const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);

        });
    };


    const classes = useStyles();
    useEffect(()=>{},[props])
    return (


        <div className={classes.linkStyle}>
            <div className={classes.row}>
                <Link to={'/'} onClick={logoutBtnClick} title="Logout"> <img className="logOutIcon" src={SignInImage} alt="Varpet Logo"/>

         </Link>
            </div>
        </div>

    );
}