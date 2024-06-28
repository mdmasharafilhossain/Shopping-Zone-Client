import { useContext } from "react";
import useAxiosSecure from "../../Shared/Hooks/useAxiosSecure/useAxiosSecure";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import { useQuery } from "@tanstack/react-query";


const AdminAllOrder = () => {
  const Axiossecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    refetch,
    data: Allpayments = [],
    isLoading,
  } = useQuery({
    queryKey: ["Allpayments", user?.email],
    queryFn: async () => {
      const res = await Axiossecure.get("/payments");
      return res.data;
    },
    enabled: !!user?.email,
  });
  const handleDeliveryClick = async (transactionId) => {
    try {
      const res = await Axiossecure.patch(`/payments/${transactionId}/deliver`);
      if (res.status === 200) {
        
        refetch();
      } else {
        console.error("Failed to mark as delivered");
      }
    } catch (error) {
      console.error("Error marking as delivered:", error);
    }
  };
  // Group payments by user email
  const groupedPayments = Allpayments.reduce((acc, payment) => {
    const email = payment?.User_email;
    if (!acc[email]) {
      acc[email] = [];
    }
    acc[email].push(payment);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-error text-9xl"></span>
      </div>
    );
  } 

  return (
    <div>
      <div className="flex justify-evenly my-6 mb-10">
        <h2 className="text-xl md:text-4xl lg:text-4xl font-bold">
          {" "}
          All <span className="text-[#FF3811]">Orders</span>
        </h2>
      </div>
      <div>
        {Object.keys(groupedPayments).length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          Object.keys(groupedPayments).map((email) => (
            <div key={email} className="mb-8 ml-5 p-5 rounded-md shadow-lg text-center border border-orange-500">
              <h2 className="text-2xl font-bold mb-4 ml-5">User: {email}</h2>
              {groupedPayments[email].map((payment) => (
                <div
                  key={payment._id}
                  className="bg-white  rounded-lg p-4 mb-4"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    Payment ID: {payment.transaction_ID}
                  </h2>
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
                  <p className="text-gray-600">Status: {payment.status}</p>
                  {payment.status === "pending" ? (
                    <button
                      onClick={() => handleDeliveryClick(payment.transaction_ID)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mt-2"
                    >
                      Mark as Delivered
                    </button>
                  ) :(<button
                    
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mt-2"
                  >
                    Delivered
                  </button>)
                
                
                }
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminAllOrder;
