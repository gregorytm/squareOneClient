import React from "react";

//create currentUser object  and sets it throughout the app

export const UserContext = React.createContext();

export function useCurrentUser() {
  return React.useContext(UserContext).currentUser;
}
