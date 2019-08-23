import React from 'react'
import {getActiveUsers} from '../firebase/fireManager'
import {db} from "../firebase/firebase";
import "../styles/App.css";
import archive from '../images/archive.png';
import list from '../images/list.png'
import '../styles/search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons';





class Users extends React.Component{
    constructor(){
        super();
        this.state={
            list: [],
            search: ''
            }


    };

    componentDidMount(){

        getActiveUsers().then(data=>{
            this.setState({list: data})
        }) }

    archive_user=(e)=>{
        db.collection('users').doc(e.target.id).update({'status':false}).then(()=>{
            getActiveUsers().then(data=>{
                this.setState({list: data})
            })
        }).catch((e)=>console.log)

    }
    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)})
    }
delet(){
this.setState({search: ''})
}

    render(){
     let filteredName=this.state.list.filter(
         (item)=>{
             return item.firstName.indexOf(this.state.search)!==-1
         }
     )
        let list_user='';
        if(this.state.list ){
            list_user =filteredName.map((item,index)=>{
                return(

                    <tr key={index} id='customers'>
                        <td>{++index}</td>
                        <td> First Name : {item.firstName}</td>
                        <td> Last Name : {item.lastName}</td>
                        <td> Email: {item.email}</td>
                        <td ><img src={archive} id={item.id} alt="archive" className="archive" title="ArchiveUser"  onClick={this.archive_user}/></td>
                    </tr>

                )
            })

        }


        return(
            <div> <h1 className="title">Users</h1>
                <input id='in'
                    type='text'
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
                    placeholder='Search...'/>  
                    <button  id='bu' type='button' onClick={this.delet.bind(this)}><FontAwesomeIcon icon={faTimes} style={{color: 'orange'}}  /></button>
                <table id="customers">                
                    <tbody>                        
                    <tr>
                        <th><img src={list} alt='list' className='list'/></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th className='preStyle'>Permission</th>
                        
                    </tr>
                   
                    
                    {list_user}
                    
                    </tbody>
                    
                    
                </table>
                
             
            </div>
        )
    }

}
export default Users;