import React from 'react'
import {getArchiveUsers} from '../firebase/fireManager'


class UsersArchive extends React.Component{
    constructor(){
        super();
        this.state={
          list: []    }
    

    }
    
      componentDidMount(){
          
    getArchiveUsers().then(data=>{

        this.setState({list: data})
      
    }) }
    
   

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
                        <td><button>Archive</button></td>
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
                       <th>Permission</th>
                   </tr>
                    {list_user}
                    </tbody>
               </table>
        
                    
                
                 </div>
        )
    }

}


export default UsersArchive;