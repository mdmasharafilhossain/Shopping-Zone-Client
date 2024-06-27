import axios from "axios";

const AxiosPublic = axios.create({
    baseURL: "shopping-zone-server-five.vercel.app",
})
const useAxiosPublic = () => {
    
    return AxiosPublic;
};

 export default useAxiosPublic;