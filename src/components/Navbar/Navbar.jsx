import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./Navbar.css"
const Navbar = () => {
  return (
    <div>
      <div className="navContainer">
        <nav>
          <Link className='link' to="/social/"><i className="fa-solid fa-house"></i></Link>
          <Link className='link'><i className="fa-sharp fa-solid fa-magnifying-glass"></i></Link>
          <Link className='link' id="addPostNavButton"><i className="fa-solid fa-plus"></i></Link>
          <Link className='link'><i className="bi bi-send-fill"></i></Link>
          <Link className='link' to="/social/profile"><i className="fa-solid fa-circle-user"></i></Link>
        </nav>
      </div>
      <Outlet />
    </div>
  )
}

export default Navbar
