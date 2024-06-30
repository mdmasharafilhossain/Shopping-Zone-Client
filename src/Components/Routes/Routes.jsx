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
import SpecificCategoryCards from "../Home/SpecificCategory/SpecificCategoryCard/SpecificCategoryCards";
import MyOrder from "../UserDashBoard/MyOrder/MyOrder";
import AdminAllOrder from "../AdminDashboard/AllOrder/AdminAllOrder";
import SellerDashboard from "../SellerDashboard/SellerDashboard";
import SellerOrder from "../SellerDashboard/SellerOrder/SellerOrder";
import Seller_Product_Upload from "../SellerDashboard/Seller_Product_Upload/Seller_Product_Upload";
import MyProductsSeller from "../SellerDashboard/MyProductsSeller/MyProductsSeller";
import SellerProductsDetails from "../SellerDashboard/SellerProductDetails/SellerProductsDetails";
import EditProductAdmin from "../AdminDashboard/EditProductAdmin/EditProductAdmin";
import SellerEditProduct from "../SellerDashboard/SellerEditProduct/SellerEditProduct";
import SellerPrfile from "../SellerDashboard/SellerProfile/SellerPrfile";
import SellerEditProfile from "../SellerDashboard/SellerEditProfile/SellerEditProfile";
import AllSellerList from "../AdminDashboard/AllSellerList/AllSellerList";
import ContactUs from "../Home/ContatctUs/ContactUs";
import ErrorPage from "../ErrorPage/ErrorPage";
import Statistics from "../Statictics/Statistics";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
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
        loader: ()=>fetch('https://shopping-zone-server-five.vercel.app/categories')
       },
        
       {
         path:"/contact",
         element:<ContactUs></ContactUs>
       },
       {
         path:"/home/:category/category/:id",
         element:<SpecificCategoryCards></SpecificCategoryCards>,
         loader: ()=>fetch('http://localhost:5000/allProducts')
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
          element:<PrivateRoute><MakePayment></MakePayment></PrivateRoute>
         },
         {
          path: "/stripeGateway",
          element: (
            
             <PrivateRoute> <Stripe></Stripe></PrivateRoute>
            
          ),
        }, 




      ]
    },


    // User Dashboard 
    {
      path:"/userdashboard",
      element:<PrivateRoute><UserDashBoard></UserDashBoard></PrivateRoute>,
      errorElement:<ErrorPage></ErrorPage>,
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
        },
        {
          path:"/userdashboard/order",
          element:<MyOrder></MyOrder>
        }

      ]
    },

    // Admin Dashboard
    {
      path:"/AdminDashboard",
      element:<AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path: "/AdminDashboard/AllUsers",
          element:<AllUsers></AllUsers>
        },
        {
           path:"/AdminDashboard/AllSellers",
           element:<AllSellerList></AllSellerList>
        },
        {
          path:"/AdminDashboard/AllProducts",
          element:<AdminAllProducts></AdminAllProducts>
        },
        {
          path:"/AdminDashboard/product/:id",
          element:<AdminPRoductDetails></AdminPRoductDetails>,
          loader: ()=>fetch('https://shopping-zone-server-five.vercel.app/allProducts')
        },
        {
          path:"/AdminDashboard/NewProduct",
          element:<AdminUploadProducts></AdminUploadProducts>
        },
        {
          path:"/AdminDashboard/All-Order",
          element:<AdminAllOrder></AdminAllOrder>
        },
        {
          path:"/AdminDashboard/editProduct/:id",
          element:<EditProductAdmin></EditProductAdmin>,
          loader: ()=>fetch('https://shopping-zone-server-five.vercel.app/allProducts')
        },
        {
          path:"/AdminDashboard/Statistics",
          element:<Statistics></Statistics>
        }

      ]
    },

    // Seller DashBoard
    {
      path:"/SellerDashboard",
      element:<SellerRoute><SellerDashboard></SellerDashboard></SellerRoute>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path:"/SellerDashboard/EditProfile",
          element:<SellerEditProfile></SellerEditProfile>
        },
        {
             path:"/SellerDashboard/Profile",
             element:<SellerPrfile></SellerPrfile>
        },
         {
          path:"/SellerDashboard/AllOrder",
          element:<SellerOrder></SellerOrder>
         },
         {
          path:"/SellerDashboard/Products",
          element:<Seller_Product_Upload></Seller_Product_Upload>
         },
         {
          path:"/SellerDashboard/MyProduct",
          element:<MyProductsSeller></MyProductsSeller>
         },
         {
          path:"/SellerDashboard/product/seller/:id",
          element:<SellerProductsDetails></SellerProductsDetails>,
          loader: ()=>fetch('https://shopping-zone-server-five.vercel.app/allProducts')
          // loader: ()=>fetch('https://shopping-zone-server-five.vercel.app/allProducts')
         },
         {
          path:"/SellerDashboard/editProduct/:id",
          element:<SellerEditProduct></SellerEditProduct>,
          loader: ()=>fetch('https://shopping-zone-server-five.vercel.app/allProducts')
          // loader: ()=>fetch('https://shopping-zone-server-five.vercel.app/allProducts')
        }

      ] 
    }
  ]);