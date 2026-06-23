import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx";
import Login from "./pages/Login.jsx";
import NewListing from "./pages/NewListing.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
          <Home />
          <About />
          </>
          } />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-listing" element={<NewListing />} />
      </Routes>
    </BrowserRouter>
  );
}
