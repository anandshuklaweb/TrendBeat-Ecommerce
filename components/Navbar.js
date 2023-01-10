import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/router";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);

    let exempted = [
      "/myaccount",
      "/about",
      "/contact",
      "/returnpolicy",
      "/privacypolicy",
      "/shippingpolicy",
      "/termsandconditions",
      "/checkout",
      "/order",
      "/orders",
      "/admin",
      "/admin/allproducts",
      "/admin/add",
      "/admin/orders",
      "/admin/order",
    ];

    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, []);

  const toggleCart = () => {
    setSidebar(!sidebar);
  };

  const ref = useRef();

  return (
    <>
      {!sidebar && (
        <span
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
          className="fixed right-10 top-4 z-30 cursor-pointer"
        >
          {dropdown && (
            <div className="absolute right-3 top-6 py-4 bg-white shadow-lg border rounded-md px-5 w-32 z-20">
              <ul>
                <Link href={"/myaccount"}>
                  <li className="py-1 font-semibold text-sm hover:text-blue-700">
                    My Account
                  </li>
                </Link>
                <Link href={"/orders"}>
                  <li className="py-1 font-semibold text-sm hover:text-blue-700">
                    My Orders
                  </li>
                </Link>

                <li
                  onClick={logout}
                  className="py-1 font-semibold text-sm hover:text-blue-700"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}

          {user.value && (
            <MdAccountCircle className="text-xl md:text-2xl mx-3" />
          )}
        </span>
      )}

      <div
        className={`flex flex-col md:flex-row md:justify-start justify-between md:items-center py-4  shadow-md sticky top-0 bg-white z-10 ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <div className="logo mx-5">
          <Link href={"/"}>
            <img src="/logo.png" width={200} alt="Logo" />
          </Link>
        </div>

        <div className="nav my-0 mx-auto">
          <ul className="flex items-center space-x-8 font-semibold md:text-lg">
            <Link href={"/tshirts"} className="hover:text-blue-400">
              <li>Tshirts</li>
            </Link>
            <Link href={"/jackets"} className="hover:text-blue-400">
              <li>Jackets</li>
            </Link>
            <Link href={"/jeans"} className="hover:text-blue-400">
              <li>Jeans</li>
            </Link>
            <Link href={"/kurta"} className="hover:text-blue-400">
              <li>Kurta</li>
            </Link>
          </ul>
        </div>

        <div className="cursor-pointer items-center cart absolute right-0 mx-5 top-4 flex">
          {!user.value && (
            <Link href={"/login"}>
              <button className="bg-blue-600 px-2 py-1 rounded-md text-sm text-white mx-2">
                Login
              </button>
            </Link>
          )}

          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="text-xl md:text-2xl"
          />
        </div>

        <div
          ref={ref}
          className={`sidecart overflow-y-scroll lg:w-[500px] w-96 h-[100vh] absolute top-0 bg-blue-200 px-8 py-10  transition-all ${
            sidebar ? ` right-0` : `-right-96 lg:-right-[500px]`
          }`}
        >
          <h2 className="font-bold text-2xl">Shopping Cart</h2>
          <span
            onClick={toggleCart}
            className="absolute top-4 right-2 cursor-pointer text-blue-600 text-xl"
          >
            <AiFillCloseCircle />
          </span>
          <ol className="list-decimal ml-15 font-semibold">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 text-base font-semibold">
                Your cart is empty
              </div>
            )}

            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className="w-2/3 font-semibold">
                      {cart[k].name} ({cart[k].size} / {cart[k].variant})
                    </div>
                    <div className=" flex items-center font-semibold justify-center w-1/3 text-lg">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-blue-600"
                      />
                      <span className="mx-2 text-sm">{cart[k].qty}</span>
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-blue-600"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="font-bold my-8">Subtotal: ₹{subTotal}</div>

          <div className="flex">
            <Link href={"/checkout"}>
              <button
                disabled={Object.keys(cart).length == 0}
                className="disabled:bg-blue-300 flex mr-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
              >
                <BsFillBagCheckFill className="m-1 mr-2" />
                Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              disabled={Object.keys(cart).length == 0}
              className="disabled:bg-blue-300 flex mx-2 text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
