import React from "react";
import Head from "next/head";

const about = () => {
  return (
    <div>
      <Head>
        <title>ABOUT TRENDBEAT</title>
        <meta
          name="description"
          content="About TrendBeat - The One-stop Shopping Destination"
        />
      </Head>
      <div className="bg-gray-100">
        <section
          className="cover bg-blue-teal-gradient relative bg-blue-600 z-0 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-24 md:py-40 flex
      items-center lg:h-screen"
        >
          <div className="h-[800px]  lg:h-full xl:h-full 2xl:h-full absolute top-0 left-0 z-0">
            <img
              src="/banner1.jpg"
              alt=""
              className="w-full h-[800px]  lg:h-full xl:h-full 2xl:h-full object-cover opacity-20"
            />
          </div>

          <div className="lg:w-full xl:w-full relative z-10 h-100">
            <div>
              <h1 className="text-white text-3xl md:text-4xl xl:text-5xl mb-12 font-semibold leading-normal">
                Made in India gifts are brightening shopping carts globally
              </h1>
              <p className="text-blue-100 text-lg md:text-xl leading-normal  mt-4">
                From coffee hampers to craft kits, Indian exporters are
                showcasing millions of products at the Black Friday and Cyber
                Monday sale this Thanksgiving week.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="relative px-4 py-16 sm:px-8 lg:px-24 xl:px-24 2xl:px-24 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:-mx-8">
          <div className="w-full lg:px-8">
            <h2 className="text-3xl text-center leading-normal font-bold mt-4 mb-4">
              TrendBeat is about connecting you to India's most beautiful
              products which showcases our rich heritage and culture.
            </h2>

            <p className="mt-2 text-center leading-relaxed">
              TrendBeat is an esteemed well established 20 year old design house
              producing distinctive and high quality products for your closet
              and home. TrendBeat focuses on products with unique craftsmanship,
              straight from the hands of local Indian artisans that are ethical,
              versatile and sustainable. We indulge in discovering one-of-a-kind
              designs, inspirations and stories behind crafting, and bring them
              forward to our esteemed customers.
            </p>
          </div>
        </div>

        <div className="md:flex md:flex-wrap mt-24 text-center md:-mx-4">
          <div className="md:w-1/2 md:px-2 lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-300 p-8">
              <img
                src="/standard-warranty.jpg"
                alt=""
                className="h-20 mx-auto rounded-full object-cover"
              />
              <h4 className="text-xl font-bold mt-4">Standard Warranty</h4>
            </div>
          </div>

          <div className="md:w-1/2 md:px-2 mt-4 md:mt-0 lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-300 p-8">
              <img
                src="/secure-payment.jpg"
                alt=""
                className="h-20 mx-auto rounded-full object-cover"
              />

              <h4 className="text-xl font-bold mt-4">Secure Payment</h4>
            </div>
          </div>

          <div className="md:w-1/2 md:px-2 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-300 p-8">
              <img
                src="/free-shipping.jpg"
                alt=""
                className="h-20 mx-auto rounded-full object-cover"
              />

              <h4 className="text-xl font-bold mt-4">Free Shipping</h4>
            </div>
          </div>

          <div className="md:w-1/2 md:px-2 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-300 p-8">
              <img
                src="/cod.jpg"
                alt=""
                className="h-20 mx-auto rounded-full object-cover"
              />

              <h4 className="text-xl font-bold mt-4">Cash on Delivery</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-r from-cyan-500 to-blue-500 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-12 text-center md:text-left">
        <div className="md:flex md:items-center md:justify-center">
          <h2 className="text-xl font-bold text-white">
            Get in touch with us today! <br className="block md:hidden" />
            Call us on: +91-000000000
          </h2>
        </div>
      </section>
    </div>
  );
};

export default about;
