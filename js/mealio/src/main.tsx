import "./styles/style.css";
import "@/vendor/i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { AuthProvider } from "@/modules/auth/contexts/AuthContext";
import { StoreProvider } from "@/contexts/StoreContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>
);
