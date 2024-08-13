
import axios from "axios";
// https://shopping-zone-server-five.vercel.app/
const AxiosSecure = axios.create({
    // baseURL: "https://shopping-zone-server-five.vercel.app",
    baseURL: "http://localhost:5000",
})
const useAxiosSecure = () => {
    return AxiosSecure;
};

export default useAxiosSecure;