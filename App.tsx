import React from "react";
import Toast from "react-native-toast-message";
import { AppProvider } from "./src/context/AppContext";
import Router from "./src/Router";

export default function App() {
  return (
    <>
      <AppProvider>
        <Router />
      </AppProvider>
      <Toast />
    </>
  );
}
