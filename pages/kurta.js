import React from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";
import Head from "next/head";

const Kurta = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Kurta - TRENDBEAT</title>
        <meta name="description" content="Kurta - TRENDBEAT" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(products).length === 0 && (
              <p>
                Sorry, All the Kurta's appliances are currently out of stock.
                New Stocks coming soon.
              </p>
            )}
            {Object.keys(products).map((item) => {
              return (
                <div class="w-full py-6 px-3" key={products[ item ]._id}>
                  <div class="border bg-white shadow-md rounded-lg-overflow-hidden rounded-sm">
                    <Link
                      passHref={true}
                      href={`product/${products[ item ].slug}`}
                    >
                      <div class="h-auto overflow-hidden">
                        <img class="w-full h-full object-cover transition duration-1000 ease-in-out hover:scale-105 transform" src={products[ item ].img} />
                      </div>
                    </Link>

                    <div class="flex flex-col p-4 gap-2">
                      <span class="text-sm text-gray-400">{products[ item ].category.charAt(0).toUpperCase() + products[ item ].category.slice(1)}</span>

                      <Link 
                        passHref={true}
                        href={`product/${products[ item ].slug}`}
                        class="text-gray-700 uppercase font-medium"
                      >
                        {products[ item ].title}
                      </Link>

                      <p class="text-gray-500">₹{products[ item ].price}</p>
                    </div>

                    <div class="flex justify-between px-4 pb-4">
                      <div className="">
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

                      <div>
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

  let products = await Product.find({ category: "kurta" });

  let kurta = {};
  for (let item of products) {
    if (item.title in kurta) {
      if (
        !kurta[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        kurta[item.title].color.push(item.color);
      }

      if (
        !kurta[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        kurta[item.title].size.push(item.size);
      }
    } else {
      kurta[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        kurta[item.title].color = [item.color];
        kurta[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(kurta)) },
  };
}

export default Kurta;
