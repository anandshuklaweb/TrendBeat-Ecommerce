import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Moment from "react-moment";
import "moment-timezone"; // require
import Head from "next/head";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem("myuser")).token,
        }),
      });
      let res = await a.json();
      setOrders(res.orders);
    };

    if (!localStorage.getItem("myuser")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>My Orders - TRENDBEAT</title>
        <meta name="description" content="My Orders - TRENDBEAT" />
      </Head>
      <div className="container mx-auto px-8 py-12">
        <h1 className="font-semibold text-2xl pb-8 text-center">My Orders</h1>

        <div className="overflow-x-auto relative">
          <table className="w-full my-4 text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700  bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" text-lg py-3 px-6 ">
                  #Order ID
                </th>
                <th scope="col" className=" text-lg py-3 px-6 ">
                  Date
                </th>
                <th scope="col" className=" text-lg py-3 px-6">
                  Email
                </th>
                <th scope="col" className=" text-lg py-3 px-6 ">
                  Amount
                </th>
                <th scope="col" className=" text-lg py-3 px-6 ">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => {
                return (
                  <tr
                    key={item._id}
                    className=" border-b-2 border-gray-200 bg-gray-100"
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.orderId}
                    </th>
                    <td className="py-4 px-6">
                      <Moment format="DD-MM-YYYY HH:mm">
                        {item.createdAt}
                      </Moment>
                    </td>
                    <td className="py-4 px-6">{item.email}</td>
                    <td className="py-4 px-6">₹{item.amount}</td>
                    <td className="py-4 px-6 font-semibold text-blue-400 cursor-pointer">
                      <Link href={"/order?id=" + item._id}>Details</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
