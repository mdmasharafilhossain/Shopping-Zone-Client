import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../../assets/website_logo.png";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import { IoHomeOutline } from "react-icons/io5";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const { user, LogOut } = useContext(AuthContext);

  const handleLogOut = () => {
    LogOut()
      .then()
      .catch();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubMenu = (menu) => {
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <div className="bg-slate-100 shadow-xl fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              )}
            </div>
            {menuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <div
                    role="button"
                    onClick={() => toggleSubMenu("parent1")}
                    className="flex justify-between items-center"
                  >
                    <a>Parent</a>
                    {subMenuOpen["parent1"] ? "-" : "+"}
                  </div>
                  {subMenuOpen["parent1"] && (
                    <ul className="p-2">
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <a>Blog</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
                <li>
                  <a>Become Seller</a>
                </li>
              </ul>
            )}
          </div>
          <div>
            <div>
              <img className="md:w-44 lg:w-44" src={logo} alt="Website Logo" />
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex h-2">
          <ul className="menu menu-horizontal">
            <li className="border-r-2 border-orange-500">
              <NavLink
                to="/"
                style={{ fontWeight: "bold", fontSize: "15px" }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-orange-500 underline"
                    : ""
                }
              >
                <IoHomeOutline className="text-orange-500 text-2xl" />
                Home
              </NavLink>
            </li>
            <li className="border-r-2 border-orange-500 pr-1 z-50">
              <details>
                <summary className="text-[15px] font-bold mt-[2px]">All Category</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li
              className="border-r-2 border-orange-500 pr-1"
              style={{ marginRight: "1rem" }}
            >
              <NavLink
                to="/feedback"
                style={{ fontWeight: "bold", fontSize: "15px" }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-red-700 underline"
                    : ""
                }
              >
                <TiShoppingCart className="text-orange-500 text-2xl" />
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/feedback"
                style={{ fontWeight: "bold", fontSize: "15px" }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-red-700 underline"
                    : ""
                }
              >
                <TiShoppingCart className="text-orange-500 text-2xl" />
                Become Seller
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end space-x-7 mr-16">
          <div className="border-l flex">
            <input
              type="text"
              placeholder="Search For Products"
              className="border rounded-lg py-2 px-6 focus:border-orange-500 focus:outline-none w-32 sm:w-48 md:w-64 lg:w-[450px] xl:w-96"
            />
            <button className="-ml-6 border px-1 rounded-r-md bg-orange-100 hover:bg-orange-400">
              <IoIosSearch className="text-2xl text-orange-600 hover:text-white" />
            </button>
          </div>
          <div>
            {user ? (
              <div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-9 rounded-full">
                      <img alt="User Photo" src={user?.photoURL} />
                    </div>
                    <h1 className="text-[10px] w-20 truncate">
                      {user?.displayName?.length > 8
                        ? `${user.displayName.substring(0, 8)}...`
                        : user.displayName}
                    </h1>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
                  >
                    <li>
                      <Link to="/userdashboard">
                        <a className="justify-between">My Account</a>
                      </Link>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <button className="ml-2 border border-orange-500 text-xs md:text-base lg:text-base font-medium rounded-md hover:border-orange-500 hover:bg-orange-500 hover:text-white px-1 md:px-4 lg:px-4 py-[2px] md:py-2 lg:py-2 transition duration-300">
                    Login/SignUp
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-4" className="drawer-button btn relative">
                <button className="relative">
                  <FaCartPlus className="text-2xl" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-orange-500 text-white text-xs flex items-center justify-center rounded-full">
                    1
                  </span>
                </button>
              </label>
            </div>
            <div className="drawer-side z-50">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
