import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myBase"

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //usefull change Page (use Auth)
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, [])

  const refreshAuth = () => {
    const user = authService.currentUser;
    setUserObj(Object.assign({}, user));
  };

  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} refreshAuth={refreshAuth} userObj={userObj} /> : "Initializing..."}
      <div>
        <footer>&copy; {new Date().getFullYear()} twitter clone</footer>
      </div>
    </div>
  );
}

export default App;