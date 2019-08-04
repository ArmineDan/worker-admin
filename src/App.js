import React from 'react';
import './styles/App.css';
 import ResponsiveDrawer from './drawer';
import Users from '../src/userslist'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Users/>
          <ResponsiveDrawer/>   
      </header>
    </div>
  );
}

export default App;
