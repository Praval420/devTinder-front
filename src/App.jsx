import { useState } from 'react'
import './index.css'
import Navbar from './components/navbar.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Body from './components/body.jsx'
import Login from './components/login.jsx'
import Feed from './components/feed.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/appstore.js'
import Profile from './components/profile.jsx'
import Connections from './components/connections.jsx'
import Request from './components/requests.jsx'
import Signup from './components/signup.jsx'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react';
import Premium from './components/Premium.jsx'

function PrivacyRedirect() {
  useEffect(() => {
    window.location.href = 'https://razorpay.com/privacy-policy/';
  }, []);

  return <p>Redirecting...</p>;
}
function TermsRedirect() {
  useEffect(() => {
    window.location.href = 'https://razorpay.com/tnc/';
  }, []);

  return <p>Redirecting...</p>;
}
function ContactRedirect() {
  useEffect(() => {
    window.location.href = 'https://razorpay.com/contact/';
  }, []);

  return <p>Redirecting...</p>;
}
function RefundRedirect() {
  useEffect(() => {
    window.location.href = 'https://razorpay.com/refund-policy/';
  }, []);

  return <p>Redirecting...</p>;
}
function ShippingRedirect() {
  useEffect(() => {
    window.location.href = 'https://razorpay.com/shipping-policy/';
  }, []);

  return <p>Redirecting...</p>;
}
function App() {
  return (
    <>  
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="/" element={<Feed/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/profile" element={<Profile/>}></Route>
               <Route path="/connections" element={<Connections/>}></Route>
               <Route path="/requests" element={<Request/>}></Route>
               <Route path="/signup" element={<Signup/>}></Route>
              <Route path="/privacy" element={<PrivacyRedirect />} />
              <Route path="/terms" element={<TermsRedirect />} />
              <Route path="/contact" element={<ContactRedirect/>} />
              <Route path="/refund" element={<RefundRedirect/>} />
              <Route path="/shipping" element={<ShippingRedirect/>} />
              <Route path="/premium" element={<Premium/>} />


            </Route>
            
          </Routes>
        </BrowserRouter>
      </Provider>
      
    </>
  )
}

export default App
