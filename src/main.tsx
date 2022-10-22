import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import "./index.css";
import MetamaskContext from "./context/MetamaskContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MetamaskContext>
      <Home />
    </MetamaskContext>
  </React.StrictMode>
);
