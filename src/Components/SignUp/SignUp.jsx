import { useContext, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProviders/AuthProviders";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { getAuth, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import useAxiosPublic from "../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import app from "../FireBase/firebase";
const auth = getAuth(app);
const SignUp = () => {
    const { createUser, SignInWithGoogle } = useContext(AuthContext);
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
        const password = form.get('password')
        console.log(name, email, password, photo)
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
                 const UserInfo = {
                    name:name,
                    photo: photo,
                    email:email
                 }
                 AxiosPublic.post('/users',UserInfo)
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
        .catch(error =>{
            console.log(error);
        })
      }
    return (
        <div>
           <div className="container mx-auto w-3/4 lg:w-3/5 overflow-hidden my-20 md:my-32 ">
        <div className="border px-10 md:px-16 lg:px-24 py-10 md:py-14 lg:py-20 rounded-2xl space-y-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            Sign up to HireMaster
          </h2>
          <button
            onClick={hadleGoogleLogin}
            className="btn btn-outline btn-warning w-full rounded-md overflow-hidden text-xs sm:text-lg font-bold"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </button>
          <div className="flex justify-center items-center">
            <span className="w-full border border-[#FF3811]"></span>
            <span className="px-4">Or</span>
            <span className="w-full border border-[#FF3811]"></span>
          </div>
          <div className="card ">
            <div className="flex flex-col w-full">
              <div>
                <form className="space-y-4" onSubmit={handleSignUp}>
                  {/* -----Name------ */}
                  <div className="flex flex-col">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  {/* -----------Image------------- */}
                  <div className="flex flex-col">
                    <input
                      type="url"
                      id="photo"
                      name="photo"
                      placeholder="Upload your photo"
                      className="input input-bordered"
                      required
                    />
                  </div>
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
                  {/* --------------password---------- */}
                  <div className="flex flex-col">
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
                  {/* -------------confirm password----------- */}
                  <div className="form-control">
                    <div className="relative">
                      <input
                        type={show ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="input input-bordered w-full"
                        required
                        onChange={handleConfirmPasswordChange} // Add this line to handle onChange event
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
                    <Link to="/login" className="">
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

export default SignUp;