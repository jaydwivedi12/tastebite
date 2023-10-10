import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { ToastContainer} from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
   <Provider store={store}>
   <App/>
      <ToastContainer />
   </Provider>
     
  </BrowserRouter>
 

);
 