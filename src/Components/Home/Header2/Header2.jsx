import logo from "../../../assets/website_logo.png";
import { FaSearch } from "react-icons/fa";
const Header2 = () => {
  return (
    <div className="container mx-auto bg-slate-100 flex justify-between items-center border p-2">
      <div>
        <img className="w-44" src={logo} alt="Website Logo" />
      </div>
      <div className="flex ml-4">
        <input type="text" placeholder="Search For Products" className="border rounded-l px-32 py-2 focus:border-orange-500 focus:outline-none"
        />
        <button className="bg-orange-500 text-white px-4 py-2 rounded-r">
        <FaSearch />
        </button>
      </div>
      <div>
      <button className="border border-orange-500 font-medium rounded-md  hover:border-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 transition duration-300">Want to be Seller?</button>
      </div>
    </div>
  );
};

export default Header2;
