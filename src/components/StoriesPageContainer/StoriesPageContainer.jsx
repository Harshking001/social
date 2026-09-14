import React from 'react'
import "./StoriesPageContainer.css"
import { Link, useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const StoriesPageContainer = () => {

    const { story } = useParams()
    useGSAP(()=>{
        gsap.from(".story", {
            opacity: 0,
            y: 300,
        })
    },[])
  return (
    <div>
        <Link to="/social/" id="link"><i className="bi bi-arrow-left-circle-fill"></i></Link>
        <div className="container">
            { story }
             <div className="story">
                <div className="profile">
                    <img src="/social/images/abt3.png" alt="profile" id="profile"/>
                    <div>
                        <h4>username</h4>
                        <p>name</p>
                    </div>
                </div>
                <img src="/social/images/abt4.png" alt="story" />
                <div className="storyReactions">
                    <input type="text" placeholder="Comment to story" />
                    <i className="bi bi-send-fill"></i>
                    <i className="bi bi-heart"></i>
                </div>
             </div>
        </div>
    </div>
  )
}

export default StoriesPageContainer
