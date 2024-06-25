import { NavLink, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FiEdit, FiAlignJustify } from "react-icons/fi";

import { FaHome } from "react-icons/fa";
import { MdOutlineAccountBox } from "react-icons/md";


import { AuthContext } from "../AuthProviders/AuthProviders";

const UserDashBoard = () => {
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

  const handleHomeRouteClick = () => {
    localStorage.removeItem("hasShownWelcomeMessage");
    setShowWelcomeMessage(false);
  };

  return (
    <div className="flex">
      <div className="max-h-[400px] sticky z-50 top-0">
        <div className="drawer lg:drawer-open bg-slate-100">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <label
              htmlFor="my-drawer-2"
              className="btn bg-orange-500 drawer-button lg:hidden"
            >
              <FiAlignJustify />
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 sticky top-0 w-60 min-h-screen z-50 bg-orange-600 text-base-content">
              <div className="space-y-2 mb-10">
                <img
                  className="w-20 ml-16 mt-6 rounded-full"
                  src={user?.photoURL || user?.photo}
                  alt=""
                />
                <h1 className="text-sm text-white text-center font-bold">
                  {user?.displayName || user?.name}
                </h1>
              </div>

              <ul className="menu p-4 py-auto">
                <li onClick={handleRouteClick} className="font-bold text-sm text-white">
                  <NavLink
                    to="/userdashboard/account"
                    className={({ isActive }) =>
                      isActive ? "text-white border-b-2 border-white" : "text-white"
                    }
                  >
                    <MdOutlineAccountBox />
                    My Profile
                  </NavLink>
                </li>
                <li onClick={handleRouteClick} className="font-bold text-sm text-white">
                  <NavLink
                    to="/userdashboard/edit"
                    className={({ isActive }) =>
                      isActive ? "text-white border-b-2 border-white" : "text-white"
                    }
                  >
                    <FiEdit />
                    Update Profile
                  </NavLink>
                </li>
                {/* <li onClick={handleRouteClick} className="font-bold text-sm text-white">
                  <NavLink
                    to="/AdminDashboard/AllJobPost"
                    className={({ isActive }) =>
                      isActive ? "text-white border-b-2 border-white" : "text-white"
                    }
                  >
                    <BiBriefcase />
                    All Job Post
                  </NavLink>
                </li> */}
                {/* <li onClick={handleRouteClick} className="font-bold text-sm text-white">
                  <NavLink
                    to="/AdminDashboard/create-news"
                    className={({ isActive }) =>
                      isActive ? "text-white border-b-2 border-white" : "text-white"
                    }
                  >
                    <TiNews />
                    Create News
                  </NavLink>
                </li> */}
                {/* <li onClick={handleRouteClick} className="font-bold text-sm text-white">
                  <NavLink
                    to="/AdminDashboard/all-news"
                    className={({ isActive }) =>
                      isActive ? "text-white border-b-2 border-white" : "text-white"
                    }
                  >
                    <TiNews />
                    All News
                  </NavLink>
                </li> */}
                {/* <li onClick={handleRouteClick} className="font-bold text-sm text-white">
                  <NavLink
                    to="/AdminDashboard/PremiumUser"
                    className={({ isActive }) =>
                      isActive ? "text-white border-b-2 border-white" : "text-white"
                    }
                  >
                    <MdPeopleAlt />
                    Premium Users
                  </NavLink>
                </li> */}
                {/* <li onClick={handleRouteClick} className="font-bold text-sm text-white">
                  <NavLink
                    to="/AdminDashboard/premiumusercourses"
                    className={({ isActive }) =>
                      isActive ? "text-white border-b-2 border-white" : "text-white"
                    }
                  >
                    <FaBook />
                    Add Courses
                  </NavLink>
                </li> */}
                {/* <li onClick={handleRouteClick} className="font-bold text-sm text-white">
                  <NavLink
                    to="/AdminDashboard/allpremiumcourses"
                    className={({ isActive }) =>
                      isActive ? "text-white border-b-2 border-white" : "text-white"
                    }
                  >
                    <FaBook />
                    Premium User Courses
                  </NavLink>
                </li> */}
                {/* <li onClick={handleRouteClick} className="font-bold text-sm text-white">
                  <NavLink
                    to="/AdminDashboard/alljobreport"
                    className={({ isActive }) =>
                      isActive ? "text-white border-b-2 border-white" : "text-white"
                    }
                  >
                    <MdReport />
                    Job Report
                  </NavLink>
                </li> */}
                {/* <li onClick={handleRouteClick} className="font-bold text-sm text-white">
                  <NavLink
                    to="/AdminDashboard/Statistics"
                    className={({ isActive }) =>
                      isActive ? "text-white border-b-2 border-white" : "text-white"
                    }
                  >
                    <FcStatistics />
                    Statistics
                  </NavLink>
                </li> */}
                <li onClick={handleHomeRouteClick} className="font-bold text-sm text-white">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-white border-b-2 border-white" : "text-white"
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
      {showWelcomeMessage && (
        <div>
          <h1 className="text-5xl font-bold mt-60 ml-32">
            Welcome{" "}
            <span className="text-orange-600">{user?.displayName}</span>!!!
          </h1>
        </div>
      )}
      <div className="w-full md:w-full lg:w-full pr-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default UserDashBoard;
