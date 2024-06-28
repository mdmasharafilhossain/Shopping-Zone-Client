import React, { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Shared/Hooks/useAxiosSecure/useAxiosSecure";
import { AuthContext } from "../../AuthProviders/AuthProviders";

const MyOrder = () => {
    const Axiossecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { refetch, data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await Axiossecure.get(`/payments/user/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email, 
    });

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-center font-bold mt-6 text-2xl md:text-4xl">
                My <span className="text-[#FF3811]">Orders</span>
            </h2>
            <hr className="my-2" />
            {payments.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                payments.map((payment) => (
                    <div key={payment._id} className="bg-white border border-orange-500 shadow-md rounded-lg p-4 mb-4 text-center">
                        <h2 className="text-xl font-semibold mb-2">Payment ID: {payment.transaction_ID}</h2>
                        <p className="text-gray-600 mb-2">Date: {new Date(payment.date).toLocaleString()}</p>
                        <p className="text-gray-800 mb-2">Total Price: ৳{payment.prices.toFixed(2)}</p>
                        <h3 className="text-lg font-medium mb-2">Items:</h3>
                        <ul className="list-disc list-inside mb-2">
                            {payment.names.map((name, index) => (
                                <li key={index} className="flex items-center  mb-2">
                                    <img src={payment.Product_images[index]} alt={name} className="w-12 h-12 mr-4 lg:ml-[550px]" />
                                    <span>{name} - Quantity: {payment.Product_quantitys[index]}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-gray-600">Seller Emails: {payment.seller_email.join(", ")}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrder;
