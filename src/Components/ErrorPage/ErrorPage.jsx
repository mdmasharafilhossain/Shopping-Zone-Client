import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div >
        <div className='lg:ml-96'>
        <img src="https://i.ibb.co/6gGjqXc/404-error-page-not-found-design-template-vector-21393147.jpg" alt="" />
        </div>
        <div>
           <Link to="/AdminDashboard/AllUsers"> <button  className='btn lg:ml-[850px] border-none btn-secondary bg-orange-500 hover:bg-orange-600'>Go To Admin Dashboard</button></Link>
        </div>
    </div>
    );
};

export default ErrorPage;