import { Link } from "react-router-dom";
import { IconEye, IconEyeInvisible } from "../../assets/icons/icons";
import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../common/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false);//state for password visibility
  const[emailIsInvalid, setEmailIsInvalid] = useState(false) // state for email validation
  const[pwdIsInvalid, setPwdIsInvalid] = useState(false) //state for password validation
  //state for input values
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const password = useRef();// ref to toggle pwd visibility

  function DisplayPassword() {
    if (password.current.type == "password") {
      password.current.type = "text";
      setIsVisible(true);
    } else {
      password.current.type = "password";
      setIsVisible(false);
    }
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    //validating input
    const emailIsValid = email.includes("@gmail.com") || email.includes("@yahoo.com") || email == ""
    const pwdIsValid = pwd.length >= 8;
    

    if(!emailIsValid){
      setEmailIsInvalid(true)
      return;
    }
    else if(!pwdIsValid){
      setPwdIsInvalid(true)
      return
    }
    try {
      await signInWithEmailAndPassword(auth,email , pwd )
      // window.location.href = "/profile"
      toast.success("Login Successful",{
        position: "top-center"
      })
      navigate("/profile")

      //clear form field and error
      setPwdIsInvalid(false)
      setEmailIsInvalid(false)
      setEmail("")
      setPwd("")
      setIsVisible(false)
    } catch (error) {
      toast.error(error.message,{
        position: "top-center",
      })
    }
  }
  return (
    <motion.div
      initial={{x:'100vw'}}
      animate={{x: 0}}
      transition={{type: "spring", delay: .5}}
      className=" ">
      <div className="sm:w-[600px] px-10 w-full  mx-auto py-20">
        <h1 className="text-[25px] sm:text-[30px] font-medium mb-2">
          Welcome back
        </h1>
        <p className="text-slate-500 mb-5 sm:text-[17px] text-[14px]">
          Login to continue learning
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
                required
                placeholder="Enter your email address"
                className="border bg-slate-100 rounded-md px-4 py-3"
              />
              <div className="text-red-400">
                  {emailIsInvalid && <p>Please enter a valid email address</p>}
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-5">
              <label htmlFor="password">Password*</label>
              <div className="relative">
                <input
                  type="password"
                  ref={password}
                  name="password"
                  id="password"
                  value={pwd}
                  required
                  onChange={(e)=>{setPwd(e.target.value)}}
                  placeholder="Enter your password"
                  className="border w-full bg-slate-100 rounded-md px-4 py-3"
                />
                <div className="text-red-400">
                  {pwdIsInvalid && <p>password must not be less than 8 characters</p>}
                </div>
                <div
                  className="absolute top-4 text-[20px] right-6 cursor-pointer"
                  onClick={DisplayPassword}
                >
                  {isVisible ? <IconEyeInvisible /> : <IconEye />}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end text-blue-400 underline">
              <Link to="/forget-password">Forget Password?</Link>
            </div>
            <button className="text-white bg-blue-500 py-3 rounded-md w-full mt-6">
              Login
            </button>
          </form>
        </div>
        <h2 className="text-center mt-7">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </h2>
      </div>
    </motion.div>
  );
};

export default Login;
