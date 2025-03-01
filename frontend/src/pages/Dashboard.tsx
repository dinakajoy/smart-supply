import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faShoppingCart,
  faTruck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { withAuthContext } from "../context/auth/AuthContext";
import { IAuthContextType } from "../interfaces/authContext";
import { data, data2, options } from "../utils/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type authProps = {
  authContext: IAuthContextType;
};

const DashboardWithAuth = ({ authContext }: authProps) => {
  console.log("============", authContext);
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [120, 190, 300, 250, 220, 400],
        backgroundColor: "rgba(93, 102, 255, 0.8)",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Sales Overview",
      },
    },
  };

  const tableData = [
    { id: 1, name: "Product A", sales: 150, revenue: "$450" },
    { id: 2, name: "Product B", sales: 200, revenue: "$600" },
    { id: 3, name: "Product C", sales: 120, revenue: "$360" },
    { id: 3, name: "Product C", sales: 120, revenue: "$360" },
    { id: 3, name: "Product C", sales: 120, revenue: "$360" },
    { id: 3, name: "Product C", sales: 120, revenue: "$360" },
    { id: 3, name: "Product C", sales: 120, revenue: "$360" },
    { id: 3, name: "Product C", sales: 120, revenue: "$360" },
    { id: 3, name: "Product C", sales: 120, revenue: "$360" },
    { id: 3, name: "Product C", sales: 120, revenue: "$360" },
  ];

  return (
    <section className="w-full lg:w-[95%] xl:w-[90%]">
      <header className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
        <p className="text-gray-600">Welcome back, Admin!</p>
      </header>
      {/* Charts */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-indigo-100 shadow-sm">
          <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
            <FontAwesomeIcon icon={faBox} className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <h4 className="block antialiased font-sans text-sm leading-normal font-normal text-indigo-800">
              Today's Money
            </h4>
            <p className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-indigo-900">
              $53k
            </p>
          </div>
          <div className="border-t border-indigo-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-indigo-600">
              <strong className="text-green-500">+55%</strong>&nbsp;than last
              week
            </p>
          </div>
        </div>

        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-indigo-100 shadow-sm">
          <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="w-6 h-6 text-white"
            />
          </div>
          <div className="p-4 text-right">
            <h4 className="block antialiased font-sans text-sm leading-normal font-normal text-indigo-800">
              Pending Orders
            </h4>
            <p className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-indigo-900">
              $13k
            </p>
          </div>
          <div className="border-t border-indigo-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-indigo-600">
              <strong className="text-green-500">+30%</strong>&nbsp;than last
              week
            </p>
          </div>
        </div>

        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-indigo-100 shadow-sm">
          <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
            <FontAwesomeIcon icon={faTruck} className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <h4 className="block antialiased font-sans text-sm leading-normal font-normal text-indigo-800">
              Total Suppliers
            </h4>
            <p className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-indigo-900">
              $6k
            </p>
          </div>
          <div className="border-t border-indigo-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-indigo-600">
              <strong className="text-red-500">-2%</strong>&nbsp;than last week
            </p>
          </div>
        </div>

        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-indigo-100 shadow-sm">
          <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
            <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <h4 className="block antialiased font-sans text-sm leading-normal font-normal text-indigo-800">
              Total Clients
            </h4>
            <p className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-indigo-900">
              16
            </p>
          </div>
          <div className="border-t border-indigo-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-indigo-600">
              <strong className="text-green-500">+20%</strong>&nbsp;than last
              week
            </p>
          </div>
        </div>
      </div>

      {/* Charts and Stats */}
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        {/* Placeholder for Other Stats */}
        <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
          <Line options={options} data={data2} />
        </div>

        <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
          <Pie data={data} />
        </div>
      </div>

      {/* Table */}
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 border border-indigo-100 shadow-sm">
          <h3 className="p-6 text-lg font-semibold text-gray-800">
            Recent Sales
          </h3>
          <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-indigo-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase text-indigo-800">
                      #
                    </p>
                  </th>
                  <th className="border-b border-indigo-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase text-indigo-800">
                      Product
                    </p>
                  </th>
                  <th className="border-b border-indigo-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase text-indigo-800">
                      Sales
                    </p>
                  </th>
                  <th className="border-b border-indigo-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase text-indigo-800">
                      Revenue
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr key={item.id} className="text-sm">
                    <td className="py-3 px-5 border-b border-indigo-50">
                      {item.id}
                    </td>
                    <td className="py-3 px-5 border-b border-indigo-50">
                      {item.name}
                    </td>
                    <td className="py-3 px-5 border-b border-indigo-50">
                      {item.sales}
                    </td>
                    <td className="py-3 px-5 border-b border-indigo-50">
                      {item.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-indigo-100 shadow-sm">
          <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-indigo-900 mb-2">
              Orders Overview
            </h6>
            <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                aria-hidden="true"
                className="h-3.5 w-3.5 text-green-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                ></path>
              </svg>
              <strong>24%</strong> this month
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="flex items-start gap-4 py-3">
              <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-indigo-50 after:content-[''] after:h-4/6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="!w-5 !h-5 text-indigo-300"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="antialiased font-sans text-sm leading-normal text-indigo-900 block font-medium">
                  $2400, Design changes
                </p>
                <span className="block antialiased font-sans text-xs font-medium text-indigo-500">
                  22 DEC 7:20 PM
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4 py-3">
              <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-indigo-50 after:content-[''] after:h-4/6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="!w-5 !h-5 text-indigo-300"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="antialiased font-sans text-sm leading-normal text-indigo-900 block font-medium">
                  New order #1832412
                </p>
                <span className="block antialiased font-sans text-xs font-medium text-indigo-500">
                  21 DEC 11 PM
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4 py-3">
              <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-indigo-50 after:content-[''] after:h-4/6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="!w-5 !h-5 text-indigo-300"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"></path>
                </svg>
              </div>
              <div>
                <p className="antialiased font-sans text-sm leading-normal text-indigo-900 block font-medium">
                  Server payments for April
                </p>
                <span className="block antialiased font-sans text-xs font-medium text-indigo-500">
                  21 DEC 9:34 PM
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4 py-3">
              <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-indigo-50 after:content-[''] after:h-4/6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="!w-5 !h-5 text-indigo-300"
                >
                  <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="antialiased font-sans text-sm leading-normal text-indigo-900 block font-medium">
                  New card added for order #4395133
                </p>
                <span className="block antialiased font-sans text-xs font-medium text-indigo-500">
                  20 DEC 2:20 AM
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4 py-3">
              <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-indigo-50 after:content-[''] after:h-4/6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="!w-5 !h-5 text-indigo-300"
                >
                  <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z"></path>
                </svg>
              </div>
              <div>
                <p className="antialiased font-sans text-sm leading-normal text-indigo-900 block font-medium">
                  Unlock packages for development
                </p>
                <span className="block antialiased font-sans text-xs font-medium text-indigo-500">
                  18 DEC 4:54 AM
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4 py-3">
              <div className="relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-indigo-50 after:content-[''] after:h-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="!w-5 !h-5 text-indigo-300"
                >
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                    clip-rule="evenodd"
                  ></path>
                  <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                </svg>
              </div>
              <div>
                <p className="antialiased font-sans text-sm leading-normal text-indigo-900 block font-medium">
                  New order #9583120
                </p>
                <span className="block antialiased font-sans text-xs font-medium text-indigo-500">
                  17 DEC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Dashboard = withAuthContext(DashboardWithAuth);

export default Dashboard;
