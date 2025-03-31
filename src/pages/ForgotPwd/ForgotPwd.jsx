/* eslint-disable no-unused-vars */
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import {auth} from "..//..//common/firebase"
import { toast } from "react-toastify";

const ForgotPwd = () => {
  const [email, setEmail] = useState("");
  const[emailIsInvalid, setEmailIsInvalid] = useState(false) // state for email validation


  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailIsValid = email.includes("@gmail.com") || email.includes("@yahoo.com") ||email == ""

    if(!emailIsValid){
        setEmailIsInvalid(true)
        return;
    }

    sendPasswordResetEmail(auth , email).then(data=>{
      toast.info("Check your mail")
    }).catch(err =>{
      alert(err.message)
    })
  };
  return (
    <div>
      <div className="sm:w-[600px] px-10 w-full h-[90dvh] mx-auto py-20">
        <h1 className="text-[25px] sm:text-[30px] font-medium mb-2">
          Forgot password?
        </h1>
        <p className="text-slate-500 mb-5 sm:text-[17px] text-[14px]">
          Enter your email below and submit. An email will be sent to you with
          instructions about how to complete the process
        </p>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 mb-5">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder="Enter your email address"
                className="border bg-slate-100 rounded-md px-4 py-3"
              />
              <div className="text-red-400">
                  {emailIsInvalid && <p>Please enter a valid email address</p>}
              </div>
            </div>

            <div className="flex items-center justify-start text-blue-400">
              <Link to="/login">Remember Password?</Link>
            </div>
            <button className="text-white bg-blue-400 py-3 rounded-md w-full mt-6">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPwd;
