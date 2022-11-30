import React from 'react';
import './App.css';
import PluginRoot from "./PluginRoot";
import TicTacToe from './TicTacToe';

function App() {
  if (window.location.search === "?tic-tac-toe") {
    return <TicTacToe />
  } else if  (window.location.search === "") {
    return <PluginRoot />
  } else {
    return null;
  }
}

export default App;
