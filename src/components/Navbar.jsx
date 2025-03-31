
import { useEffect, useState } from "react"
import { IconClose, IconMenu } from "../assets/icons/icons"
import logoimg from "..//assets/images/logo.png"
import { Link, useLocation } from "react-router-dom"
import { auth } from "../common/firebase";
import { toast } from "react-toastify";
import { motion } from "framer-motion";



const Navbar = () => {
  const[menuOpen, setMenuOpen] = useState(false)
  const[toggleLogin, setToggleLogin] = useState(true)
  const location =  useLocation()
  function handleOpen(){
    setMenuOpen(prev => !prev)
  }
  useEffect(()=>{
    if(location.pathname === "/profile" ){
      setToggleLogin(false)
    }
    else{
      setToggleLogin(true)
    }
  },[location.pathname])
  

  function closeMenu(){
    setMenuOpen(false)
  }
  async function handleLogOut(){
    try {
        await auth.signOut();
        window.location.href = "/login"
        setMenuOpen(false)
        toast.success("Logged Out",{
            position: "top-center"
          })
        
    } catch (error) {
        toast.error(`Error Logging  Out : ${error.message}`,{
            position: "top-center",
        })          
    }

}
  return (
    <nav className="relative bg-black md:px-16 px-10 py-1 flex items-center justify-between">
        <motion.div 
          initial={{y: -100}}
            animate={{y: 0}}
            transition={{delay: .5, type:'spring', stiffness: 110}}
            >
            <Link to="/"><img src={logoimg} alt="Logo" className="sm:w-[70px] w-[60px]" /></Link>
        </motion.div>
        <div className="sm:flex hidden items-center gap-10 text-white ">
            <h2 className="hover:text-blue-500 transition-all"><Link to="/">Home</Link></h2>
            {toggleLogin ? <Link to="/login"><button className="bg-blue-500 px-8 py-3 rounded-md">Login</button></Link>:
            <button className="bg-red-600 px-8 py-3 rounded-md" onClick={handleLogOut}>Logout</button>}
        </div>
        <div className="text-[30px] cursor-pointer block sm:hidden text-white" onClick={handleOpen}>
          {menuOpen ? <IconClose/>: <IconMenu/>}
        </div>
        {menuOpen ? <div className="absolute -bottom-48 left-0 flex flex-col gap-4 items-center bg-transparent backdrop-blur-md border-b-2 py-5 w-full">
          <h2 onClick={closeMenu} className="hover:text-blue-500 transition-all text-white"><Link to="/">Home</Link></h2>
          {toggleLogin ? <Link to="/login"><button onClick={closeMenu} className="bg-blue-500 px-8 py-3 rounded-md text-white">Login</button></Link>:
            <button className="bg-red-600 px-8 py-3 rounded-md text-white" onClick={handleLogOut}>Logout</button>}
          {toggleLogin ? <Link to="/signup"><button onClick={closeMenu} className="bg-blue-500 px-8 py-3 rounded-md text-white">Create account</button></Link>: null}
        </div>
        : null}
    </nav>
  )
}

export default Navbar