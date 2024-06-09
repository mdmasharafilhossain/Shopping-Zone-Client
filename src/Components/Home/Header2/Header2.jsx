import logo from '../../../assets/website_logo.png'

const Header2 = () => {
    return (
        <div className="flex border">
          <div>
             <img className='w-40' src={logo} alt="" />
          </div>
          <div>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </div>
        </div>
    );
};

export default Header2;