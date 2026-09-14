import React, { useEffect } from 'react'
import LoginPage from "./pages/LoginPage/LoginPage"
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Homepage from './pages/Homepage/Homepage'
// import StoriesPage from './pages/StoriesPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

const App = () => {
  // const navigate = useNavigate();

  // useEffect(()=>{
  //    function ifLoggedIn(){
  //         if(!localStorage.getItem('username')){
  //             navigate("/login")
  //         }
  //     }
  // ifLoggedIn()
  // },[])

  return (
    <Routes>
      <Route path="/" element={<Navbar />} >
        <Route path="/profile" element={<ProfilePage />} />
        <Route exact path="/" element={<Homepage />} />
      </Route>
      {/* <Route path="/stories/:story" element={<StoriesPage />} /> */}
      <Route  path="/login" element={<LoginPage />} />
      {/* <Route path="*"element={<NotFoundPage />} /> */}
    </Routes>
  )
}

export default App
