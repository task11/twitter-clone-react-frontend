import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myBase"
import { updateProfile } from "@firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  //usefull change Page (use Auth)
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, [])

  const refreshAuth = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
    });
  };

  return (
    <div>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} refreshAuth={refreshAuth} userObj={userObj} /> : "Initializing..."}
      <div>
        <footer>&copy; {new Date().getFullYear()} twitter clone</footer>
      </div>
    </div>
  );
}

export default App;