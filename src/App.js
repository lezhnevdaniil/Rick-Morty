import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main.jsx";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/main/:page" element={<Main />} />
        <Route path="/" element={<Navigate to="/main/1" />} />
      </Routes>
    </>
  );
}

export default App;
