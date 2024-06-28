import { Link } from "react-router-dom";
import contactImg from "../../../assets/contactImg.jpg";
import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
   

const ContactUs = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useRef();

  const sendEmail = e => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_amdzhqq",
        "template_kozrcng",
        form.current,
        "_kM-9vZP3uvGmaWva"
      )
      .then(
        result => {
         
          setFormSubmitted(true);
          if (formSubmitted) {
            setTimeout(() => {
              setFormSubmitted(false);
              form.current.reset();
            }, 1000);
          }
        },
        error => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <Header></Header>
      <div className='my-10 md:my-20 px-3 container mx-auto '>
        <div className=' md:flex items-center justify-center text-center space-y-5 md:space-x-5'>
          <div className='md:w-1/2 space-y-5'>
            <h2 className='text-xl md:text-2xl lg:text-5xl font-bold'>
              We’d love being connected.
            </h2>
            <p className='text-base md:text-xl'>
              Whether you’re curious about our policies, a job seeker, <br />{" "}
              agency or even press—we’re ready to answer any and all questions.
            </p>
          </div>
          <div className='md:w-1/2'>
            <img
              src={contactImg}
              className='object-cover w-full h-auto md:max-w-md mx-auto'
              alt=''
            />
          </div>
        </div>
        <div className='container mx-auto grid  grid-cols-1 md:grid-cols-3 items-center justify-between space-y-5 md:space-y-0 gap-x-5 mt-10'>
          <div className='border-t-8 border-emerald-600 p-4 space-y-3 shadow md:h-[180px]'>
            <h3 className='text-xl font-semibold'>Job Seekers</h3>
            <p>Explore exciting job openings by becoming one of us.</p>

            <button className='bg-emerald-600 text-white px-4 py-2  rounded shadow'>
              <Link to='/signup'>Register Now</Link>
            </button>
          </div>
          <div className='border-t-8 border-[#FF3811] p-4 space-y-3  md:h-[180px] shadow'>
            <h3 className='text-xl font-semibold'>Help & Support</h3>
            <p>Get assistance with any issues or questions you may have.</p>
            <button className='bg-[#FF3811] text-white px-4 py-2 rounded'>
              Contact Support
            </button>
          </div>
          <div className='border-t-8 border-blue-600 p-4 space-y-3 md:h-[180px] shadow'>
            <h3 className='text-xl font-semibold'>Become an Agency</h3>
            <p>Join our network and become a valued agency partner.</p>
            <button className='bg-blue-600 text-white px-4 py-2 rounded'>
              Partner With Us
            </button>
          </div>
        </div>
        <div className='container mx-auto flex flex-col md:flex-row items-center my-10 md:my-20 gap-y-10 md:gap-x-10'>
          <div className='w-full md:w-1/2'>
            <h2 className='text-xl md:text-4xl text-center font-semibold mb-6'>
              Get in touch
            </h2>

            <form
              onSubmit={sendEmail}
              ref={form}
              className='flex flex-col space-y-5 border shadow-md rounded-2xl p-5 md:px-12 md:py-10'
            >
              <input
                type='text'
                id='name'
                name='user_name'
                placeholder='Your Name'
                className='outline-none focus:border-[#FF3811] rounded-xl border px-4 py-3 text-lg font-medium'
                required
              />

              <input
                type='email'
                id='email'
                name='user_email'
                placeholder='Email address'
                className='outline-none focus:border-[#FF3811] border rounded-xl px-4 py-3 text-lg font-medium'
                required
              />

              <input
                type='text'
                id='subject'
                name='user_subject'
                placeholder='Subject'
                className='outline-none focus:border-[#FF3811] rounded-xl border px-4 py-3 text-lg font-medium'
                required
              />

              <textarea
                id='message'
                name='message'
                placeholder='Message'
                className='outline-none focus:border-[#FF3811] border rounded-xl px-4 py-3 text-lg font-medium resize-none'
                required
              ></textarea>

              <div>
                <button
                  type='submit'
                  value='send'
                  className='border flex items-center gap-x-2 text-white font-bold rounded-lg hover:bg-orange-700 px-5 md:px-10 py-2 bg-[#FF3811]'
                >
                  Send
                  <FaArrowRight />
                </button>
              </div>
            </form>
          </div>
          <div className='w-full md:w-1/2 space-y-5'>
            <iframe
              title='Google Map'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.2821349472586!2d90.39945231497996!3d23.810332284561093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c02b303df%3A0x8a2d1ad33eb15b36!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1642923769246!5m2!1sen!2sus'
              width='100%'
              height='350'
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
            <h3 className='text-xl md:text-3xl lg:text-4xl font-semibold '>
              Our location
            </h3>
            <div className='space-y-2'>
              <p>
                <strong>Address:</strong> 123 ABC Street, Dhaka, Bangladesh
              </p>
              <p>
                <strong>Phone:</strong> +880 1234 5678
              </p>
              <p>
                <strong>Email:</strong> info@example.com
              </p>
              <p>
                <strong>Working Hours:</strong> Mon-Fri: 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>

    // template_kozrcng
    // _kM-9vZP3uvGmaWva
    // tSnYn6jCJCxDTc7Uf7l2-
  );
};

export default ContactUs;
