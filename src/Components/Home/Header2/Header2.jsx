import { Link } from "react-router-dom";
import logo from "../../../assets/website_logo.png";
import { FaSearch } from "react-icons/fa";

const Header2 = () => {
  return (
    <div className="bg-slate-100">
      <div className="container mx-auto  flex justify-between items-center  p-2">
      <div>
        <img className=" md:w-44 lg:w-44" src={logo} alt="Website Logo" />
      </div>
      <div className="flex ">
      <div className="flex border rounded-l">
            <select className="bg-white text-gray-700 text-xs md:text-base lg:text-base p-[2px] md:p-2 lg:p-2 rounded-l focus:border-orange-500 focus:outline-none">
              <option>All</option>
              <option><Link to="/">Some</Link></option>
              
              
            </select>
            <div className="border-l">
            <input type="text" placeholder="Search For Products" className="border rounded-l px-[1px] md:px-2 lg:px-32 py-1 md:py-2 lg:py-2  focus:border-orange-500 focus:outline-none"
        />
            </div>
          </div>
        {/* <div>
        <input type="text" placeholder="Search For Products" className="border rounded-l  md:px-16 lg:px-32 py-2 focus:border-orange-500 focus:outline-none"
        />
        </div> */}
        <button className="bg-orange-500  text-white px-4 py-2 rounded-r">
        <FaSearch />
        </button>
      </div>
      <div>
      <button className="ml-2 border  border-orange-500 text-xs md:text-base lg:text-base font-medium rounded-md  hover:border-orange-500 hover:bg-orange-500 hover:text-white px-1 md:px-4 lg:px-4 py-[2px] md:py-2 lg:py-2 transition duration-300">Become Seller</button>
      </div>
    </div>
    </div>
  );
};

export default Header2;
