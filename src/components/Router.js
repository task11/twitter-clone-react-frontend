import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Switch>

      </Switch>
    </Router>
  )
}