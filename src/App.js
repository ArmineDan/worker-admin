import React from 'react';
import './styles/App.css';
import Login from './components/login';



class  App extends React.Component{
constructor(props){
  super(props)
  this.state ={
        sign: false

   }
}


  SignIn = (e) => {
    this.setState({
      sign: e
    } )
  }

  render(){
    return(
        <div className={App}>
          {!this.state.sign ? <Login signIn={this.SignIn} />: <h1> hello</h1> }
          </div>
            );

          };
          };





export default App;
