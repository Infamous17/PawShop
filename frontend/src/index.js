import React from "react";
import ReactDOM from "react-dom/client"
import App from "./App"
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import AccountProvider from "./Components/Context/AccountProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <AccountProvider>
        <App />
      </AccountProvider>
    </ChakraProvider>
  </BrowserRouter>
);
