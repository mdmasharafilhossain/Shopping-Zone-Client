import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Home/Home";
import FlashSaleDetails from "../Home/FlashSale/FlasSaleDetails/FlashSaleDetails";
import AllFlashSale from "../Home/FlashSale/AllFlashSale/AllFlashSale";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import UserDashBoard from "../UserDashBoard/UserDashBoard";
import UserManageAccount from "../UserDashBoard/UserManageAccount/UserManageAccount";

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
        path:"flashSale/sale/:id",
        element:<FlashSaleDetails></FlashSaleDetails>,
        loader: ()=>fetch('http://localhost:5000/flashSale')
       },
       {
        path:"/flashSale",
        element:<AllFlashSale></AllFlashSale>
       },
       {
        path:"/login",
        element:<Login></Login>
       },
       {
        path:"/signup",
        element:<SignUp></SignUp>
       }




      ]
    },


    // User Dashboard 
    {
      path:"/userdashboard",
      element:<UserDashBoard></UserDashBoard>,
      children:[
        {
          path:"/userdashboard/manageaccount",
          element:<UserManageAccount></UserManageAccount>
        }

      ]
    }
  ]);