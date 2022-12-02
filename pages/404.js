import Link from "next/link";
import Head from "next/head";

const Custom404 = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-gray-500">
      <Head>
        <title>404 Not Found</title>
        <meta name="description" content="404 Not Found" />
      </Head>
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-orange-500 px-2 py-2 text-white text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <div className="relative inline-block text-sm font-medium text-orange-500 group active:text-orange-300 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-orange-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 text-white text-lg bg-gray-500 border border-current">
            <Link href="/">Back to Home</Link>
          </span>
        </div>
      </button>
    </main>
  );
};

export default Custom404;