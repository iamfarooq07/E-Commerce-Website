import React from "react";
import Website from "./Website";
import Login from "./auth/Login";
import Sign from "./auth/Sign";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* <Routes>
        <Route index element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/snackify" element={<Website />} />
      </Routes> */}
      <Website />
    </div>
  );
};

export default App;
