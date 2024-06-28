import React, { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Shared/Hooks/useAxiosSecure/useAxiosSecure";
import { AuthContext } from "../../AuthProviders/AuthProviders";

const MyOrder = () => {
    const Axiossecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await Axiossecure.get(`/payments/user/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner text-error text-9xl"></span>
            </div>
        );
    }

    
    const groupedPayments = payments.reduce((acc, payment) => {
        const transactionId = payment.transaction_ID;
        if (!acc[transactionId]) {
            acc[transactionId] = [];
        }
        acc[transactionId].push(payment);
        return acc;
    }, {});

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-center font-bold mt-6 text-2xl md:text-4xl">
                My <span className="text-[#FF3811]">Orders</span>
            </h2>
            <hr className="my-2" />
            {Object.keys(groupedPayments).length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                Object.keys(groupedPayments).map((transactionId) => (
                    <div key={transactionId} className="mb-8 ml-5 p-5 rounded-md shadow-lg text-center border border-orange-500">
                        <h2 className="text-xl font-semibold mb-2">Payment ID: {transactionId}</h2>
                        {groupedPayments[transactionId].map((payment) => (
                            <div key={payment._id} className="bg-white rounded-lg p-4 mb-4">
                                <p className="text-gray-600 mb-2">
                                    Date: {new Date(payment.date).toLocaleString()}
                                </p>
                                <p className="text-gray-800 mb-2">
                                    Total Price: ৳{payment.prices.toFixed(2)}
                                </p>
                                <h3 className="text-lg font-medium mb-2">Items:</h3>
                                <ul className="list-disc list-inside mb-2">
                                    {payment.names.map((name, index) => (
                                        <li key={index} className="flex items-center mb-2">
                                            <img
                                                src={payment.Product_images[index]}
                                                alt={name}
                                                className="w-12 h-12 mr-4 lg:ml-[550px]"
                                            />
                                            <span>
                                                {name} - Quantity: {payment.Product_quantitys[index]}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-600">
                                    Seller Emails: {payment.seller_email.join(", ")}
                                </p>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrder;
