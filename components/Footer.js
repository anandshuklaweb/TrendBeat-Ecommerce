import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <footer className="text-white bg-[#172337] body-font">
        <div className="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              href={"/"}
              className="flex title-font font-medium items-center md:justify-start justify-center pb-4 text-gray-900"
            >
              <Image src="/logo.png" alt="" width={200} height={40} />
            </Link>

            <p className=" text-sm tracking-wider text-white px-2">
              A Lifestyle Brand that started in 2024 with a single idea of
              bringing SWAG in whatever we offer to our Consumers.
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-[#2874F0] tracking-widest text-sm mb-3">
                SHOP
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    href={"/tshirts"}
                    className="text-white text-sm hover:text-[#ffb800]"
                  >
                    Tshirts
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/jackets"}
                    className="text-white text-sm hover:text-[#ffb800]"
                  >
                    Jackets
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/jeans"}
                    className="text-white text-sm hover:text-[#ffb800]"
                  >
                    Jeans
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/kurta"}
                    className="text-white text-sm hover:text-[#ffb800]"
                  >
                    Kurtas
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-[#2874F0] tracking-widest text-sm mb-3">
                CUSTOMER SERVICE
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    href={"/about"}
                    className="text-white text-sm hover:text-[#ffb800]"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/contact"}
                    className="text-white text-sm hover:text-[#ffb800]"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/returnpolicy"}
                    className="text-white text-sm hover:text-[#ffb800]"
                  >
                    Return Policy
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-[#2874F0] tracking-widest text-sm mb-3">
                POLICY
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    href={"/privacypolicy"}
                    className="text-white text-sm hover:text-[#ffb800]"
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    href={"/shippingpolicy"}
                    className="text-white text-sm hover:text-[#ffb800]"
                  >
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/termsandconditions"}
                    className="text-white text-sm hover:text-[#ffb800]"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <nav className="list-none ">
                <img src="/pay.png" />
              </nav>
            </div>
          </div>
        </div>

        <div className="bg-[#121d30] border-gray-500 border-t-2">
          <div className="container  my-0 mx-auto  py-4 ">
            <p className=" text-gray-300 text-sm text-center ">
              © 2024 -
              <Link href="/" className="text-gray-300 ml-1">
                TrendBeat
              </Link>
              {"  "}
              All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
