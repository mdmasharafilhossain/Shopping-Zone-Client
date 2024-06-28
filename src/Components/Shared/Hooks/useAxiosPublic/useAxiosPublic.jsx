import axios from "axios";
// https://shopping-zone-server-five.vercel.app/
const AxiosPublic = axios.create({
    baseURL: "https://shopping-zone-server-five.vercel.app",
})
const useAxiosPublic = () => {
    
    return AxiosPublic;
};

 export default useAxiosPublic;