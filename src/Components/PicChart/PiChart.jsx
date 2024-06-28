

import { Chart } from "react-google-charts";




import {  useEffect, useState } from "react";
import useAxiosPublic from "../Shared/Hooks/useAxiosPublic/useAxiosPublic";



export const options = {
  title: "Total User Types",
  is3D: true,
};





const PiChart = () => {
    
const AxiosPublic = useAxiosPublic();

const [Users,setUsers] = useState('');
const [Seller,setSeller]= useState('');

 
useEffect(()=>{
  const fetchData = async () => {
    try {
        const response = await AxiosPublic.get('/sellers');
        const data = response.data;
        setUsers(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();

},[])

useEffect(()=>{
  const fetchData = async () => {
    try {
        const response = await AxiosPublic.get('/users');
        const data = response.data;
        setSeller(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();

},[])
// for  Premium User


    
   
     const data = [
        ["Task", "Hours per Day"],
        
        ["Sellers", Seller.length],
        ["Users", Users.length],
        
        
      ];
    return (
        <div className="lg:ml-40">
          <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
        </div>
      );
};

export default PiChart;