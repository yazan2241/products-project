import React, { createContext, useEffect, useState} from "react";

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);


function UserProvider({ children }) {


  const [User, setUser] = useState(
    (localStorage.getItem("user") !== 'undefined') ? JSON.parse(localStorage.getItem("user")) : null
  );

  return (
    <UserContext.Provider value={User}>
      <UserDispatchContext.Provider value={setUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };