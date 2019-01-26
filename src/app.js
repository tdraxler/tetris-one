import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize-css/normalize.css';
import './styles/styles.scss'

console.log("The app is running...");

const AppGateway = () => {
  return (
    <div>
      <h1>Tetris Experiment 1</h1>
      <p>...</p>
      <div id="tetris-view"></div>
    </div>
  );
};

ReactDOM.render(<AppGateway/>, document.getElementById('app'));