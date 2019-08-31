import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import '../styles/skillListStyle.css';
import Popup from "reactjs-popup";
import iconslistIcon from '../images/iconslistIcon.png';
import {getsubCategories} from "../firebase/fireManager";
import acceptIcon from '../images/acceptIcon.png'
import addIcon from '../images/addIcon.png';
import editIcon from '../images/editIcon.png';
import {editSubCategorie}from '../firebase/fireManager'
import {db} from "../firebase/firebase";
import Icons from './icons list';
import clouseIcon from '../images/clouseIcon.png';
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette,
    },
}));

export default function CheckboxList(props) {

    const classes = useStyles();
    const {catId}= props;
    const[subData,setSubData] = useState([]);
    const[loading,setLoading]= useState(false);
    //const [checked, setChecked] = React.useState([]);
  //  const [inp, setInp] = React.useState();
    const [edit, editCategory] = React.useState();
    const [obj,setObj1]= useState({});
    const [name,setName]= useState();
    const [icon_class,setIconClass]= useState();
    const [status_new,setStatus]= useState('');
//    ********************************** add new SubCategory
    const [addObj,addObj2]= useState({});
    const [newName,addSubCategory]= useState();
    const [newIcon_class,addIconName]= useState();
    const [newStatus_new,addStatus]= useState();

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
        })
    };

    const getNewStatus = (event) => {
        addStatus(event.target.checked)
        addObj2({
            ...addObj,
            status: event.target.checked,
        })};


    const addToDB = ()=> {
        console.log(addObj)
        db.collection('Categories').doc(catId).collection('sub').add(addObj).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id)
            addIconName('');
            addStatus('');
            addSubCategory('');

        })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

    }





//    ********************************** edit  SubCategory




    const getName=(e)=>{
        setName(e.target.value)
        setObj1({
            ...obj,
            name: e.target.value
        })};
        const getIcon=(e)=>{
            setIconClass(e.target.value)
        setObj1({
            ...obj,
            icon_class: e.target.value
        })};
        const getStatus=(e)=>{
            setStatus(e.target.checked)
            setObj1({
                ...obj,
                status: e.target.checked
            })

        };


    const edtCat = (e)=>{
        const index=e.currentTarget.getAttribute('data-id');
        console.log(index,'eeeeeeeee')
        editCategory(e.target.id)
       setName(subData[index].name)
         setIconClass(subData[index].icon_class)
       setStatus(String(subData[index].status))


    }

    const acceptCat = (e) =>{
        console.log(catId)
        editSubCategorie(catId, e.target.id, obj)
        editCategory(!e.target.id)
    }

    const Show = () => {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }



    useEffect(()=> {


    getsubCategories(catId).then(subData => {
            setSubData(subData);

            setLoading(true);

        });
    },[status_new,icon_class,name,obj]);


    return (
        <List className={classes.root} style={{display:loading?'block':'none'}} >
            {subData.map((value,index )=> {
                let itemId = value.id;
                let item = value.name;
                let status = value.status;
                let icons = value['icon_class']

                return (
                    //onClick={handleToggle(value)} ****listitem
                    <ListItem key={item} role={undefined} dense button >
                        ​

                        { edit !== itemId ? <>
                            <ListItemText id={itemId} primary={item}/>
                        <div className="IconsStyle"><ListItemText id={itemId} primary={icons}/></div>
                        <div className="StatusStyle"> < ListItemText  id = {itemId} primary={String(status)==='true'? 'Show': 'Hidden'} /> </div>

                        <img src={editIcon}
                             id={itemId}
                             data-id={index}
                             alt="editIcon"
                             className="editIcon"
                             title="EditSubCategory"
                             onClick={edtCat}
                        />
                        </>:edit===itemId ? <>

                        <input className="chackInp1"
                               value = {name}
                               onChange={getName}
                        />
                   <input
                           className="chackInp3"
                            value = {icon_class}
                            onChange={getIcon}
                        />
                        <div className="popup" >

                        <button className="iconslistIcon"
                                title="showIcons"
                                onClick={Show} > Icons </button>



                            <div className="popuptext" id="myPopup">
                                <img src={clouseIcon}
                                     alt="clouseIcon"
                                     className="clouseIcon"
                                     title="close"
                                     onClick={Show}
                                />
                                <Icons/> </div>
                        </div>

                <input
                            defaultChecked={status_new}
                            type = 'checkbox'
                            className="chackinp2"

                            value = {status_new}
                            onClick={getStatus}
                        />



                        <font size="2"  className="chackInp2"> Show</font>
                        <img src={acceptIcon}
                             id={itemId}
                             alt="editIcon"
                             className="editIcon"
                             title="AcceptEdit"
                             onClick={acceptCat}
                        />

                        </>: null
                        }




                    </ListItem>
                );

            })}
                <div className="div1">


                           <input className='subInp1'
                                  value = {newName?newName:''}
                                  placeholder=" new SubCategory.."
                                  onChange={getSubCategory}
                    />
                    <input className='subInp2'
                                  value = {newIcon_class?newIcon_class:''}
                                  placeholder="  IconName.."
                                  onChange={getIconName}
                    />

                    <input
                        defaultChecked={status_new}
                        type = 'checkbox'
                        className="subinp3"

                        value = {newStatus_new?newStatus_new:''}
                        onClick={getNewStatus}
                    />
                    <font size="2"  className="subInp3"> Show</font>
                    <img src={addIcon}
                         id={props.catId}
                         alt="addIcon"
                         className="addIcon"
                         title="AddNewSubCategory"
                         onClick={addToDB}
                    />

                </div>

        </List>
    );
}