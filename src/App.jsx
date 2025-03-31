
import { createBrowserRouter, createRoutesFromElements, RouterProvider,Route, Navigate } from "react-router-dom"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import Login from "./pages/LoginPage/Login"
import SignUp from "./pages/SignUpPage/SignUp"
import ForgotPwd from "./pages/ForgotPwd/ForgotPwd"
// import ProfilePage from "./pages/ProfilePage/ProfilePage"
import { useEffect, useState } from "react"
import { auth } from "./common/firebase"
import MainPage from "./Layout/MainPage"
import ProtectedRoute from "./utils/ProtectedPage"
import HomePage from "./pages/HomePage/HomePage"



function App() {
  const[user, setUser] =useState(null)
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Store the full user object
      setLoading(false);
    });

    return () => unsubscribe();
  },[])
  if (loading) return 
  
  const router = createBrowserRouter (
  createRoutesFromElements(
    <Route path="/" element={<MainPage/>}>
      <Route index element={<HomePage/>}/>
      <Route element={<ProtectedRoute user={user}/>}>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Route>
      <Route path="/login" element={user ? <Navigate to="/profile" replace/> : <Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/forget-password" element={<ForgotPwd/>}/>
      
    </Route>
  )
)
  return (
    <RouterProvider router={router}/>
  )
}

export default App
