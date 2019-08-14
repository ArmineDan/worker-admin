import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemIcon from '@material-ui/core/ListItemIcon/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import '../styles/skillListStyle.css';
import {getsubCategories} from "../firebase/fireManager";
import deleteIcon from '../images/deleteIcon.png'
import addIcon from '../images/addIcon.png';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette,
    },
}));

export default function CheckboxList(props) {
    const classes = useStyles();
    const {catId}= props;
    const[subData,setSubData] = useState([]);
    const[loading,setLoading]= useState(false);
    const [checked, setChecked] = React.useState([]);

    const handleToggle = value => () => {debugger;
        const currentIndex = checked.indexOf(value.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value.id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        console.log(newChecked)
    };

    useEffect(()=> {
        getsubCategories(catId).then(subData => {
            setSubData(subData);
            setLoading(true);
            //console.log(subData);
        });

    },[]);


    return (
        <List className={classes.root} style={{display:loading?'block':'none'}} >
            {subData.map(value => {
                let itemId = value.id;
                let item = value.name;

                return (
                    <ListItem key={item} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                                <img src={deleteIcon} alt="deleteIcon" className="deleteIcon" title="Remove/Archive"/>

                        </ListItemIcon>
                        <ListItemText id={itemId} primary={item}/>

                    </ListItem>
                );

            })}
                <div className="div1">
            <img src={addIcon} alt="addIcon" className="addIcon" title="AddNewSubCategory" />
                    <input className='ctgInp'
                           placeholder="Type new subCategory.."
                          // onChange={e => this.updateInput("newSubCategory", e.target.value)}

                    />
                </div>
        </List>
    );
}