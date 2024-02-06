import "./styles/globals.css";
import "@/lib/i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { store } from "@/store";
import { FirebaseProvider } from "@/contexts/FirebaseContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseProvider>
        <RouterProvider router={router} />
      </FirebaseProvider>
    </Provider>
  </React.StrictMode>
);
