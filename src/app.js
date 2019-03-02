import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize-css/normalize.css';
import './styles/styles.scss'

console.log("The app is running...");

const AppGateway = () => {
  return (
    <div>
      <div className="title-bar">
        <h1 className="title-text">Tetris Experiment 1</h1>
      </div>
      <div id="tetris-view"></div>
    </div>
  );
};

ReactDOM.render(<AppGateway/>, document.getElementById('app'));