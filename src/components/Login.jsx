/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./login.css";
import { redirect,Link } from "react-router-dom";

export default function Login() {
  // fetch("http://localhost:3000/posts/1/")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regards,setRegards]=useState(false);
  const [notValid,setNotValid]=useState(false);
  function validData(arr){
    arr.forEach(item => {
      if(item.username==username&&item.website==password){
        setRegards(true);
        localStorage.setItem('currentUser', JSON.stringify(item));
        window.location.pathname=`/users/${item.id}`;
      }
    });
    if(localStorage.getItem('currentUser')==null)
    {
      setNotValid(true)
    }

  }
  function checkPassward(){
    console.log("pass:"+ password+"/nname:"+username);
    fetch("http://localhost:3000/users/")
      .then((res) => res.json())
      .then((data) => validData(data));
  }

  return (
    <>
      <div id="form">
        <h3>Login here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter your user name"
          id="username"
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
        />

        <button onClick={checkPassward}>Log In</button><br /> <br /> <br /> 
        <Link to="/register">don't have an account?</Link>     
        {regards && <h1>welcome</h1>}
        {notValid && <h3>Invalid username or password</h3>}
      </div>
    </>
  );
}
