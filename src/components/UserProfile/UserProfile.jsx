import React, { useEffect, useState } from 'react'
import "./UserProfile.css"
import { supabase } from '../../lib/supabaseClient'
import FollowButton from '../FollowButton/FollowButton'
// import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const UserProfile = () => {

    const [aboutUser, setAboutUser] = useState('')
    const [postStories, setPostStories] = useState([])
    const { userUsername } = useParams()

    useEffect(()=>{
        async function getAboutUser(){
            const {data: aboutuser, error: gettingUserError} = await supabase
            .from("users")
            .select("aboutUser")
            .eq("username", localStorage.getItem("username"));

            if(aboutuser){
                setAboutUser(aboutuser)
                // console.log(aboutuser)
            }else{
                // console.error("error occured",gettingUserError)
            }
        }
        getAboutUser()
    },[])

    useEffect(()=>{
        async function getPostAndStories(){
        const {data: postStories} = await supabase
        .from("users")
        .select("stories ,posts")
        .eq("username", localStorage.getItem("username"))

        if(postStories){
            setPostStories(postStories)
        }
        }

        getPostAndStories()
    },[])
    
  return (
    <div id="profilePage">
        {aboutUser ? 
        <div>
            {userUsername}
            <div className="nav">
                <i className="fa-solid fa-plus"></i>
                <h2>profile</h2>
                <i className="fa-solid fa-bars-staggered"></i>
           </div>
            <div className="profile">
                <div className="profilePic" 
                style={{
                    border: postStories[0]?.stories.length < 0 ?"3px solid transparent" : "1px solid grey",
                    background: "linear-gradient(white, white) padding-box,linear-gradient(135deg, #ff00cc, #3333ff) border-box"
                }}>
                    <img src={aboutUser[0].aboutUser.profile === ""?"../social/images/noProfile.png": aboutUser[0].aboutUser.profile} alt="profile" />
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="profileInfo">
                    <h1>{aboutUser[0].aboutUser.username}</h1>
                    <p>{aboutUser[0].aboutUser.name}</p>
                    <div className="aboutProfile">
                        <p>{postStories[0]?.posts.length} posts</p>
                        <p>{aboutUser[0].aboutUser.followers.length} followers</p>
                        <p>{aboutUser[0].aboutUser.following.length} following</p>
                    </div>    
                </div>
            </div>

            <div id="aboutUser">
                <div className="aboutUser">
                    {aboutUser[0]?.aboutUser.about?.map((ab, index) => (
                    <p key={index}>{ab}</p>
                    ))}
                    <p id="addAbout">add <i className="fa-solid fa-plus"></i></p>
                </div>
            </div>
            <h2 className="h2">Suggested accounts</h2>
            <div className="suggestions">
                
            <div className="suggestionsContainer">
                <div className="suggestion">
                    <img src="./images/abt3.png" alt="profile" />
                    <h3>username</h3>
                    <p>name</p>
                    <FollowButton />
                </div>
                <div className="suggestion">
                    <img src="./images/abt3.png" alt="profile" />
                    <h3>username</h3>
                    <p>name</p>
                    <FollowButton />
                </div>
                <div className="suggestion">
                    <img src="./images/abt3.png" alt="profile" />
                    <h3>username</h3>
                    <p>name</p>
                    <FollowButton />
                </div>
            </div>
            </div>
            <div className="userPosts">
                <div className="head">
                    <div><i className="fa-mosaic fa fa-camera"></i></div>
                    <div><i class="fa-sharp fa-solid fa-retweet"></i></div>
                    <div><i class="fa-light fa fa-bookmark"></i></div>
                </div>
                <div className="postContainer"
                style={{
                        gridTemplateColumns: !postStories[0]?.posts.length === 0 ?"1fr 1fr 1fr": "1fr",
                    }}>
                    {!postStories[0]?.posts.length === 0 ?
                    <div className="post">
                        <img id="post" src="./images/abt1.png" alt="your post" />
                        <p>{postStories[0]?.posts.views.length}<i className="fa-solid fa-eye"></i></p>
                    </div>
                    :
                    <div className='noPost gradient-text'><i className="fa-mosaic fa fa-camera"></i> No posts</div>
                    }
                </div>
            </div>
        </div>
        :<div className="loaderContainer">
            <div className="loader"></div>
        </div>}
    </div>
    
  )
}

export default UserProfile
