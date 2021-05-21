import React, { useContext } from "react";

import AppContext from "client/AppContext";

const App = () => {
  const { signInWithGoogle, appUser, handleSignOut } = useContext(AppContext);

  return (
    <>
      {appUser ? (
        <>
          <h1>Welcome to List Apps!</h1>
          <p>Create a new list or select an existing list</p>
          <button>New List</button>
          <ul>
            <li>List 1</li>
            <li>List 2</li>
          </ul>
        </>
      ) : (
        <div>
          <h1>Welcome to List Apps!</h1>
          <button onClick={signInWithGoogle}>Sign In</button>
        </div>
      )}
    </>
  );
};

export default App;
