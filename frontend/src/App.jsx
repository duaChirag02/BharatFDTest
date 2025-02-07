import React, { useState } from "react";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <button
        onClick={() => setIsAdmin(!isAdmin)}
        className="p-3 bg-blue-500 text-white rounded-md m-4 absolute"
      >
        Switch to {isAdmin ? "User" : "Admin"} Portal
      </button>
      {isAdmin ? <AdminPage /> : <HomePage />}
    </div>
  );
};

export default App;
