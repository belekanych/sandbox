import "./styles/globals.css";
import "@/lib/i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { AuthProvider } from "@/modules/auth/contexts/AuthContext";
import { StoreProvider } from "@/contexts/StoreContext";
import { ListProvider } from "@/modules/lists/contexts/ListContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ListProvider>
        <StoreProvider>
          <RouterProvider router={router} />
        </StoreProvider>
      </ListProvider>
    </AuthProvider>
  </React.StrictMode>
);
