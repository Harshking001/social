import React from 'react'
import { useNavigate } from 'react-router-dom'
const NotFoundPage = () => {

    const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=>navigate("/social/")}>Go Back</button>
    </div>
  )
}

export default NotFoundPage
