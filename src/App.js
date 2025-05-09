// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';

const App = () => {

  return (
    <>
      <Sidebar/>
      <Main/>
    </>
  );
}

export default App;
