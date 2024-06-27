
import axios from "axios";

const AxiosSecure = axios.create({
    baseURL: "shopping-zone-server-five.vercel.app",
})
const useAxiosSecure = () => {
    return AxiosSecure;
};

export default useAxiosSecure;