import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

console.log("Hello from main.jsx");

createRoot(document.getElementById("react-target")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
