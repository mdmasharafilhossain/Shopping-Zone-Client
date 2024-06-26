
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import Swal from 'sweetalert2';


import { Button} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../Shared/Hooks/useAxiosPublic/useAxiosPublic';
import { AuthContext } from '../../AuthProviders/AuthProviders';
const AllUsers = () => {
      const [page,setPage]= useState(0);
    
    const AxiosPublic = useAxiosPublic();
    const {loading} = useContext(AuthContext);
    const { refetch, data: {result : users = [], UsersCount = 0} = {} } = useQuery({
        queryKey: ['users',page],
        enabled:!loading,
         queryFn: async () => {
            const res = await AxiosPublic.get(`/users/pagination?page=${page}`);
            
            return res.data;

        }

    })

      const handleMakeAdmin = user =>{
        AxiosPublic.patch(`/users/admin/${user._id}`)
        .then(res=>{
           
           if(res.data.modifiedCount > 0){
               refetch();
               Swal.fire({
                   position: "top-end",
                   icon: "success",
                   title: `${user.name} is Admin Now`,
                   showConfirmButton: false,
                   timer: 1500
                 });
           }
        })
       }

       const handleRemoveAdmin = user => {
        AxiosPublic.patch(`/users/remove-admin/${user._id}`)
        .then(res => {
            
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is no longer an Admin`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }); 
    };
    const totalPages = Math.ceil(UsersCount / 10);
    const pagesToShow = 5; 
    const pages = Array.from({ length: totalPages }, (_, i) => i);

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleDelete = (user) =>{
        
        Swal.fire({
            title: `Are you sure to delete ${user?.name}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, delete ${user?.name}`
          }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await AxiosPublic.delete(`/users/customers/${user._id}`);
                
            if(res.data.deletedCount){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Delete SuccessFully User ${user?.name}`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            }
          });
    }
    return (
        <div>
            <div className="flex justify-evenly my-6 mb-10">
                <h2 className="text-xl md:text-4xl lg:text-4xl font-bold">All <span className='text-[#FF3811]'>Job Seeker List</span></h2>
               
            </div>
             <div className=" ml-10">
                <table className="table  border-separate w-3/4 md:w-1/2 lg:w-full">
                    {/* head */}
                    <thead>
                        <tr className='bg-orange-400'>
                            <th className='text-xl text-black'>Image</th>
                            <th className='text-xl text-black'>Name</th>
                            <th className='text-xl text-black'>Email</th>
                            <th className='text-xl text-black'>Role</th>
                            <th className='text-xl text-black'>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user,index) => <tr key={user._id}  className={index % 2 === 0 ? 'bg-slate-200' : 'bg-orange-200'}>
                                
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photo} />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </td>
                                <td>
                                   <Link to={`${user?.email}`}><button> <h1 className='font-bold lg:tooltip' data-tip="See Details">{user.name}</h1></button></Link>
                                    <br />
                                    
                                </td>
                                <td className='font-bold'>{user.email}</td>
                                <th>
                                   {
                                    user.role === 'admin' ? <button onClick={() => handleRemoveAdmin(user)} className='btn bg-orange-600 btn-xs text-white font-bold'> Remove Admin</button> : 
                                    <button 
                                    onClick={()=> handleMakeAdmin(user) }
                                    className="btn btn-ghost btn-xs font-bold">Make Admin</button>
                                   }
                                </th>
                                
                                <td>
                              
                                    <button onClick={()=>handleDelete(user)} className='btn btn-xs bg-red-600 text-xs text-white font-bold'>Remove User</button></td>
                            </tr>)
                        }
                        
                    </tbody>
                    {/* foot */}
                 
                </table>
            </div>
            <div className="text-center  mt-10 mb-10">
                <Button colorScheme='orange' variant="outline" onClick={handlePreviousPage} isDisabled={page === 0} className="btn mr-1 btn-sm bg-orange-600 text-white">{<ArrowLeftIcon />}</Button>
                {pages.map((pageNumber, index) => {
                    if (index === 0 || index === totalPages - 1 || (index >= page - Math.floor(pagesToShow / 2) && index <= page + Math.floor(pagesToShow / 2))) {
                        return (
                            <Button fontWeight='bold'  isDisabled={page === pageNumber} key={index} onClick={() => setPage(pageNumber)} className={`btn btn-sm mr-1 border ${page === pageNumber ? "bg-slate-300 text-black" : "bg-orange-600 text-white"}`}>{pageNumber + 1}</Button>
                        );
                    } else if (index === 1 && page > Math.floor(pagesToShow / 2) + 1) {
                        return <span className='mr-1' key={index}>..........</span>;
                    } else if (index === totalPages - 2 && page < totalPages - Math.floor(pagesToShow / 2) - 2) {
                        return <span className='mr-1' key={index}>..........</span>;
                    }
                    return null;
                })}
                <Button colorScheme='orange' variant="outline" onClick={handleNextPage} isDisabled={page === totalPages - 1} className="btn ml-1 btn-sm bg-orange-600 text-white">{<ArrowRightIcon />}</Button>
            </div>
        </div>
    );
};

export default AllUsers;