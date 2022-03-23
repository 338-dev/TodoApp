import React,{useEffect} from 'react';
import firebase from './Server/firebase';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Mainauth from './components/auth/MainAuth/MainAuth.component'
import { Provider } from 'react-redux';
import store from './store';
import Name from './components/name/Name.component';

const Index = () => {
  var auth=firebase.auth();
  const navigate = useNavigate();


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
          navigate("/name")
      }
      else{
        navigate("/auth")
      }
    })
    
  }, [])
  
  return(
    
      <Routes>
          <Route path="/name" element={<Name />}/>
          <Route path="/:docrefId" element={<App />}/>
          <Route path="/auth" element={<Mainauth />}/>
      </Routes>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
    <Index/>
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
