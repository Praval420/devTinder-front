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
            </Route>
            
          </Routes>
        </BrowserRouter>
      </Provider>
      
    </>
  )
}

export default App
