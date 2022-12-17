import Head from "next/head";
import Slider from "../components/Slider";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";

const Home = ({ products }) => {
  return (
    <div>
      <Head>
        <title>TRENDBEAT - The One-stop Shopping Destination</title>
        <meta
          name="description"
          content="TRENDBEAT - The One-stop Shopping Destination"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Slider />

      <div className="container px-5 py-16">
        <div className="text-center">
          <h1 className="sm:text-3xl text-2xl font-medium text-center title-font m-2 mb-4 text-gray-900 dark:text-white">
            Our Latest Collection
          </h1>
          <div className=" my-0 mx-auto h-1 w-20 bg-blue-500 rounded mb-10"></div>
        </div>

        <div className="flex flex-wrap -m-4 justify-center">
          {Object.keys(products).length === 0 && (
            <p>
              Sorry, All the Products are currently out of stock. New Stocks
              coming soon.
            </p>
          )}
          {Object.keys(products)
            .slice(0, 4)
            .map((item) => {
              return (
                <div
                  key={products[item]._id}
                  className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md m-2 border-2"
                >
                  <Link
                    passHref={true}
                    href={`product/${products[item].slug}`}
                    className="flex relative rounded overflow-hidden justify-center text-center"
                  >
                    <img
                      alt="ecommerce"
                      className="m-auto md:mx-0 h-auto md:h-auto block"
                      src={products[item].img}
                    />
                  </Link>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {products[item].category.charAt(0).toUpperCase() +
                        products[item].category.slice(1)}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">₹{products[item].price}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <section className="relative bg-gray-100 px-4 py-16 sm:px-8 lg:px-24 xl:px-24 2xl:px-24">
        <div className="flex flex-col lg:flex-row lg:-mx-8">
          <div className="w-full lg:px-8">
            <h2 className="text-3xl text-center leading-normal font-semibold mt-4 mb-4">
              TrendBeat is about connecting you to India's most beautiful
              products which showcases our rich heritage and culture.
            </h2>

            <p className="mt-2 text-center leading-relaxed">
              TrendBeat is an esteemed well established 20 year old design house
              producing distinctive and high quality products for your closet
              and home. TrendBeat focuses on products with unique craftsmanship,
              straight from the hands of local Indian artisans that are ethical,
              versatile and sustainable.
            </p>
          </div>
        </div>

        <div className="md:flex md:flex-wrap mt-12 text-center md:-mx-4">
          <div className="md:w-1/2 md:px-2 lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-300 p-8">
              <img
                src="/standard-warranty.jpg"
                alt=""
                className="h-20 mx-auto rounded-full object-cover"
              />
              <h4 className="text-xl font-semibold mt-4">Standard Warranty</h4>
            </div>
          </div>

          <div className="md:w-1/2 md:px-2 mt-4 md:mt-0 lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-300 p-8">
              <img
                src="/secure-payment.jpg"
                alt=""
                className="h-20 mx-auto rounded-full object-cover"
              />

              <h4 className="text-xl font-semibold mt-4">Secure Payment</h4>
            </div>
          </div>

          <div className="md:w-1/2 md:px-2 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-300 p-8">
              <img
                src="/free-shipping.jpg"
                alt=""
                className="h-20 mx-auto rounded-full object-cover"
              />

              <h4 className="text-xl font-semibold mt-4">Free Shipping</h4>
            </div>
          </div>

          <div className="md:w-1/2 md:px-2 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-300 p-8">
              <img
                src="/cod.jpg"
                alt=""
                className="h-20 mx-auto rounded-full object-cover"
              />

              <h4 className="text-xl font-semibold mt-4">Cash on Delivery</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({});

  let hoodies = {};
  for (let item of products) {
    hoodies[item.title] = JSON.parse(JSON.stringify(item));
    if (item.availableQty > 0) {
      hoodies[item.title].color = [item.color];
      hoodies[item.title].size = [item.size];
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(hoodies)) },
  };
}

export default Home;
