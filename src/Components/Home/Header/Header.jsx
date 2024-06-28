import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/website_logo.png";
import { FiAlignJustify } from "react-icons/fi";
import { IoIosSearch, IoMdContact } from "react-icons/io";
import { FaCartPlus, FaListAlt, FaStore } from "react-icons/fa";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import { IoHomeOutline } from "react-icons/io5";
import useCart from "../../Shared/Hooks/useCart/useCart";
import { FaFemale, FaMale } from 'react-icons/fa';
import useSeller from "../../useSeller/useSeller";
import useAdmin from "../../useAdmin/useAdmin";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState({});
  const { user, LogOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [isSeller] =useSeller();
  const [isUserAdmin] = useAdmin();

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

  const handleSearch = (e) => {
    setSearchText(e.target.value);

    
    if (e.key === 'Enter') {
      localStorage.setItem("searchText", JSON.stringify(searchText)); 
     console.log()
      navigate("/flashSale"); 
      setSearchText(""); 
    }
  };

  return (
    <div className="bg-slate-100 shadow-xl fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto navbar">
        <div className="navbar-start">
          {/* Menu Button */}
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
                <FiAlignJustify className="text-lg"/>
              )}
            </div>
            {/* Dropdown Menu Items */}
            {menuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {/* Home NavLink */}
                <li>
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
                {/* Category Submenu */}
                <li>
                  <div
                    role="button"
                    onClick={() => toggleSubMenu("parent1")}
                    className="flex justify-between items-center"
                  >
                    <summary className="text-[15px] font-bold">
                      <FaListAlt className="inline text-orange-500 text-2xl mr-1" />
                      All Category
                    </summary>
                    {subMenuOpen["parent1"] ? "-" : "+"}
                  </div>
                  {/* Submenu Items */}
                  {subMenuOpen["parent1"] && (
                    <ul className="p-2">
                      <li>
                        <span>
                          <FaFemale />
                          <Link to="/home/Women">Women Collection</Link>
                        </span>
                      </li>
                      <li>
                        <span>
                          <FaMale />
                          <Link to="/home/Men">Men Collection</Link>
                        </span>
                      </li>
                    </ul>
                  )}
                </li>
                {/* Contact Us NavLink */}
                <li>
                  <NavLink
                    to="/contact"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-orange-700 underline"
                        : ""
                    }
                  >
                    <IoMdContact className="text-orange-500 text-2xl" />
                    Contact Us
                  </NavLink>
                </li>
                {/* Become Seller NavLink */}
                <li>
                  <NavLink
                    to="/seller_signUp"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-red-700 underline"
                        : ""
                    }
                  >
                    <FaStore className="text-orange-500 text-2xl" />
                    Become Seller
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          {/* Website Logo */}
           <div>
            <Link to="/">
              <img className="w-28 md:w-44 lg:w-44 " src={logo} alt="Website Logo" />
            </Link>
          </div>
        </div>
        {/* Main Menu Items (Desktop) */}
        <div className="navbar-center hidden lg:flex h-2">
          <ul className="menu menu-horizontal">
            {/* Home NavLink */}
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
            {/* Category Dropdown */}
            <li className="border-r-2 border-orange-500 pr-1 z-50">
              <details>
                <summary className="text-[15px] font-bold">
                  <FaListAlt className="inline text-orange-500 text-2xl mr-1" />
                  All Category
                </summary>
                <ul className="p-2 w-60 border border-orange-500">
                  <li>
                    <span>
                      <FaFemale />
                      <Link to="/home/Women">Women Collection</Link>
                    </span>
                  </li>
                  <li>
                    <span>
                      <FaMale />
                      <Link to="/home/Men">Men Collection</Link>
                    </span>
                  </li>
                </ul>
              </details>
            </li>
            {/* Contact Us NavLink */}
            <li className="border-r-2 border-orange-500 pr-1" style={{ marginRight: "1rem" }}>
              <NavLink
                to="/contact"
                style={{ fontWeight: "bold", fontSize: "15px" }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-orange-700 underline"
                    : ""
                }
              >
                <IoMdContact className="text-orange-500 text-2xl" />
                Contact Us
              </NavLink>
            </li>
            {/* Become Seller NavLink */}
            <li>
              <NavLink
                to="/seller_signUp"
                style={{ fontWeight: "bold", fontSize: "15px" }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-red-700 underline"
                    : ""
                }
              >
                <FaStore className="text-orange-500 text-2xl" />
                Become Seller
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Search Bar and User Controls */}
        <div className="navbar-end  space-x-1 md:space-x-7 lg:space-x-7 mr-4 md:mr-16 lg:mr-10">
          {/* Search Bar */}
          <div className="border-l flex ">
            <input
              type="text"
              placeholder="Search For Products"
              className="border rounded-lg py-2 px-6 focus:border-orange-500 focus:outline-none w-32 sm:w-48 md:w-64 lg:w-[450px] xl:w-96"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearch} 
            />
            <button
              onClick={handleSearch}
              className="-ml-6 border px-1 rounded-r-md bg-orange-100 hover:bg-orange-400"
            >
              <IoIosSearch className="text-2xl text-orange-600 hover:text-white" />
            </button>
          </div>
          {/* User Authentication and Cart */}
          <div>
            {user ? (
              // User Dropdown
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-7 md:w-9 lg:w-9 rounded-full">
                    <img alt="User Photo" src={user?.photoURL} />
                  </div>
                  <h1 className="text-[10px] w-20 truncate">
                    {user?.displayName?.length > 8
                      ? `${user.displayName.substring(0, 8)}...`
                      : user.displayName}
                  </h1>
                </div>
                {/* User Dropdown Menu */}
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
                >
                  <li>
                    <Link to="/userdashboard/account">
                      <a className="justify-between">My Account</a>
                    </Link>
                  </li>
                  {
                    isUserAdmin == true ?
                    <Link to="/AdminDashboard">
                    <li>
                      <a>Admin Dashboard</a>
                    </li>
                  </Link>:
                  ""
                  }
                  
                  {
                    isSeller === true ?
                    <Link to="/SellerDashboard">
                    <li>
                      <a>Seller Dashboard</a>
                    </li>
                  </Link> : 
                  ""
                  }
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              // Login/SignUp Button
              <div>
                <Link to="/login">
                  <button className="ml-2 border border-orange-500 text-xs md:text-base lg:text-base font-medium rounded-md hover:border-orange-500 hover:bg-orange-500 hover:text-white px-1 md:px-4 lg:px-4 py-[2px] md:py-2 lg:py-2 transition duration-300">
                    Login/SignUp
                  </button>
                </Link>
              </div>
            )}
          </div>
          {/* Cart Drawer */}
          <Link to="/userdashboard/myCart">
          <button 
           className="relative">
                  <FaCartPlus className="text-2xl" />
                  {/* Display cart item count */}
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-orange-500 text-white text-xs flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                </button>
          </Link>
            {/* <div className="drawer-content">
              <label htmlFor="my-drawer-4" className="drawer-button btn relative">
                
              </label>
            </div> */}
            {/* Cart Sidebar */}
            {/* <div className="drawer-side z-50">
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
            </div> */}
          
        </div>
      </div>
    </div>
  );
};

export default Header;
