import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <header className="h-screen flex flex-col justify-center items-center text-center px-4">
    <motion.h1 
      className="text-5xl font-bold"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Secure Your Home with AI-Powered Facial Recognition
    </motion.h1>
    <p className="mt-4 text-lg text-gray-300">Advanced access control with real-time video monitoring.</p>
    <button className="bg-blue-400 px-8 py-3 rounded-md">Get Started</button>
  </header>
  )
}

export default HeroSection