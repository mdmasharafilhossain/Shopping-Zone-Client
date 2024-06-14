import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/website_logo.png";
import { TiShoppingCart } from "react-icons/ti";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState({});

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
    <div className="bg-slate-100 shadow-xl">
      <div className=" container mx-auto navbar  ">
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
              <img className=" md:w-44 lg:w-44" src={logo} alt="Website Logo" />
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex  h-5">
          <ul className="menu menu-horizontal">
            <li className="border-r-2  border-orange-500 pr-1">
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
                Shop Now
              </NavLink>
              
            </li>
            <li className="border-r-2  border-orange-500 pr-1">
              <details>
                <summary>All Category</summary>
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

            <li className="border-r-2  border-orange-500 pr-1">
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
                Eid Offer
              </NavLink>
            </li>
            <li className="border-r-2  border-orange-500 pr-1">
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
                Blog
              </NavLink>
            </li>
            <li className="border-r-2  border-orange-500 pr-1">
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
            <li className="border-r-2  border-orange-500 pr-1">
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
        <div className="navbar-end border">
          <div className="border-l mr-72">
            <input type="text" placeholder="Search For Products" className="border rounded-l py-2 px-1 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
