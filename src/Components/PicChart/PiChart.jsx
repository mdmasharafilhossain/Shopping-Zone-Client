

import { Chart } from "react-google-charts";




import {  useEffect, useState } from "react";
import useAxiosPublic from "../Shared/Hooks/useAxiosPublic/useAxiosPublic";



export const options = {
  title: "Total User Types",
  is3D: true,
};

//for Job Seeker data



const PiChart = () => {
    
const AxiosPublic = useAxiosPublic();

const [HiringManagers,setHiringManagers] = useState('');
const [JobSeekers,setJobSeekers]= useState('');
const [PremiumUsers, setPremiumUsers] = useState('');
 
useEffect(()=>{
  const fetchData = async () => {
    try {
        const response = await AxiosPublic.get('/hiring-talents');
        const data = response.data;
        setHiringManagers(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();

},[])
// for  Job Seekers 
useEffect(()=>{
  const fetchData = async () => {
    try {
        const response = await AxiosPublic.get('/users');
        const data = response.data;
        setJobSeekers(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();

},[])
// for  Premium User
useEffect(()=>{
  const fetchData = async () => {
    try {
        const response = await AxiosPublic.get('/payments');
        const data = response.data;
        setPremiumUsers(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();

},[])

    
   
     const data = [
        ["Task", "Hours per Day"],
        ["Premium Users", PremiumUsers.length],
        ["Job Seekers", JobSeekers.length],
        ["Hiring Managers", HiringManagers.length],
        
        
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