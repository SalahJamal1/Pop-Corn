import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import MoviesContext from "./context/MoviesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MoviesContext>
      <App />
    </MoviesContext>
  </StrictMode>
);
