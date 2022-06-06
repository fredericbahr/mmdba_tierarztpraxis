import "./App.css";

import React from "react";
import { Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import { Animal } from "./pages/Animal/Animal";
import { Customer } from "./pages/Customer/Customer";
import { Home } from "./pages/Home/Home";
import { Medicine } from "./pages/Medicine/Medicine";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="animal" element={<Animal />} />
          <Route path="medicine" element={<Medicine />} />
          <Route path="customer" element={<Customer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
