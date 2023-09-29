import React from "react";
import Home from "./views/homePage/homePage";
import { Routes, Route } from "react-router-dom";
function Routers() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </>
  );
}

export default Routers;
