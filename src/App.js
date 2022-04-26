import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import AppRoutes from "./routes-nav/AppRoutes";
import LoadingSpinner from "./common/LoadingSpinner";
import SquareOneApi from "./api/api";
import { UserContext } from "./auth/UserContext";

//Key name for storing toekn in localStorage for re-login
export const TOKEN_STORAGE_ID = "squareOne-token";

/**
 * SquareOne Restortaiton readings app.
 *
 * - infoLoaded: has user data been pulled from API?
 * (this manages spinner from "loading...")
 *
 * -currentUser: user obj from API.  This becomes the way to tell if
 * somone is logged in and is passed around the via context throught the app.
 *
 * -token: for logged in users, this is their application JWT.
 * IS required to be set for most API calls. THIS is initally read from
 * localStorage and synced to there via the useLocalStorage hook.
 *
 */

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  // const [projectIds, setProjectIds ] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            //put the oken on the Api class so it can use it to call the API/
            SquareOneApi.token = token;
            let currentUser = await SquareOneApi.getCurrentUser();
            setCurrentUser(currentUser);
          } catch (err) {
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      /**
       * set infoLoaded to false while async getCUrrentUser runs. Once the data
       *  is fetched or error, this will be set back to false to control the spinner
       */
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  /** Handle site-wide logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Hanle sit-wide signup.
   *
   * Automatically logs them in ( set token) upon signup
   *
   * Make sure you await this function and check its return value
   */
  async function signup(signupData) {
    try {
      let token = await SquareOneApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handle site-wide login
   *
   * Make sure you await this function and check its reuturn value!
   */
  async function login(loginData) {
    try {
      let token = await SquareOneApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { sucess: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Navigation logout={logout} />
          <AppRoutes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
