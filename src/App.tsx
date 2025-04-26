import React from 'react';
/* import logo from './logo.svg'; */
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './layouts/HomePage/ExploreTopBooks';


function App() {
  return (

    <div>
      <Navbar />
      <ExploreTopBooks />
    </div>
  );
}

export default App;
