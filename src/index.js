import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "vazir-font/dist/font-face.css";
import "./index.css";
//import "@popperjs/core/dist/esm/popper.js";
import "bootstrap/dist/js/bootstrap.min.js";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
