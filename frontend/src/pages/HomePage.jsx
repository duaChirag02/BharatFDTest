import React, { useState } from "react";
import FaqList from "../components/UserFaqList"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl mb-4">User Portal</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl mb-4">FAQ</h2>
        <FaqList/>
      </div>
    </div>
  );
};

export default HomePage;
