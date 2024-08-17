import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Shared/Hooks/useAxiosPublic/useAxiosPublic";
import useCart from "../../Shared/Hooks/useCart/useCart";
import { Link } from "react-router-dom";

const UserCart = () => {
  const [cart, refetch, isLoading] = useCart();
  const [coupon, setCoupon] = useState("");
  const [discounts, setDiscounts] = useState({});
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const shippingCost = 70;
  const AxiosPublic = useAxiosPublic();

  const formatNumber = (number) => {
    return number.toFixed(2);
  };

  const getPriceBasedOnQuantity = (item) => {
    const quantity = item?.quantity;
    if (quantity >= 1 && quantity <= 10) {
      return parseFloat(item?.discountPrice);
    } else if (quantity >= 11 && quantity <= 20) {
      return parseFloat(item?.price_11_to_20);
    } else if (quantity >= 21 && quantity <= 50) {
      return parseFloat(item?.price_21_to_50);
    } else if (quantity >= 51 && quantity <= 100) {
      return parseFloat(item?.price_51_to_100);
    } else if (quantity >= 101 && quantity <= 200) {
      return parseFloat(item?.price_101_to_200);
    } else if (quantity >= 201 && quantity <= 500) {
      return parseFloat(item?.price_201_to_500);
    } else {
      return parseFloat(item?.price_501_to_1000);
    }
  };

  const handleRemove = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await AxiosPublic.delete(`cart/user/${_id}`);
        if (res.data.deletedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  useEffect(() => {
    const ApplyQuantityDiscount = () => {
      let newDiscounts = {};
      cart.forEach((item) => {
        const price = getPriceBasedOnQuantity(item);
        const additionalDiscount = 0; 
        const additionalDiscountAmount =
          (additionalDiscount / 100) * price * item.quantity;
        newDiscounts[item._id] = additionalDiscountAmount;
      });

      setDiscounts(newDiscounts);
    };

    ApplyQuantityDiscount();
  }, [cart]);

  const handleApplyCoupon = () => {
    let newDiscounts = { ...discounts };
    cart.forEach((item) => {
      if (item.Offer_coupon === coupon) {
        const CauponDiscount =
          (item.Offer_Percentage / 100) * getPriceBasedOnQuantity(item) * item.quantity;

        const TotalDiscountAmount =
          (newDiscounts[item._id] || 0) + CauponDiscount;

        const maxDiscountAmount = getPriceBasedOnQuantity(item) * item.quantity;
        newDiscounts[item._id] = Math.min(TotalDiscountAmount, maxDiscountAmount);
      }
    });

    if (Object.keys(newDiscounts).length > 0) {
      setDiscounts(newDiscounts);
      setIsCouponApplied(true);
      Swal.fire({
        icon: "success",
        title: "Coupon Applied Successfully!",
        text: `Discounts have been applied to applicable items.`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Coupon",
        text: "Please enter a valid coupon code.",
      });
    }
  };

  const subtotal = cart.reduce((acc, item) => {
    const price = getPriceBasedOnQuantity(item);
    const discount = discounts[item._id] || 0;
    return acc + (price * item.quantity - discount);
  }, 0);

  const total = subtotal + shippingCost;
  console.log("Total",total)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-error text-9xl"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center font-bold mt-6 text-2xl md:text-4xl">
        My <span className="text-blue-600">Cart</span>
      </h2>
      <hr className="my-2" />

      {cart.length === 0 ? (
        <p className="text-center mt-4">Your cart is empty</p>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/4 p-4">
            {cart.map((item) => {
              const price = getPriceBasedOnQuantity(item);
              const appliedDiscountPercentage =
                ((discounts[item._id] || 0) / (price * item.quantity)) * 100 || 0;

              return (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div className="flex items-center max-w-72">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="ml-4">
                      <p className="font-bold">{item.name}</p>
                      <p>Seller Email: {item.seller_email}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xl font-bold">
                      {formatNumber(
                        price * item.quantity - (discounts[item._id] || 0)
                      )}{" "}
                      ৳
                    </p>
                   
                    {appliedDiscountPercentage > 0 && (
                      <div className="ml-2 bg-blue-500 text-white text-sm p-1 rounded">
                        -{appliedDiscountPercentage.toFixed(2)}%
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="ml-4 text-red-500"
                  >
                    REMOVE
                  </button>
                </div>
              );
            })}
          </div>
          <div className="w-full md:w-1/4 p-4 relative top-0">
            <div className="border border-blue-500 p-4 rounded">
              <h3 className="font-bold text-lg">Order Summary</h3>
              <div className="mt-4">
                <div className="flex justify-between">
                  <p>Cart Subtotal</p>
                  <p>{formatNumber(subtotal)} ৳</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p>Shipping</p>
                  <p>{shippingCost} ৳</p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <p>Total</p>
                  <p>{formatNumber(total)} ৳</p>
                </div>
                <Link to="/MakePaymentRoute">
                  <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
                    Make Payment
                  </button>
                </Link>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter Coupon Code"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={isCouponApplied}
                />
                <button
                  onClick={handleApplyCoupon}
                  className={`mt-2 w-full  py-2 rounded ${isCouponApplied ? "bg-gray-300 text-gray-500":"bg-green-500 text-white"}`}
                  disabled={isCouponApplied}
                >
                  Apply Coupon
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;