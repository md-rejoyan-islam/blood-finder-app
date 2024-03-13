import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <meta property="og:title" content="Not-found KIN-Blood" />
        <meta
          property="og:description"
          content="KIN Blood application not found page"
        />
        <title>Not-found | KIN</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center h-[calc(100vh-10px)]">
        <h1 className="text-6xl font-bold text-[#38bdf8]">404</h1>
        <p className="text-2xl font-bold text-[#38bdf8]">Page Not Found</p>
        <Link
          to={"/"}
          className="bg-violet-500 hover:bg-violet-600 mt-4 py-[6px] px-4 rounded-md"
        >
          Back Home
        </Link>
      </div>
    </>
  );
}
