import React from 'react'
import {getActiveUsers} from '../firebase/fireManager'
import {db} from "../firebase/firebase";




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
                         <td> {item.status+''}</td>
                        <td ><button id={item.id} type='button' onClick={this.archive_user}>Archive</button> </td>
                     </tr>
                    
                 )
              })

        } 
        
        
        return(
            <div> 
           
           <table id="customers">
                  <tbody>
                <tr>
                       <th>Numbering</th>
                       <th>First Name</th>
                       <th>Last Name</th>
                       <th>Email</th>
                       <th>Status</th>
                       <th>Permission</th>
                   </tr>
                    {list_user}
                    </tbody>
               </table>
                    
                
                 </div>
        )
    }

}
export default Users;