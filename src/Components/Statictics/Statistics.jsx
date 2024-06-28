import PiChart from "../PicChart/PiChart";



const Statistics = () => {
    return (
        <div>
           <div className="flex justify-evenly my-6 mb-10">
                <h2 className="text-4xl font-bold"><span className='text-[#FF3811]'>Statistics</span></h2>
               
            </div> 
            <div className>
                
                <PiChart></PiChart>
                
              
               {/* <BarChart></BarChart> */}
               
            </div>
        </div>
    );
};

export default Statistics;