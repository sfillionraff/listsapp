import React, { createContext, useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import withFirebaseAuth from "react-with-firebase-auth";

import config from "backend/FirebaseConfig";

export const AppContext = createContext(null);

const firebaseApp = firebase.initializeApp(config);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle, user, signOut }) => {
  const [appUser, setAppUser] = useState({});

  const handleSignOut = () => {
    signOut();
    setAppUser({});
  };

  // useEffect(() => {
  //   if (user) {
  //     fetch();
  //   }
  // });

  return (
    <AppContext.Provider value={{ signInWithGoogle, appUser, handleSignOut }}>
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AppProvider);

// NEXT: finish setting up provider and app
// https://react-firebase-js.com/docs/react-firebase-auth/getting-started#setup
// https://medium.com/firebase-developers/how-to-setup-firebase-authentication-with-react-in-5-minutes-maybe-10-bb8bb53e8834
