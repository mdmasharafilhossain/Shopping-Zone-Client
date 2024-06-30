import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import { AuthContext } from './../AuthProviders/AuthProviders';
import Swal from "sweetalert2";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../FireBase/firebase";
import toast from "react-hot-toast";

const auth = getAuth(app);

const Login = () => {
  useEffect(() => {
    document.title = "ShoppingZone | Login";
  }, []);
  
  const [showPassword, setShowPassword] = useState(false);
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { SignIn, SignInWithGoogle, setUpRecaptcha } = useContext(AuthContext);
  const [invalidAuth, setInvalidAuth] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const otpRef = useRef(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [countryCode, setCountryCode] = useState("+880"); 

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password');
    SignIn(email, password)
      .then((result) => {
        Swal.fire({
          title: 'Log In',
          text: 'Log In Successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    SignInWithGoogle()
      .then((result) => {
        const PeopleInfo = {
          name: result.user?.displayName,
          photo: result.user?.photoURL,
          email: result.user?.email,
        };
        AxiosPublic.post('/users', PeopleInfo)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: 'Done',
                text: 'Login Successfully',
                icon: 'success',
                confirmButtonText: 'Ok',
              });
            }
            navigate('/');
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("please check your email");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    const phoneNumber = countryCode + phoneRef.current.value;
    setUpRecaptcha(phoneNumber)
      .then((result) => {
        setVerificationResult(result);
        console.log("Code sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    const otp = otpRef.current.value;
    verificationResult
      .confirm(otp)
      .then((result) => {
        const PeopleInfo = {
          name: result.user?.displayName,
          phone: result.user?.phoneNumber,
        };
        AxiosPublic.post('/users', PeopleInfo)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: 'Logged In',
                text: 'Logged In Successfully',
                icon: 'success',
                confirmButtonText: 'Ok',
              });
              navigate("/");
            }
          });
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <div className="my-20 md:my-32 container mx-auto flex flex-col lg:flex-row space-x-10 justify-between items-center">
        <div className="w-full mx-auto">
          <img
            src="https://i.ibb.co/hcPZdV7/stock-vector-face-scan-concept-man-standing-near-smartphone-authorization-and-authentication-login-a.jpg"
            alt=""
          />
        </div>
        <div className="w-full mx-auto lg:w-3/4 border rounded-2xl overflow-hidden px-10 md:px-16 lg:px-24 py-10 md:py-10">
          <div className="card">
            <div className="flex flex-col w-full">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-semibold mb-5">
                  Log in to <span className="text-orange-600">ShoppingZone</span>{" "}
                </h1>
              </div>
              <div>
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
                  <div className="form-control">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="password"
                        className="input input-bordered w-full pr-10"
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
                  <div className="">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-gray-400 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="form-control">
                    <p className="text-red-500">{invalidAuth}</p>
                    <button className="btn bg-[#FF3811] text-white">
                      Login
                    </button>
                  </div>
                  <button
                    onClick={handleGoogleLogin}
                    className="btn btn-outline mt-4 btn-warning w-full rounded-md overflow-hidden text-xs sm:text-lg font-bold"
                  >
                    <FcGoogle className="text-xl" /> Continue with Google
                  </button>
                  {errorMessage && (
                    <p className="text-sm font-bold text-red-700">
                      {errorMessage}
                    </p>
                  )}
                  <label className="label">
                    <Link to="/signup">
                      <a
                        href="#"
                        className="label-text-alt link link-hover text-base -ml-3 lg:ml-[130px] md:ml-[50px] text-center"
                      >
                        Do not Have an Account? SignUp
                      </a>
                    </Link>
                  </label>
                  <div className="sm:flex items-center justify-center sm:space-x-2">
                    <p className="text-xs sm:text-base">You are a Seller?</p>
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
      <div className="my-20 md:my-32 container mx-auto">
        <h2 className="text-center text-2xl font-bold mb-10">Phone Login</h2>
        <form onSubmit={handlePhoneLogin} className="flex flex-col gap-5">
          <div id="recaptcha-container"></div>
          <div className="flex flex-col w-1/2 mx-auto">
            <label htmlFor="phone" className="mb-2">Phone Number</label>
            <div className="flex">
              <select
                id="countryCode"
                name="countryCode"
                className="input input-bordered rounded-r-none"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+880">+880 (Bangladesh)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+81">+81 (Japan)</option>
                <option value="+91">+91 (India)</option>
                {/* Add more country codes as needed */}
              </select>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone number"
                className="input input-bordered rounded-l-none flex-1"
                required
                ref={phoneRef}
              />
            </div>
          </div>
          <button className="btn bg-[#FF3811] text-white w-1/2 mx-auto">Send OTP</button>
        </form>
        {verificationResult && (
          <form onSubmit={verifyOtp} className="flex flex-col gap-5 mt-10">
            <div className="flex flex-col">
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                className="input input-bordered"
                required
                ref={otpRef}
              />
            </div>
            <button className="btn bg-[#FF3811] text-white">Verify OTP</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
