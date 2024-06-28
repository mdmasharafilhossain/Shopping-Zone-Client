import axios from "axios";
// https://shopping-zone-server-five.vercel.app/
const AxiosPublic = axios.create({
    baseURL: "http://localhost:5000",
})
const useAxiosPublic = () => {
    
    return AxiosPublic;
};

 export default useAxiosPublic;