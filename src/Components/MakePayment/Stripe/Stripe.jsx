
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useNavigate } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Stripe = () => {

    const navigate = useNavigate();
    const handleClick = e =>{
        e.preventDefault();
        navigate("/");
    }

    return (
        <div className='container mx-auto mt-10'>
            <h2 className='text-center text-5xl font-bold  mb-20'>Payment with Stripe</h2>
              <div>
                <button onClick={handleClick} className='ml-20 mb-20 border text-white bg-orange-500 hover:bg-orange-600 transition px-3 py-2 rounded-lg'>Back</button>
              </div>
            <div className='container mx-auto'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Stripe;