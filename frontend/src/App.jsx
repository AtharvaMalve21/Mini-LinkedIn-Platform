import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar.jsx";

// Pages
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4 md:p-8">
        <Routes>
          {/* Main App Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />

          {/* Auth Pages */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
