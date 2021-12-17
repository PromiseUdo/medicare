import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DoctorContextProvider from './store/doctor/DoctorStore'
import PatientContextProvider from './store/patient/PatientStore'
import AuthContextProvider from './store/auth/AuthStore'
import ChatContextProvider from './store/chats/ChatStore'

ReactDOM.render(
  <AuthContextProvider>
  <DoctorContextProvider>
  <PatientContextProvider>
  <ChatContextProvider>
    <App />
  </ChatContextProvider>
  </PatientContextProvider>
  </DoctorContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
