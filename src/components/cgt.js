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
    const [status,setStatus]= useState();
    const [obj,setObj1]= useState({});


    const categoryChange = catId => (e) =>{
        console.log(catId)
        editCategorie(catId, obj)
        console.log(obj)    ;
        setName('');
        setStatus('');

    }

    const getNewCtgName=(e)=>{
        setName(e.target.value)
        setObj1({
            ...obj,
            name: e.target.value
        })
            };

    const getNewCtgStatus=(e)=>{
        setStatus(e.target.value)
        setObj1({
            ...obj,
            status: e.target.value ==='true'?true:e.target.value ==='false'?false:false
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
        addStatus(event.target.value)
        addObj2({
            ...addObj,
            status: Boolean([event.target.value]),
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
            //*******************************category change








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
            }
        );

    }, [name,status,obj]);

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
                                           placeholder="Type changed Category's name.."
                                           onChange={getNewCtgName}
                                    />
                                    <input className='ctgchangeInput2'
                                           value = {String(value.status)?status: '' }
                                           placeholder="Type changed Status.."
                                           onChange={getNewCtgStatus}
                                    />
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
                               placeholder="Type new Category.."
                               onChange={getSubCategory}
                        />
                        <input className='ctgInp2'
                               value = {newIcon_class?newIcon_class:''}
                               placeholder="Type category IconName.."
                               onChange={getIconName}
                        />
                        <input className='ctgInp3'
                               value = {newStatus_new ? newStatus_new :''}
                               placeholder="Type category Status.."
                               onChange={getNewStatus}
                        />

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
