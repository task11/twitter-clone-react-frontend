import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import EditProfie from "../routes/EditProfie";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/auth"
          element={<Auth />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/editprofile"
          element={<EditProfie />}
        />
      </Routes>
    </Router>
  );
}

export default App;