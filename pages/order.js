import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Order from "../models/Order";
import mongoose from "mongoose";
import Head from "next/head";

const MyOrder = ({ order, clearCart }) => {
  const products = order.products;
  const router = useRouter();
  const [date, setDate] = useState();

  useEffect(() => {
    const d = new Date(order.createdAt);
    setDate(d);

    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <Head>
        <title>Order - TRENDBEAT</title>
        <meta name="description" content="Order - TRENDBEAT" />
      </Head>
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              TRENDBEAT
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order Id: {order.orderId}
            </h1>
            <p className="leading-relaxed mb-4">
              Your order has been successfully placed. Your Payment status is{" "}
              <span className="font-semibold text-blue-600">
                {order.status}
              </span>
            </p>

            <p className="leading-relaxed mb-4">
              Order placed on:{" "}
              {date &&
                date.toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>

            <div className="overflow-x-auto relative">
              <table className="w-full my-4 text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="text-lg py-3 px-6 ">
                      Product name
                    </th>
                    <th scope="col" className="text-lg py-3 px-6 ">
                      Product name
                    </th>
                    <th scope="col" className="text-lg py-3 px-6">
                      Quantity
                    </th>
                    <th scope="col" className="text-lg py-3 px-6 ">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(products).map((key) => {
                    return (
                      <tr
                        key={key}
                        className="border-b-2 border-gray-200 bg-gray-100"
                      >
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {products[key].img}
                        </th>
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {products[key].name} ({products[key].size}/{" "}
                          {products[key].variant})
                        </th>
                        <td className="py-4 px-6">{products[key].qty}</td>
                        <td className="py-4 px-6">
                          ₹{products[key].price} X {products[key].qty} = ₹
                          {products[key].price * products[key].qty}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col mt-4">
              <span className="title-font font-medium text-2xl text-gray-900">
                Subtotal: ₹{order.amount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyOrder;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}
