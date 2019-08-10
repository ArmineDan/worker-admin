import React from 'react'
import {getActiveUsers} from '../src/firebase/fireManager'
import './styles/App.css'


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
                        <td id='b'><button type='button'  >Archive</button> </td>
                     </tr>
                 )
              })

        }
        
    
        
        return(
            <div> 
           
                 <table id="customers">
                 <tr >
                        <th>Numbering</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Permission</th>
                    </tr>
                     <tbody>
                     {list_user}

                     </tbody>
                </table> 
        
                    
                
                 </div>
        )
    }

}


export default Users;