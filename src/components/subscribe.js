import React from 'react'
import {getSubscribedUsers} from '../firebase/fireManager'
import {db} from "../firebase/firebase";
import "../styles/App.css";
import list from '../images/list.png';
import sendIcon from '../images/sendIcon.svg';


class Subscribe extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            message: ''

        }


    }
    handleSubmit = (e)=>{
    if(e.keyCode === 13) {



        this.setState({
            message: ''
        })
        console.log(this.state.message)
        e.preventDefault()

    }
    }

    handleClick=(e) =>{

        console.log(this.state.message)
        this.setState({
            message: ''
        })
    }
    handleChange= (e) =>{
        this.setState({
            message: e.target.value
        })
    };

    componentDidMount() {

        getSubscribedUsers().then(data => {
            this.setState({list: data})
        })
    }


    render() {


        let list_user = '';
        if (this.state.list) {
            list_user = this.state.list.map((item, index) => {
                return (

                    <tr key={index} id='customers'>
                        <td>{++index}</td>
                        <td > Email: {item.email}</td>
                    </tr>

                )
            })

        }


        return (
            <div className="dv">
                <div className="listDiv">


                    <table id="customers">
                        <tbody>
                        <tr>
                            <th><img src={list} alt='list' className='list'/></th>
                            <th>Email</th>
                        </tr>
                        {list_user}
                        </tbody>
                    </table>


                </div>
                <form onKeyDown={this.handleSubmit }>

                <div className="inputDiv">
                    <textarea
                        value={this.state.message}
                        placeholder="Type message for all subscribed users.. "
                        className="sendInp"
                        type="text"
                        onChange={this.handleChange}
                        rows="10" />
                    <img
                        title="Send"
                        src={sendIcon}
                         alt="sendIcon"
                         className="sendIcon"
                         onClick={this.handleClick}
                    />
                </div>
                </form>
            </div>
        )
    }

}
export default Subscribe;