/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoute = ({user}) => {
    const userAuth = user
    if (user === undefined) return 
  return (
    userAuth ? <Outlet/> : <Navigate to="/login" replace />
  )
}

export default ProtectedRoute