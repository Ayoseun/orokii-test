import React, { DOMAttributes } from "react";
import { WidgetComponent } from "@facephi/selphi-widget-web";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Panel from "./components/panel";
import Home from "./pages/Home";
import Selfie from "./pages/Selfie";
import ID from "./pages/ID";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Create lambda to render the component
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="selphi" element={<Selfie/>} />
        <Route path="id" element={<ID/>} />
      </Routes>

    </>
  );
}

export default App;
