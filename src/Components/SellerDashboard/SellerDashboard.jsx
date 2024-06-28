import { Link, NavLink, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { FiPackage } from 'react-icons/fi';
import { FaUpload } from 'react-icons/fa';
import { FiAlignJustify } from "react-icons/fi";

import { FiEdit} from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import { FaClipboardList } from 'react-icons/fa';
import { MdOutlineAccountBox } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";

import { FcStatistics } from "react-icons/fc";
import { AuthContext } from "../AuthProviders/AuthProviders";

const SellerDashboard = () => {
  
  const [isUserAdmin] = useState(true);
  const [isHiringManagerAdmin] =  useState(true);
  const { user } = useContext(AuthContext);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  
  useEffect(() => {
    const hasShownWelcomeMessage = localStorage.getItem("hasShownWelcomeMessage");
    if (user && !hasShownWelcomeMessage) {
      setShowWelcomeMessage(true);
    }
  }, [user]);
  const handleRouteClick = () => {
    localStorage.setItem("hasShownWelcomeMessage", "true");
    setShowWelcomeMessage(false);
  };
  const handleHomeRouteClick = () =>{
    localStorage.removeItem("hasShownWelcomeMessage");
    setShowWelcomeMessage(false);
  }
  return (
    <div className='flex '>
      {
        isUserAdmin || isHiringManagerAdmin ?  
        
        <>
        <div className="max-h-[400px] sticky z-50 top-0">
        <div className='drawer lg:drawer-open bg-slate-100'>
          <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content flex flex-col items-center justify-center'>
            {/* Page content here */}
            <label
              htmlFor='my-drawer-2'
              className='btn  bg-orange-500 drawer-button lg:hidden'
            >
              <FiAlignJustify />
            </label>
          </div>
          <div className='drawer-side'>
            <label
              htmlFor='my-drawer-2'
              aria-label='close sidebar'
              className='drawer-overlay'
            ></label>
            <ul className='menu p-4 sticky top-0  w-60 min-h-screen z-50 bg-orange-600 text-base-content '>
              <div className='space-y-2 mb-10'>
                <img
                  className='w-20 ml-16 mt-6 rounded-full'
                  src={user?.photoURL || user?.photo}
                  alt=''
                />
                <h1 className='text-sm text-white text-center font-bold'>
                  {user?.displayName || user?.name}
                </h1>
              </div>
            
              {/* Sidebar content here */}

              <ul className='menu p-4  py-auto'>
                <li
                  onClick={handleRouteClick}
                  className='font-bold text-sm text-white '
                >
                  <NavLink
                    to="/SellerDashboard/Profile"
                    className={({ isActive }) =>
                      `{ ${isActive ? " text-white border hover:bg-none " : " "}}`
                    }
                  >
                    {" "}
                    <MdOutlineAccountBox />
                   My Profile
                  </NavLink>
                </li>
                <li
                  onClick={handleRouteClick}
                  className='font-bold text-sm  text-white '
                >
                  <NavLink
                    to="/SellerDashboard/EditProfile"
                    className={({ isActive }) =>
                      `{ ${isActive ? " text-white border " : " "}}`
                    }
                  >
                    {" "}
                    <FiEdit />
                    Edit Profile
                  </NavLink>
                </li>
                {/* <li
                  onClick={handleRouteClick}
                  className='font-bold text-sm text-white'
                >
                  <NavLink
                    to=''
                    className={({ isActive }) =>
                      `{ ${isActive ? " border text-white hover:none " : " "}}`
                    }
                  >
                    {" "}
                    <FiPackage />
                    My Products
                  </NavLink>
                </li> */}
                <li
                  onClick={handleRouteClick}
                  className='font-bold text-sm text-white'
                >
                  <NavLink
                    to='/SellerDashboard/Products'
                    className={({ isActive }) =>
                      `{ ${isActive ? " border  " : " "}}`
                    }
                  >
                    <FaUpload />
                    Upload New Products
                  </NavLink>
                </li>
                <li
                  onClick={handleRouteClick}
                  className='font-bold text-sm text-white'
                >
                  <NavLink
                    to="/SellerDashboard/MyProduct"
                    className={({ isActive }) =>
                      `{ ${isActive ? " border  " : " "}}`
                    }
                  >
                    <FaClipboardList />
                    My Products
                  </NavLink>
                </li>
                <li
                  onClick={handleRouteClick}
                  className='font-bold text-sm text-white'
                >
                  <NavLink
                    to='/SellerDashboard/AllOrder'
                    className={({ isActive }) =>
                      `{ ${isActive ? " border  " : " "}}`
                    }
                  >
                    <FaClipboardList />
                    Customer Order
                  </NavLink>
                </li>
                {/* <li
                  onClick={handleRouteClick}
                  className='font-bold text-sm text-white'
                >
                  <NavLink
                    to='/AdminDashboard/all-news'
                    className={({ isActive }) =>
                      `{ ${isActive ? " border  " : " "}}`
                    }
                  >
                    <TiNews />
                    All News
                  </NavLink>
                </li>
                <li
                  onClick={handleRouteClick}
                  className='font-bold text-sm text-white'
                >
                  <NavLink
                    to='/AdminDashboard/PremiumUser'
                    className={({ isActive }) =>
                      `{ ${isActive ? " border  " : " "}}`
                    }
                  >
                    <MdPeopleAlt />
                    Premium Users
                  </NavLink>
                </li>
                <li
                  onClick={handleRouteClick}
                  className='font-bold text-sm text-white'
                >
                  <NavLink
                    to='/AdminDashboard/premiumusercourses'
                    className={({ isActive }) =>
                      `{ ${isActive ? " border  " : " "}}`
                    }
                  >
                   <FaBook />
                   Add Courses
                  </NavLink>
                </li>
                <li
                  onClick={handleRouteClick}
                  className='font-bold text-sm text-white'
                >
                  <NavLink
                    to='/AdminDashboard/allpremiumcourses '
                    className={({ isActive }) =>
                      `{ ${isActive ? " border  " : " "}}`
                    }
                  >
                   <FaBook />
                    Premium User Courses
                  </NavLink>
                </li>
                <li
                  onClick={handleRouteClick}
                  className='font-bold text-sm text-white'
                >
                  <NavLink
                    to='/AdminDashboard/alljobreport'
                    className={({ isActive }) =>
                      `{ ${isActive ? " border  " : " "}}`
                    }
                  >
                   <MdReport />
                   Job Report
                  </NavLink>
                </li> */}
                <li
                  onClick={handleRouteClick}
                  className='font-bold text-sm text-white'
                >
                  <NavLink
                    to='/AdminDashboard/Statistics'
                    className={({ isActive }) =>
                      `{ ${isActive ? " border  " : " "}}`
                    }
                  >
                    <FcStatistics />
                    Statistics
                  </NavLink>
                </li>
                <li
                  onClick={handleHomeRouteClick}
                  className='font-bold text-sm text-white'
                >
                  <NavLink
                    to='/'
                    className={({ isActive }) =>
                      `{ ${isActive ? " border  " : " "}}`
                    }
                  >
                    <FaHome />
                    Go Back Home
                  </NavLink>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
      {/* Welcome message for admin */}
      {showWelcomeMessage && (
        <div>
          <h1 className='text-5xl font-bold mt-60 ml-32'>
            Welcome Seller{" "}
            <span className='text-orange-600'>{user?.displayName}</span>!!!
          </h1>
        </div>
      )}
        </>


:   
<>
<div >
                    <h2 className="text-5xl font-bold  text-red-700">DashBoard Only For Seller!!!</h2> 

                    <Link to="/"><button className="btn  bg-orange-600 text-white text-lg">Go To Home</button></Link>
                    
                </div>
</>


      }

      {/* Outlet */}
      <div className='w-full md:w-full lg:w-full   pr-10'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default SellerDashboard;
