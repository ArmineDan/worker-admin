import React from 'react'
import {getActiveUsers} from '../src/firebase/fireManager'
import {getArchiveUsers} from '../src/firebase/fireManager'
import {getSubscribedUsers} from '../src/firebase/fireManager'
import {faMale} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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
            <div> 
                
            </div>
        )
    }
}  
export default Statics;