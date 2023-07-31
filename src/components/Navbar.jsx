import React, { useContext } from "react";
import download from "../img/download.png"
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {

    const {currentUser}=useContext(AuthContext);

    return (
        <div className="navbar">
        <span className="logo"> CHAT </span>
        <div className="user">
        <div className="image">
            <img src={currentUser.photoURL} alt=""></img>
            </div>
            <span>{currentUser.displayName} </span>
            <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
          </div>
    )
}

export default Navbar