import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Components/Routes/Routes.jsx";
import { ChakraProvider } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AuthProviders from "./Components/AuthProviders/AuthProviders.jsx";



const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviders>
      
    <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
    
    </AuthProviders>
  </React.StrictMode>
);
