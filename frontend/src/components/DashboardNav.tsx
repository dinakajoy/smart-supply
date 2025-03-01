import { Link } from "react-router-dom";

const DashboardNav = ({ page }: { page: string }) => {
  return (
    <div className="capitalize mb-6">
      <nav aria-label="breadcrumb" className="w-max">
        <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
          <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
            <Link
              to="/dashboard"
              className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
            >
              dashboard
            </Link>
            <span className="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
              /
            </span>
          </li>
          <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal transition-colors duration-300 hover:text-light-blue-500">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {page}
            </p>
          </li>
        </ol>
      </nav>
      <h6 className="block antialiased tracking-normal font-sans text-lg font-semibold leading-relaxed text-blue-gray-900">
        {page}
      </h6>
    </div>
  );
};

export default DashboardNav;
