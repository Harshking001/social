import React, { useEffect, useState } from 'react'
import './LoginForms.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { supabase } from '../../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
const LoginForms = () => {
    const [toggleLoginForm, setToggleLoginForm] = useState(false)
    const [loginError, setLoginError] = useState('')
    const [registerData, setRegisterData] = useState({
  "username": "",
  "password": "",
  "name": "",
  "profile": "",
  "phone": "",
  "email": ""
})

    const [loginData, setLoginData] = useState({
        "username": "",
        "password": "",
    })

    const navigate = useNavigate()

    useGSAP(()=>{
        gsap.from('.loginError',{
            opacity: 0,
            top: -100,
            ease: 'bounce'
        })
    },[loginError])

    useGSAP(()=>{
        gsap.from('.form',{
            opacity: 0,
            yPercent: 100,
            ease: 'expo'
        })
    },[toggleLoginForm])

    function ToggleForms() {
        if(toggleLoginForm){
            setToggleLoginForm(false)
        }else{setToggleLoginForm(true)}

        // document.querySelector('input').value = ''
    }

    async function registerUser() {
    if (
        registerData.username === "" ||
        registerData.name === "" ||
        registerData.password === "" ||
        registerData.phone === ""
    ) {
        setLoginError("Please fill all the fields");
        return;
    }

    // Check if username already exists
    const { data: checkUser, error: checkError } = await supabase
        .from("users")
        .select("username")
        .eq("username", registerData.username);

    if (checkError) {
        setLoginError("Unexpected error, please try again");
        return;
    }

    if (checkUser.length > 0) {
        setLoginError("Username taken");
        return;
    }

    // Username is available, insert user
    const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert({
            username: registerData.username,
            userInfo: registerData,
            aboutUser: {
                "username": registerData.username,
                "name": registerData.name,
                "profile": "",
                "isPrivate": false,
                "following": [],
                "followers": []
            },
        })
        .select()
        .single();

    if (insertError) {
        console.error(insertError);
        setLoginError("Unexpected error while trying to register you, try again");
        return;
    }

    // Registration successful
    localStorage.setItem("username", registerData.username);
    navigate("/social/profile");
}


    async function loginUser() {

        if(loginData.password === "" || loginData === ""){
            setLoginError("Please fill all fields")
        }else{
            const {data: user, error: userError} = await supabase
            .from("users")
            .select("*")
            .eq("username", loginData.username)
            .maybeSingle()

            if(user){
                if(user.userInfo.password===loginData.password){
                    console.log("Logged in successfully")
                    localStorage.setItem("username", loginData.username)
                    navigate("/social/profile")
                }else{
                    setLoginError("Incorrect password")
                }
            }
            else{
                setLoginError("Username does not exist",userError)
            }
        }
        
    }

  return (
    <div id="container">
        <div className="loginError" style={{display: loginError.length > 0 ? "flex" : "none"}}>
            {loginError.length > 0 ? loginError: ''}
        </div>
      {toggleLoginForm ?
        <div className="loginForm form"  onSubmit={(event)=>event.preventDefault()}>
        <h1>Welcome Back</h1>
        <div className="username" id="input">
            <div>Username</div>
            <input type="text" placeholder="Username" onChange={(e)=>{setLoginData({...loginData,"username":e.target.value})}}/>
        </div>

        <div className="password" id="input">
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={(e)=>{setLoginData({...loginData,"password":e.target.value})}}/>
        </div>
       
        <button className='loginButton' onClick={loginUser}>Login</button>
        <p>Don't have an account <span onClick={ToggleForms}>Register</span></p>
      </div>
:
      <div className="registerForm form" onSubmit={(event)=>event.preventDefault()}>
        <h1>Create an account</h1>
        <div className="username" id="input">
            <label>Username</label>
            <input type="text" placeholder="Username"onChange={(e)=>{setRegisterData({...registerData,"username":e.target.value})}} />
        </div>
        
        <div className="name" id="input">
            <label>Name</label>
            <input type="text" placeholder="Display name" onChange={(e)=>{setRegisterData({...registerData,"name":e.target.value})}} />
        </div>
        <div className="password" id="input">
            <label>Password</label>
            <input type="password" placeholder="Create password" onChange={(e)=>{setRegisterData({...registerData,"password":e.target.value})}}/>
        </div>
        <div className="phone No." id="input">
            <label>Phone</label>
            <input type="number" placeholder="Phone No."onChange={(e)=>{setRegisterData({...registerData,"phone":e.target.value})}}/>
        </div>
       
        <button className='loginButton' onClick={registerUser}>Register</button>
        <p>Already have an account <span onClick={ToggleForms}>Login</span></p>
      </div>
}
    </div>
  )
}

export default LoginForms