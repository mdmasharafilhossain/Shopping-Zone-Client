
import axios from "axios";
// https://shopping-zone-server-five.vercel.app/
const AxiosSecure = axios.create({
    baseURL: "http://localhost:5000",
})
const useAxiosSecure = () => {
    return AxiosSecure;
};

export default useAxiosSecure;