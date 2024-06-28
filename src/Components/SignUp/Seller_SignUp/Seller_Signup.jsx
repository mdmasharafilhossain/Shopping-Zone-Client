import { useContext, useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import {  updateProfile } from "firebase/auth";


import Swal from "sweetalert2";

import { AuthContext } from "../../AuthProviders/AuthProviders";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";



const Seller_Signup = () => {
  useEffect(()=>{
    document.title = "ShoppingZone | SellerSignUp"
  },[]);
    const { createUser } = useContext(AuthContext);
    const AxiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

//   const location = useLocation();
  const navigate = useNavigate();
  
   const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    const password = document.getElementById("password").value;

    if (confirmPassword && password !== confirmPassword) {
      setErrorMessage("Password and confirm password do not match");
    } else {
      setErrorMessage("");
    }
  };

  
  
  
  const handleSignUp = e =>{
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const name = form.get('name')
        const email = form.get('email')
        const photo = form.get('photo')
        const number = form.get('number')
        const address = form.get('address')
        const account = form.get('account')
        const nid = form.get('nid')
        const password = form.get('password')
        console.log(name, email, password, photo,number,address,account,nid)
        setErrorMessage('');
        if (password.length < 6) {
            setErrorMessage("Password should be at least 6 characters")
            return
        }
         else if (!/[A-Z]/.test(password)) {
            setErrorMessage("You shuold have atleast one uppercase letter")
            return
        }
        else if (/^[a-zA-Z0-9]+$/.test(password)) {
            setErrorMessage("Use Atleast One special Character")
            return
        }
        else if(!/\d/.test(password)){
            setErrorMessage("Use Atleast One Numeric Number")
            return
        }


        createUser(email, password)
            .then(result => {
                console.log(result.user);
                const user = result.user;
                updateProfile(user, {
                    displayName: name,
                    photoURL: photo,
                });
                 const Seller_Info = {
                    name:name,
                    password:password,
                    photo: photo,
                    email:email,
                    number:number,
                    address:address,
                    Bank_Account_Number:account,
                    NID_Number:nid,
                    role:"seller"

 }
                 AxiosPublic.post('/sellers',Seller_Info)
                 .then(res =>{
                    if(res.data.insertedId){
                        console.log("user Added Database")
                        Swal.fire({
                            title: 'Done',
                            text: 'Register Successfully',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        });
                        navigate('/');
                    }
                 })
                

            })
            .catch(error => {
                console.error(error);
                setErrorMessage(error.message)
            })
    }
    
    return (
        <div>
           <div className="container mx-auto w-3/4 lg:w-3/5 overflow-hidden my-20 md:my-32 ">
        <div className="border px-10 md:px-16 lg:px-24 py-10 md:py-14 lg:py-20 rounded-2xl space-y-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            Sign up to <span className="text-orange-500">ShoppingZone For Seller</span>
          </h2>
         
          <div className="flex justify-center items-center">
            <span className="w-full border border-orange-500"></span>
            
            <span className="w-full border border-orange-500"></span>
          </div>
          <div className="card ">
            <div className="flex flex-col w-full">
              <div>
              <form className="space-y-4" onSubmit={handleSignUp}>
  {/* -----Name------ */}
  <div className="flex flex-col">
    <label htmlFor="name" className="text-sm ml-1 font-semibold">Name*</label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Your Name"
      className="input input-bordered"
      required
    />
  </div>
  {/* -----photo------ */}
  <div className="flex flex-col">
    <label htmlFor="name" className="text-sm ml-1 font-semibold">Your Photo*</label>
    <input
      type="url"
      id="photo"
      name="photo"
      placeholder="Your Photo Link"
      className="input input-bordered"
      required
    />
  </div>
  {/* -----------Phone------------- */}
  <div className="flex flex-col">
    <label htmlFor="number" className="text-sm ml-1 font-semibold">Phone Number*</label>
    <input
      type="text"
      id="number"
      name="number"
      placeholder="Your Phone Number"
      className="input input-bordered"
      required
    />
  </div>
  {/* ---------Email--------------- */}
  <div className="flex flex-col">
    <label htmlFor="email" className="text-sm ml-1 font-semibold">Email*</label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Email"
      className="input input-bordered"
      required
    />
  </div>
  {/* -----------Address------------- */}
  <div className="flex flex-col">
    <label htmlFor="address" className="text-sm ml-1 font-semibold">Address*</label>
    <input
      type="text"
      id="address"
      name="address"
      placeholder="Your Details Address"
      className="input input-bordered"
      required
    />
  </div>
  {/* -----------Bank Account------------- */}
  <div className="flex flex-col">
    <label htmlFor="account" className="text-sm ml-1 font-semibold">Bank Account Number*</label>
    <input
      type="text"
      id="account"
      name="account"
      placeholder="Your Bank Account Number"
      className="input input-bordered"
      required
    />
  </div>
  {/* NID Number */}
  <div className="flex flex-col">
    <label htmlFor="nid" className="text-sm ml-1 font-semibold">NID Number*</label>
    <input
      type="text"
      id="nid"
      name="nid"
      placeholder="Your NID Number"
      className="input input-bordered"
      required
    />
  </div>
  {/* --------------Password---------- */}
  <div className="flex flex-col">
    <label htmlFor="password" className="text-sm ml-1 font-semibold">Password</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        placeholder="Password"
        className="input input-bordered w-full"
        required
      />
      <span
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  </div>
  {/* -------------Confirm Password----------- */}
  <div className="flex flex-col">
    <label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="input input-bordered w-full"
        required
        onChange={handleConfirmPasswordChange}
      />
      <span
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  </div>

  <p className="text-red-500">{errorMessage}</p>
  <div className="form-control">
    <button
      type="submit"
      className="text-xs sm:text-base group relative overflow-hidden py-2 rounded-2xl bg-[#FF3811] font-semibold text-white"
    >
      Create Account
      <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
    </button>
  </div>
  <div className="sm:flex items-center justify-center sm:space-x-2">
    <p className="text-xs sm:text-base">
      Already have an account?
    </p>
    <Link to="/seller_login" className="">
      <button className="text-xs sm:text-base underline text-amber-500 font-bold">
        Login
      </button>
    </Link>
  </div>
</form>

              </div>
            </div>
          </div>
        </div>
      </div> 
        </div>
    );
};


export default Seller_Signup;