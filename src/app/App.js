import React, { Component } from 'react';
import SignUpForm from '../features/SignUpForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="flex">
        <div className="container">
          <h1>Sign Up</h1>
          <SignUpForm />
        </div>
      </div>
    );
  }
}

export default App;
