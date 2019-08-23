import React from 'react'
import {getActiveUsers} from '../src/firebase/fireManager'
import {getArchiveUsers} from '../src/firebase/fireManager'
import {getSubscribedUsers} from '../src/firebase/fireManager'
import '../src/styles/statics.css'



class Statics extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listActive:  [],
            listArchive: [],
            listSubscribed: [],
            activeCount: 0,
            archiveCount:0,
            subscribedCount: 0,
          

        }
    }
    componentDidMount(){

        getActiveUsers().then(data=>{
            this.setState({listActive: data})
        const listActive=this.state.listActive
        const res=listActive.length
        this.setState({activeCount: res})
        console.log(this.state.activeCount)

        
    })

    getArchiveUsers().then(data=>{
        this.setState({listArchive: data})
        const listArchive=this.state.listArchive
        const res1=listArchive.length
        this.setState({archiveCount: res1 })
        console.log(this.state.archiveCount)
    })
    getSubscribedUsers().then(data=>{
        this.setState({listSubscribed: data})
        const listSubscribed=this.state.listSubscribed
        const res3=listSubscribed.length
        this.setState({subscribedCount: res3})
        console.log(this.state.subscribedCount)
    })

} 
        

 
    render(){
        
        return(
            <div > 
                <h1 className="title">Statics</h1>
<div>               
                <div id='d1'>
                <h2>  {this.state.activeCount} </h2>
                <p>Active Users</p>
                </div>
                </div> 
<div>
                <div id='d2'>
                <h2>{this.state.archiveCount}</h2>
                <p>Archived Users</p>
                </div> 
                       </div>


 <div>
                <div id='d3'>
                <h2>{this.state.subscribedCount}</h2>
                <p>Subscriptions</p>
                </div>
                </div>
            </div>
        )
    }
}  
export default Statics;