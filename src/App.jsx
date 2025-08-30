import { useState } from 'react'
import './index.css'
import Navbar from './navbar.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Body from './body.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
    <BrowserRouter basename='/'>
      <Routes>
         <Route path="/" element={<Body/>}>
          <Route path="/login" element={<div>login page</div>}></Route>
          <Route path="/profile" element={<div>profile page</div>}></Route>
         </Route>
        
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
