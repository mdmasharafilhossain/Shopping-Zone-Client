import { Link } from "react-router-dom";
import stripeImage from "../../assets/stripe.png"
import sslImage from "../../assets/SSL.jpg";


const MakePayment = () => {
  return (
    <>
    
      <div className="container mx-auto mt-10">
        <h2 className="text-center text-5xl font-bold  mb-20">Make Payment</h2>
        <div className="flex sm:flex-col lg:flex-row gap-5">
          <div className="card max-w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <img src={stripeImage} alt="Stripe" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Stripe...</h2>
              <p>
                This is an international payment gateway. You can pay with visa
                and international card from anywhere of the world
              </p>
              <div className="card-actions justify-end">
                <button className="btn bg-[#FF3811] text-white hover:text-black">
                  <Link to="/stripeGateway">Pay with Stripe</Link>
                </button>
              </div> 
            </div>
          </div>

          <div className="card max-w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <img src={sslImage} alt="Stripe" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">SSL Ecommerze...</h2>
              <p>
                It is a Bangladeshi payment gateway provider. You can pay with
                visa and international card and also use mobile banking through
                this.
              </p>
              <div className="card-actions justify-end">
                <button className="btn bg-[#FF3811] text-white hover:text-black">
                  <Link to="/sslGateway">Pay with SSL Ecommerze</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakePayment;
