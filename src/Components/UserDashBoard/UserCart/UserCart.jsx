import React from 'react';
import useCart from '../../Shared/Hooks/useCart/useCart';

const UserCart = () => {
    const [cart] = useCart();
    console.log("data",cart);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-center font-bold mt-6 text-2xl md:text-4xl">
                My <span className="text-[#FF3811]">Cart</span>
            </h2>
            <hr className="my-2" />

            {cart.length === 0 ? (
                <p className="text-center mt-4">Your cart is empty</p>
            ) : (
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/4 p-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center border-b py-4">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                                    <div className="ml-4">
                                        <p className="font-bold">{item.name}</p>
                                        <p>Seller Email: {item.seller_email}</p>
                                        <p>Color: {item.color}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-xl font-bold">{item.price} ৳</p>
                                    {item.discount && (
                                        <div className="ml-2 bg-red-500 text-white text-sm p-1 rounded">-{item.discount}%</div>
                                    )}
                                    <div className="ml-4 flex items-center border p-1">
                                        <button className="px-2">-</button>
                                        <input type="text" value={item.quantity} readOnly className="w-8 text-center" />
                                        <button className="px-2">+</button>
                                    </div>
                                </div>
                                <button className="ml-4 text-red-500">REMOVE</button>
                            </div>
                        ))}
                    </div>
                    <div className="w-full md:w-1/4 p-4">
                        <div className="border p-4 rounded">
                            <h3 className="font-bold text-lg">Order Summary</h3>
                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <p>Cart Subtotal</p>
                                    <p>{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} ৳</p>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <p>Shipping</p>
                                    <p>0 ৳</p>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between font-bold">
                                    <p>Total</p>
                                    <p>{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} ৳</p>
                                </div>
                                <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded">Proceed To Checkout</button>
                            </div>
                            <p className="text-sm mt-2">Checkout now and earn 187 Points for this order</p>
                            <p className="text-sm">Applies only to registered customers, may vary when logged in.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCart;
