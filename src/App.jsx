import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import ResourcesPage from "./pages/ResourcesPage";

function App() {
  useState(() => console.log(import.meta.env.VITE_RAPIDAPI_KEY));

  
  return (
    <div className="scrollbar">
      <NavBar / >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
    </div>
  )
}

export default App;
