import React from 'react';
import './styles/App.css';
import Login from './components/login';
import ResponsiveDrawer from './drawer';
import Users from './Users/userslist'
//import UsersArchive from '../src/Users/archiveusers'




class  App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sign: true

        }
    }

        signIn = (e) => {
            this.setState({
                sign: e
            })
        }

        render(){
            return (
                <div className='App'>
                    {!this.state.sign ? <Login signIn={this.signIn}/> : <>
                    {/* <UsersArchive/>   */}
                        <Users/>
                        <ResponsiveDrawer/>
                    </>}
                </div>
            )

        }



}


export default App;