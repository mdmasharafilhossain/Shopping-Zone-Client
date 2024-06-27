import {
    FaFacebookSquare,
    FaPinterestSquare,
    FaGooglePlus,
    FaCaretRight,
  } from "react-icons/fa";
  import { FaSquareTwitter, FaInstagram } from "react-icons/fa6";
  import { Link } from "react-router-dom";
  
  
  const Footer = () => {
    return (
      <div className='mx-auto px-3 mt-20 bg-slate-100 shadow-lg'>
        <footer className='footer footer-center p-10 text-xl md:text-2xl rounded '>
        <div className=' w-28 md:w-40 lg:w-60'>
          
              
          <img src="https://i.ibb.co/6mSmPck/website-logo.png" alt="HireMaster Logo" />
      </div>
          {/* <nav className='flex flex-wrap items-center justify-center gap-4 font-medium'>
            <Link
              to='/jobs'
              className='flex items-center text-gray-700 hover:text-[#ff3811]'
            >
              <FaCaretRight />
              All Jobs
            </Link>
            <Link
              to='/job-fair'
              className='flex items-center text-gray-700 hover:text-[#ff3811]'
            >
              <FaCaretRight />
              Job Fair
              <span className='px-[4px] border border-[#ff3811] rounded-lg ml-1'>
                new
              </span>
            </Link>
  
            <Link
              to='/signup2'
              className='flex items-center text-gray-700 hover:text-[#ff3811]'
            >
              <FaCaretRight />
              Create Account
            </Link>
  
            <Link
              to='/jobpost'
              className='flex items-center text-gray-700 hover:text-[#ff3811]'
            >
              <FaCaretRight />
              Post a Job
            </Link>
            <Link
              to='/about'
              className='flex items-center text-gray-700 hover:text-[#ff3811]'
            >
              <FaCaretRight />
              FAQ
            </Link>
            <Link
              to='/contacts'
              className='flex items-center text-gray-700 hover:text-[#ff3811]'
            >
              <FaCaretRight />
              Contact us
            </Link>
          </nav> */}
          <nav>
            <div className='grid grid-flow-col gap-4'>
              <a href='/hiremaster/google' className=' hover:text-gray-400'>
                <FaGooglePlus className=' text-3xl' />
              </a>
              <a href='/hiremaster/instagram' className=' hover:text-gray-400'>
                <FaInstagram className=' text-3xl' />
              </a>
              <a href='/hiremaster/facebook' className=' hover:text-gray-400'>
                <FaFacebookSquare className=' text-3xl' />
              </a>
              <a href='/hiremaster/pinterest' className=' hover:text-gray-400'>
                <FaPinterestSquare className=' text-3xl' />
              </a>
              <a href='/hiremaster/twitter' className=' hover:text-gray-400'>
                <FaSquareTwitter className=' text-3xl' />
              </a>
            </div>
          </nav>
          
  
          <aside>
            <p>Copyright &copy; 2024 - All right reserved by ShoppingZone</p>
          </aside>
        </footer>
        <hr />
      </div>
    );
  };
  
  export default Footer;
  