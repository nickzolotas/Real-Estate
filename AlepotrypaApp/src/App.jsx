import { useState } from "react";
import "./App.css";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SearchResults from "./pages/SearchResults.jsx";

export default function App() {
  return (
    <>
      {/* <Home />
      <About /> */}
      <SearchResults />
    </> 
  );
}
