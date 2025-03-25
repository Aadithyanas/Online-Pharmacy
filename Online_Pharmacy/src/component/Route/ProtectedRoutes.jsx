// import React from 'react'

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminLoginContext } from "../../Context/AdminLoginContext";

export const ProtectedRoutes = ( ) => {
     const { AdminLogin } = useContext(AdminLoginContext);
//   const hardcodedToken = localStorage.get("hardcoded-token");


  return AdminLogin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;