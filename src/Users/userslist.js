import React from 'react'
import {getActiveUsers} from '../firebase/fireManager'
import {db} from "../firebase/firebase";
import "../styles/App.css";
import archive from '../images/archive.png';
import list from '../images/list.png'




class Users extends React.Component{
    constructor(){
        super();
        this.state={
            list: []    }


    }

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


    render(){



        let list_user='';
        if(this.state.list ){
            list_user =this.state.list.map((item,index)=>{
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
            <div>


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