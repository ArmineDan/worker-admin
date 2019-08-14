import React from 'react';
import '../styles/App.css';
import {getArchiveUsers} from '../firebase/fireManager'
import {db} from '../firebase/firebase'
import active from '../images/active.png';
import list from '../images/list.png'
class UsersArchive extends React.Component{
    constructor(){
        super();
        this.state={
            list: []    }


    }

    componentDidMount(){

        getArchiveUsers().then(data=>{

            this.setState({list: data})
            console.log(data)

        }) }
    goactive_user=(e)=>{
        db.collection('users').doc(e.target.id).update({'status':true}).then(()=>{
            getArchiveUsers().then(data=>{
                this.setState({list: data})
            })
        }).catch((e)=>console.log)

    }


    render(){


        let list_user='';
        if(this.state.list ){
            list_user =this.state.list.map((item,index)=>{
                return(

                    <tr key={index} >
                        <td>{++index}</td>
                        <td> First Name : {item.firstName}</td>
                        <td> Last Name : {item.lastName}</td>
                        <td> Email: {item.email}</td>
                        <td><img src={active} id={item.id} alt="active" className="active" title="ActivityUser"  onClick={this.goactive_user}/></td>
                    </tr>

                )
            })

        }


        return(
            <div id='archive'>

                <table id="customers">
                    <tbody>
                    <tr>
                        <th><img src={list} alt='list' className='list'/></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th className="preStyle">Permission</th>
                    </tr>
                    {list_user}
                    </tbody>
                </table>



            </div>
        )
    }

}


export default UsersArchive;