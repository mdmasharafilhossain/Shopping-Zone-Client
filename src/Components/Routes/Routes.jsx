import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Home/Home";
import FlashSaleDetails from "../Home/FlashSale/FlasSaleDetails/FlashSaleDetails";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
       {
        path:"/",
        element:<Home></Home>
       },
       {
        path:"/sale/:id",
        element:<FlashSaleDetails></FlashSaleDetails>,
        loader: ()=>fetch('http://localhost:5000/flashSale')
       }




      ]
    },
  ]);