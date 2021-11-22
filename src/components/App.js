import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myBase"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
      <div>
        <footer>&copy; {new Date().getFullYear()} twitter clone</footer>
      </div>
    </div>
  );
}

export default App;