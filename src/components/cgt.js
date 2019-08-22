import React from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import Collapse from '@material-ui/core/Collapse/index';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import '../styles/skillListStyle.css';
import CheckboxList from './subcgt';
import {useState, useEffect} from 'react';
import {getActiveCategories} from '../firebase/fireManager';
import add from '../images/add.png'
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function SkillList() {
    const[catData,setData] = useState([]);
    //const[subData,setSubData] = useState([]);
    const[loading,setLoading]= useState(false);
    const classes = useStyles();
    const [openIds, setOpen] = useState([]);
    const handleClick = catId =>()=> {
        console.log(catId);
        const currentIndex = openIds.indexOf(catId);
        const newOpenIds = [...openIds];
        if (currentIndex === -1) {
            newOpenIds.push(catId);
        } else {
            newOpenIds.splice(currentIndex, 1);
        }

        setOpen(newOpenIds);
    };
    useEffect(() => {
        // code to run on component mount
        getActiveCategories().then(data => {
                setData(data);
                setLoading(true);
            },[]
        );

    }, );

    return (<>

    <div className='skillDiv' style={{display:loading?'block':'none'}}>
        { catData.map(value => {
                    return (
                        <List key  = {value.id}
                              component="nav"
                              aria-labelledby="nested-list-subheader"
                              className={classes.root}
                        >
                            <ListItem key = {value.id} onClick={handleClick(value.id)}>
                                <ListItemText primary={value.name}/>
                                {openIds.indexOf(value.id) !== -1 ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Collapse in={openIds.indexOf(value.id) !== -1} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <CheckboxList catId={value.id}/>
                                </List>
                            </Collapse>

                        </List>
                    )

                }
            )
            }
                    <div className="div2">
        <img src={add} alt="add" className="add" title="AddNewCategory" />
        <input className='subInp' placeholder="Type new Category.."/>
                    </div>
    </div>

        </>
    );

}
export default SkillList;
