import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import React, { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import useAxiosPublic from "../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { AuthContext } from './../AuthProviders/AuthProviders';
import Swal from "sweetalert2";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../FireBase/firebase";
import toast from "react-hot-toast";
const auth = getAuth(app);




const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const AxiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const {SignIn,SignInWithGoogle} = useContext(AuthContext);
    const [invalidAuth, setInvalidAuth] = React.useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef(null);
    const handleLogin = e =>{
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const email = form.get('email')
          const password = form.get('password')
        SignIn(email,password)
        .then(result =>{
          console.log(result.user);
          Swal.fire({
              title: 'Log In',
              text: 'Log In Successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            navigate("/");
        })
        .catch(error =>{
          console.error(error);
          setErrorMessage(error.message)
  
        });
        
    }
    const hadleGoogleLogin = e =>{
        const googleProvider = new GoogleAuthProvider();
        e.preventDefault();
        SignInWithGoogle(auth,googleProvider)
        .then(result=>{
            console.log(result);
             const PeopleInfo = {
                name:result.user?.displayName,
                photo: result.user?.photoURL,
                email:result.user?.email
            }
             console.log(PeopleInfo);
            AxiosPublic.post('/users',PeopleInfo)
            .then(res=>{
                console.log(res.data);
                if(res.data.insertedId){
                    console.log("user Added Database")
                    Swal.fire({
                        title: 'Done',
                        text: 'Login Successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    
                }
                navigate('/');
            })
        })
        .catch(error =>{
            console.log(error);
        })
      }
        const handleForgotPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
          console.log("please provide an email", emailRef.current.value);
          return;
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ) {
          console.log("please write a valid email");
          return;
        }
    
        // send validation email
        sendPasswordResetEmail(auth, email)
          .then(() => {
            toast.success("please check your email");
          })
          .catch((error) => {
            console.log(error);
          });
      };
    return (
        <div>
            <div className="my-20 md:my-32 container mx-auto flex flex-col lg:flex-row space-x-10 justify-between items-center">
        <div className="w-full mx-auto">
          <img
            className=""
            src="https://i.ibb.co/VCWMv70/10173919-8619.jpg"
            alt=""
          />
        </div>
        <div className="w-full mx-auto lg:w-3/4 border rounded-2xl overflow-hidden px-10 md:px-16 lg:px-24 py-10 md:py-10">
          <div className="card ">
            <div className="flex flex-col w-full">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-semibold mb-5">
                  Log in to <span className="text-orange-600">ShoppingZone</span>{" "}
                </h1>
              </div>
              <div>
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                  {/* ---------email--------------- */}
                  <div className="flex flex-col">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  {/* -----------password------------ */}
                  <div className="form-control">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="password"
                        className="input input-bordered w-full pr-10" // Added pr-10 for padding on the right
                        required
                      />
                      <span
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer" // Adjusted position to the right
                        onClick={() => setShowPassword(!showPassword)} // Toggles the show/hide of password
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>

                  {/* Forgot password link */}
                  <div className="">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-gray-400 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* <Link to='/login'> */}
                  <div className="form-control">
                    <p className="text-red-500">{invalidAuth}</p>
                    <button className="btn bg-[#FF3811] text-white">
                      Login
                    </button>
                  </div>
                  <button
                    onClick={hadleGoogleLogin}
                    className="btn btn-outline mt-4 btn-warning w-full rounded-md overflow-hidden text-xs sm:text-lg font-bold"
                  >
                    <FcGoogle className="text-xl" /> Continue with Google
                  </button>
                  {
                    errorMessage && <p className="text-sm font-bold text-red-700">{errorMessage}</p>
                }

                  <label className="label">
                    <Link to="/signup">
                      <a
                        href="#"
                        className="label-text-alt link link-hover text-base -ml-3 lg:ml-[88px] md:ml-[50px] text-center"
                      >
                        Do not Have an Account? SignUp
                      </a>
                    </Link>
                  </label>
                  <label className="label">
                    <Link to="/seller_login">
                      <a
                        href="#"
                        className="label-text-alt link link-hover text-base -ml-3 lg:ml-[72px] md:ml-[50px] text-center text-orange-500"
                      >
                        If You Are a Seller Please Login here..Login
                      </a>
                    </Link>
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Login;