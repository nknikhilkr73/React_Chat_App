import React, { useState } from "react";
import Add from "../img/addd.png"
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage} from "../firebase"
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const [err, setErr]=useState(false)
    const navigate = useNavigate()

const handleSubmit = async (e)=>{
   e.preventDefault();
   console.log(e.target[0].value);
   console.log(e.target[1].value);
   console.log(e.target[2].value);

   const displayName=e.target[0].value;
   const email=e.target[1].value;
   const password=e.target[2].value;
   const file=e.target[3].files[0];

try{


  const res= await createUserWithEmailAndPassword(auth, email, password)

  console.log(res.user);


//   const storage = getStorage();
  const storageRef = ref(storage, displayName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:

  uploadTask.on("state_changed",
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  },
    (error) => {
    setErr(true)
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
        await updateProfile(res.user,{
            displayName,
            photoURL:downloadURL
        })
       
        await setDoc(doc(db, "users" , res.user.uid) ,{
          uid: res.user.uid,
          displayName,
          email,
          photoURL:downloadURL
        })
       
 const  userId=res.user.uid

        await setDoc(doc (db , "userChats" , userId ) ,{
        });

        navigate("/");
      })
    }
  );


}catch(err){
  console.log(err);
    setErr(true)
}
}

    return (
        <div className="formContainer">
        <div className="formWrapper">
        <span className="logo"> CHAT</span>
        <span className="title"> Register</span>
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder="display name"></input>
                <input type="email" placeholder="email"></input>
                <input type="password" placeholder="password"></input>
                <input style={{display:"none"}} type="file" id="file"></input>
                <label htmlFor="file">
                <img src={Add} alt="Photos">
               </img>
               <span>Add an avatar</span></label>
                <button>Sign up</button>
                {err && <span>Something went wrong</span>}
            </form>

            <p> You do have an account ? <Link to="/login"> Login  </Link></p>
        </div>
        </div>
    )
}

export default Register