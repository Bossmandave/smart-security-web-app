/* eslint-disable react/prop-types */
// import { useState } from "react";
import { FaLock, FaVideo, FaUserCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";
import icon1 from "../../assets/images/icon1.png"
import icon2 from "../../assets/images/icon2.png"
import icon3 from "../../assets/images/icon3.png"

const Button = ({ children, onClick }) => (
    <Link to="/signup">
    <button 
      className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg md:text-lg text-base shadow-lg"
      onClick={onClick}
    >
      {children}
    </button>
    </Link>
  );

const HeroSection = () => (
  <header className="h-[100dvh] flex flex-col justify-center items-center text-center px-4">
    <motion.h1 
      className="md:text-5xl text-4xl font-bold"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{delay: .2, type:'spring', stiffness: 110}}
    >
      Secure Your Home with AI-Powered Facial Recognition
    </motion.h1>
    <p className="mt-4 text-lg text-gray-300">Advanced access control with real-time video monitoring.</p>
    <Button>Get Started</Button>
  </header>
);

const Feature = ({ icon: Icon, title, description }) => (
    <div className="sm:p-10 p-6 text-center bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
      <div className="flex justify-center items-center w-16 h-16 mx-auto bg-blue-600 text-white rounded-full">
        <Icon size={30} />
      </div>
      <h3 className="sm:text-2xl text-xl font-semibold mt-4 text-white">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );

const FeaturesSection = () => (
  <section className="pb-20 px-6">
    <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <Feature icon={FaLock} title="Secure Access" description="Only authorized users can unlock your door." />
    <Feature icon={FaVideo} title="Live Monitoring" description="View real-time video feed from anywhere." />
    <Feature icon={FaUserCheck} title="User Logs" description="Keep track of access history with timestamps." />        
    </div>
    
  </section>
);

const HowItWorks = () => (
    <section className="py-20 px-6 bg-gray-800 text-white">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 border border-gray-600 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="w-[100px] mx-auto rounded-md bg-white">
                <img src={icon1} alt="face At the door" className=" mb-4" />
            </div>
            
          <h3 className="text-xl sm:text-2xl mb-3 font-semibold">Step 1</h3>
          <p className="text-gray-400">User stands in front of the camera.</p>
        </div>
        <div className="p-6 border border-gray-600 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
        <div className="w-[100px] mx-auto rounded-md bg-white">
                <img src={icon2} alt="face At the door" className=" mb-4" />
            </div>
          <h3 className="sm:text-2xl text-xl font-semibold">Step 2</h3>
          <p className="text-gray-400">Facial recognition verifies identity.</p>
        </div>
        <div className="p-6 border border-gray-600 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
        <div className="w-[100px] mx-auto rounded-md bg-white">
                <img src={icon3} alt="face At the door" className=" mb-4" />
            </div>
          <h3 className="sm:text-2xl text-xl font-semibold">Step 3</h3>
          <p className="text-gray-400">Door unlocks if access is granted.</p>
        </div>
      </div>
    </section>
  );

const Footer = () => (
  <footer className="py-10 text-center text-gray-400">
    <p>&copy; {new Date().getFullYear()} Secure Access. All rights reserved.</p>
  </footer>
);

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </div>
  )
}

export default HomePage