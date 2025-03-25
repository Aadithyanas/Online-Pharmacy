import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userlogin, SetuserLogin] = useState(false);

  const handleUserLogin=()=>{
    SetuserLogin(!userlogin)
  }

  return (
    <UserContext.Provider value={{ userlogin, handleUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};
