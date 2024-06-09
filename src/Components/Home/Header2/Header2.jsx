import logo from "../../../assets/website_logo.png";
import { FaSearch } from "react-icons/fa";
const Header2 = () => {
  return (
    <div className="flex items-center border p-2">
      <div>
        <img className="w-44" src={logo} alt="Website Logo" />
      </div>
      <div className="flex ml-4">
        <input type="text" placeholder="Search For Products" className="border rounded-l px-4 py-2 focus:border-orange-500 focus:outline-none"
        />
        <button className="bg-orange-500 text-white px-4 py-2 rounded-r">
          
        </button>
      </div>
    </div>
  );
};

export default Header2;
