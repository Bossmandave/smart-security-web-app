import { Link } from "react-router-dom";
import { IconEye, IconEyeInvisible } from "../../assets/icons/icons";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "..//..//common/firebase"
import { setDoc , doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, getDocs, query, where } from 'firebase/firestore';


const SignUp = () => {
  const navigate = useNavigate()
  const password = useRef(); //ref to togggle passowrd visibility
  const confirmPwd = useRef() //ref to togggle confrimpassowrd visibility

  const [PwdVisible, setPwdVisible] = useState(false);//state for password visibility
  const [CPwdVisible, setCPwdVisible] = useState(false);//state for confirmpassword visibility

  const[emailIsInvalid, setEmailIsInvalid] = useState(false) // state for email validation
  const[pwdIsInvalid, setPwdIsInvalid] = useState(false) //state for password validation
  const[CPwdIsInvalid, setCPwdIsInvalid] = useState(false) //state for password validation
  const [nameIsInvalid, setNameIsInvalid] = useState(false) //state for name validation
  const [codeIsInvalid, setCodeIsInvalid] = useState(false) //state for code validation

  const LOGIN_CODE = import.meta.env.VITE_array.split(',')
  const signupDate = new Date();

  //state for input values
  const [values, setvalues] = useState({
    name: "",
    email: "",
    code: "",
    password: "",
    confirmPwd: "",
  });

  function DisplayPassword() {
    if (password.current.type == "password") {
      password.current.type = "text";
      setPwdVisible(true);
      
    } else {
      password.current.type = "password";
      setPwdVisible(false);
    }
  }
  function DisplayCurrentPwd() {
    if (confirmPwd.current.type == "password") {
      confirmPwd.current.type = "text";
      setCPwdVisible(true);
    } else {
      confirmPwd.current.type = "password";
      setCPwdVisible(false);
    }
  }


  const checkIfCodeExists = async (loginCode) => {
    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("loginCode", "==", loginCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("FOO EXISTS")
        return null
      } else {
        console.log("Proceed.");
      }
    } catch (error) {
      console.error("Error checking for user: ", error);
    }
  };

  const handleSubmit = async(e)=> {
    e.preventDefault();
    //validating input
    const emailIsValid = values.email.includes("@gmail.com") || values.email.includes("@yahoo.com") ||values.email == ""
    const pwdIsValid = values.password.length >= 8;
    const nameIsValid = values.name.length >=4;
    const codeIsValid = LOGIN_CODE.includes(values.code)

   
    if(!nameIsValid){
      setNameIsInvalid(true)
      return
    }
    else if(!emailIsValid){
      setEmailIsInvalid(true)
      return;
    }
    else if(!pwdIsValid){
      setPwdIsInvalid(true)
      return
    }
    else if(values.confirmPwd !== values.password){
      setCPwdIsInvalid(true)
      return
    }
    else if(!codeIsValid){
      setCodeIsInvalid(true)
      return
    }

    if(await checkIfCodeExists(values.code) === null){
      console.log("Code have been used")
      setCodeIsInvalid(true)
      return
    }
    LOGIN_CODE.splice(LOGIN_CODE.indexOf(values.code), 1)

    try {
      await createUserWithEmailAndPassword(auth, values.email , values.password)
      const user = auth.currentUser;

      toast.success("Registration Successful",{
        position: "top-center"
      })
        //clear form fields and error
      setPwdIsInvalid(false)
      setEmailIsInvalid(false)
      setNameIsInvalid(false)
      setCodeIsInvalid(false)
      setCPwdIsInvalid(false)
      setPwdVisible(false)
      setCPwdVisible(false)

      setvalues((prev) => ({
        ...prev,
        name: "",
        email: "",
        code:"",
        password: "",
        confirmPwd:""
      }));
      //store in database
      if(user){
        navigate("/profile")
        await setDoc(doc(db, "Users", user.uid),{
          email: user.email,
          fullName: values.name,
          loginCode: values.code,
          password: values.password,
          signupDate: signupDate
        })
      }
      
    } catch (error) {
      toast.error(error.message,{
        position: "top-center",
      })
    }
  }
  //two way binding of input fields
  function handleInputChange(identifier, value) {
    setvalues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }
  const containerVariants = {
    initial:{
      opacity: 0,
      x: "100vw"
    },
    animate:{
      opacity:1,
      x: 0,
      transition:{
        delay: .5,type:"spring", stiffness: 120
      }
    }
  }

  return (
    <motion.div
    variants={containerVariants}
    initial= "initial"
    animate="animate">
      <div className="sm:w-[600px] px-10 w-full  mx-auto py-20">
        <h1 className="text-[30px] font-medium mb-2">Create an account</h1>
        <p className="text-slate-500 mb-5 sm:text-[17px] text-[14px]">
          Sign up to get started
        </p>
        <div>
          <form action="/" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 mb-5">
              <label htmlFor="name">Full name*</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Enter your full name"
                className="border bg-slate-100 rounded-md px-4 py-3"
                value={values.name}
                onChange={()=> handleInputChange("name", event.target.value)}
              />
              <div className="text-red-500">
                  {nameIsInvalid && <p>name must not be less than 4 characters</p>}
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-5">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                required
                id="email"
                placeholder="Enter your email address"
                className="border bg-slate-100 rounded-md px-4 py-3"
                value={values.email}
                onChange={()=> handleInputChange("email", event.target.value)}
              />
              <div className="text-red-400">
                  {emailIsInvalid && <p>Please enter a valid email address</p>}
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-5">
              <label htmlFor="code">LOGIN CODE*</label>
              <input
                type="text"
                name="code"
                required
                id="code"
                placeholder="Enter your given code"
                className="border bg-slate-100 rounded-md px-4 py-3"
                value={values.code}
                onChange={()=> handleInputChange("code", event.target.value)}
              />
              <div className="text-red-400">
                  {codeIsInvalid && <p>Invalid login code</p>}
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
                  required
                  placeholder="Enter your password"
                  className="border w-full bg-slate-100 rounded-md px-4 py-3"
                  value={values.password}
                  onChange={()=> handleInputChange("password", event.target.value)}
                />
                <div className="text-red-400">
                  {pwdIsInvalid && <p>password must not be less than 8 characters</p>}
                </div>
                <div
                  className="absolute top-4 text-[20px] right-6 cursor-pointer"
                  onClick={DisplayPassword}
                >
                  {PwdVisible ? <IconEyeInvisible /> : <IconEye />}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-5">
              <label htmlFor="confirmpwd">Confirm Password*</label>
              <div className="relative">
                <input
                  type="password"
                  ref={confirmPwd}
                  name="confirmpwd"
                  id="confirmpwd"
                  required
                  placeholder="Confirm your password"
                  className="border w-full bg-slate-100 rounded-md px-4 py-3"
                  value={values.confirmPwd}
                  onChange={()=> handleInputChange("confirmPwd", event.target.value)}
                />
                <div className="text-red-400">
                  {CPwdIsInvalid && <p>password must be the same</p>}
                </div>
                <div
                  className="absolute top-4 text-[20px] right-6 cursor-pointer"
                  onClick={DisplayCurrentPwd}
                >
                  {CPwdVisible ? <IconEyeInvisible /> : <IconEye />}
                </div>
              </div>
            </div>
            <button className="text-white bg-blue-500 py-3 rounded-md w-full mt-6">
              Create account
            </button>
          </form>
        </div>
        <h2 className="text-center mt-7">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </h2>
      </div>
    </motion.div>
  );
};

export default SignUp;
