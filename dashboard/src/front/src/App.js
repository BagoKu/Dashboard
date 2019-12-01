import { Router } from "@reach/router";
import React from 'react';
import Dashboard from "./Dashboard";
import Home from "./Home";
import About from "./About";

function App() {
  return (
      <div>
          <Router>
              <Home path={'/'}/>
              <Dashboard path={'/dashboard'}/>
              <About path={'/about.json'}/>
          </Router>
      </div>
  );
}

export default App;
