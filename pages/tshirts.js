import React from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";
import Head from "next/head";

const Tshirt = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Tshirt - TRENDBEAT</title>
        <meta name="description" content="Tshirt - TRENDBEAT" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && (
              <p>
                Sorry, All the Tshirts are currently out of stock. New Stocks
                coming soon.
              </p>
            )}
            {Object.keys(products).map((item) => {
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
                      T-Shirt
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-3">
                      {products[item].size.includes("S") && (
                        <span className="border border-gray-300 px-1 mr-1">
                          S
                        </span>
                      )}
                      {products[item].size.includes("M") && (
                        <span className="border border-gray-300 px-1 mr-1">
                          M
                        </span>
                      )}
                      {products[item].size.includes("L") && (
                        <span className="border border-gray-300 px-1 mr-1">
                          L
                        </span>
                      )}
                      {products[item].size.includes("XL") && (
                        <span className="border border-gray-300 px-1 mr-1">
                          XL
                        </span>
                      )}
                      {products[item].size.includes("XXL") && (
                        <span className="border border-gray-300 px-1 mr-1">
                          XXL
                        </span>
                      )}
                    </div>

                    <div className="mt-2">
                      {products[item].color.includes("red") && (
                        <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}

                      {products[item].color.includes("black") && (
                        <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                      )}

                      {products[item].color.includes("blue") && (
                        <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}

                      {products[item].color.includes("green") && (
                        <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}

                      {products[item].color.includes("yellow") && (
                        <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}

                      {products[item].color.includes("gray") && (
                        <button className="border-2 border-gray-300 ml-1 bg-gray-200 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}

                      {products[item].color.includes("white") && (
                        <button className="border-2 border-white ml-1 bg-gray-200 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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

  let products = await Product.find({ category: "tshirt" });

  let tshirt = {};
  for (let item of products) {
    if (item.title in tshirt) {
      if (
        !tshirt[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirt[item.title].color.push(item.color);
      }

      if (
        !tshirt[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirt[item.title].size.push(item.size);
      }
    } else {
      tshirt[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirt[item.title].color = [item.color];
        tshirt[item.title].size = [item.size];
      } else {
        tshirt[item.title].color = [];
        tshirt[item.title].size = [];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(tshirt)) },
  };
}

export default Tshirt;
