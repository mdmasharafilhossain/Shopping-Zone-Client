import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Home/Home";
import FlashSaleDetails from "../Home/FlashSale/FlasSaleDetails/FlashSaleDetails";
import AllFlashSale from "../Home/FlashSale/AllFlashSale/AllFlashSale";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import UserDashBoard from "../UserDashBoard/UserDashBoard";
import UserManageAccount from "../UserDashBoard/UserManageAccount/UserManageAccount";
import EditUserProfile from "../UserDashBoard/EditUserProfile/EditUserProfile";
import UserCart from "../UserDashBoard/UserCart/UserCart";
import UserWhiteList from "../UserDashBoard/UserWhiteList/UserWhiteList";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AllUsers from "../AdminDashboard/AllUsers/AllUsers";
import AdminAllProducts from "../AdminDashboard/AdminAllProducts/AdminAllProducts";
import AdminPRoductDetails from "../AdminDashboard/AdminProductsDetails/AdminPRoductDetails";
import AdminUploadProducts from "../AdminDashboard/AdminUploadProduct/AdminUploadProducts";
import Seller_Signup from "../SignUp/Seller_SignUp/Seller_Signup";
import SellerLogin from "../Login/SellerLogin/SellerLogin";
import MakePayment from "../MakePayment/MakePayment";
import Stripe from "../MakePayment/Stripe/Stripe";
import SpecificCategory from "../Home/SpecificCategory/SpecificCategory";

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
        path:"/home/:category",
        element:<SpecificCategory></SpecificCategory>,
        loader: ()=>fetch('http://localhost:5000/categories')
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
       },
       {
        path:"/seller_signUp",
        element:<Seller_Signup></Seller_Signup>
       },
       {
        path:"/seller_login",
        element:<SellerLogin></SellerLogin>
       },

      //  ---------Payment--------
         {
          path:"/MakePaymentRoute",
          element:<MakePayment></MakePayment>
         },
         {
          path: "/stripeGateway",
          element: (
            
              <Stripe></Stripe>
            
          ),
        }, 




      ]
    },


    // User Dashboard 
    {
      path:"/userdashboard",
      element:<UserDashBoard></UserDashBoard>,
      children:[
        {
          path:"/userdashboard/account",
          element:<UserManageAccount></UserManageAccount>
        },
        {
          path:"/userdashboard/edit",
          element:<EditUserProfile></EditUserProfile> 
        },
        {
          path:"/userdashboard/myCart",
          element:<UserCart></UserCart>
        },
        {
          path:"/userdashboard/whiteList",
          element:<UserWhiteList></UserWhiteList>
        }

      ]
    },

    // Admin Dashboard
    {
      path:"/AdminDashboard",
      element:<AdminDashboard></AdminDashboard>,
      children:[
        {
          path: "/AdminDashboard/AllUsers",
          element:<AllUsers></AllUsers>
        },
        {
          path:"/AdminDashboard/AllProducts",
          element:<AdminAllProducts></AdminAllProducts>
        },
        {
          path:"/AdminDashboard/product/:id",
          element:<AdminPRoductDetails></AdminPRoductDetails>,
          loader: ()=>fetch('http://localhost:5000/allProducts')
        },
        {
          path:"/AdminDashboard/NewProduct",
          element:<AdminUploadProducts></AdminUploadProducts>
        }

      ]
    }
  ]);