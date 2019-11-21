import { Router } from "@reach/router";
import React from 'react';
import Dashboard from "./Dashboard";
import Home from "./Home";

function App() {
  return (
      <div>
          <Router>
              <Home path={'/'}/>
              <Dashboard path={'/dashboard'}/>
          </Router>
      </div>
  );
}

export default App;
