import React from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import Collapse from '@material-ui/core/Collapse/index';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import '../styles/skillListStyle.css';
import changeIcon from '../images/changeIcon.png';
import CheckboxList from './subcgt';
import {useState, useEffect} from 'react';
import Popup from "reactjs-popup";
import {getActiveCategories} from '../firebase/fireManager';
import {editCategorie}  from '../firebase/fireManager';
import add from '../images/add.png';
import {db} from '../firebase/firebase';
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
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
    const [addObj,addObj2]= useState({});
    const [newName,addSubCategory]= useState();
    const [newIcon_class,addIconName]= useState();
    const [newStatus_new,addStatus]= useState();
    const [name,setName]= useState([]);
    const [icon_class,setIcon]= useState([]);
    const [status,setStatus]= useState();
    const [obj,setObj1]= useState({});


    const categoryChange = catId => (e) =>{
        console.log(catId)
        editCategorie(catId, obj)
        console.log(obj)    ;
        setName('');
        setIcon('');
        setStatus('');

    }

    const getNewIconName  = (e)=>{
        setIcon(e.target.value)
        setObj1({
            ...obj,
            icon_class: e.target.value
        })

    }
    const getNewCtgName=(e)=>{
        setName(e.target.value)
        setObj1({
            ...obj,
            name: e.target.value
        })
            };


    const  check = (e) => {
        setStatus(e.target.checked)
        setObj1({
            ...addObj,
            status: e.target.checked
            ,
        })

    };





    //*****************
    const getSubCategory = (event) => {
        addSubCategory(event.target.value)
        addObj2({
            ...addObj,
            name: event.target.value
        })};

    const getIconName = (event) => {
        addIconName(event.target.value)
        addObj2({
            ...addObj,
            icon_class: event.target.value
        })};

    const getNewStatus = (event) => {
        addStatus(event.target.checked)
        addObj2({
            ...addObj,
            status: event.target.checked,
        })};
    const handleSubmit = (e)=>{
        if(e.keyCode === 13) {
            console.log(addObj)
            db.collection('Categories').add(addObj).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id)
                addIconName('');
                addStatus('');
                addSubCategory('');
            })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        }
    }


    const addToDB = ()=> {
        db.collection('Categories').add(addObj).then(function(docRef) {
            addIconName('');
            addStatus('');
            addSubCategory('');
        })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

    }
            //*******************************category change







    const handleClick = catId =>()=> {




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
            }
        );

    }, [name,status,icon_class,obj]);

    return (<>
    <h1 className="title">Categories</h1>

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
                                    <CheckboxList catId={value.id} />
                                </List>
                                <form>
                                    <input className='ctgchangeInput1'
                                           value = {value.name? name: ''}
                                           placeholder=" Changed Name.."
                                           onChange={getNewCtgName}
                                    />
                                    <input className='ctgchangeInput3'
                                           value = {value.icon_class?icon_class:''}
                                           placeholder=" IconName.."
                                           onChange={getNewIconName}
                                    />

                                    <input
                                        defaultChecked={value.status}
                                        type = 'checkbox'
                                        className="ctgchangeInput2"

                                        value = {String(value.status)?status: ''}
                                         onChange={check}
                                    />
                                    <font size="2"  className="ctgchangeinput2"> Show</font>




                                    <img src={changeIcon}
                                         alt="changeIcon"
                                         className="changeIcon"
                                         title="UpdateCategory"
                                         onClick={categoryChange(value.id)}
                                    />
                                </form>
                            </Collapse>

                        </List>
                    )

                }
            )
            }
                            <form onKeyDown={handleSubmit} >
                    <div className="div2">


                        <input className='ctgInp1'
                               value = {newName?newName:''}
                               placeholder="new Category.."
                               onChange={getSubCategory}
                        />
                        <input className='ctgInp2'
                               value = {newIcon_class?newIcon_class:''}
                               placeholder="IconName.."
                               onChange={getIconName}
                        />

                        <input
                            defaultChecked={newStatus_new}
                            type = 'checkbox'
                            className="ctgInp3"

                            value = {newStatus_new ? newStatus_new :''}
                            onClick={getNewStatus}
                        />
                        <font size="2"  className="ctginp3"> Show</font>


                        <img src={add}
                             alt="add"
                             className="add"
                             title="AddNewCategory"
                             onClick={addToDB}
                        />
                    </div>
                            </form>
    </div>

        </>
    );

}
export default SkillList;
