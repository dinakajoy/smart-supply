import React from "react";
import { Link } from "react-router-dom";
import { useTable, useSortBy, usePagination } from "react-table";
import { IEmployee } from "../interfaces/employee";
import { demoEmployees } from "../demo-data/employees";
import BreadCrumb from "../components/DashboardNav";
import { ArrowDownZA, ArrowUpAZ } from "lucide-react";

const Employee: React.FC = () => {
  const employees: IEmployee[] = demoEmployees;

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Department", accessor: "department" },
      { Header: "Role", accessor: "role" },
      {
        Header: "Status",
        accessor: "isActive",
        Cell: ({ value }: { value: boolean }) =>
          value ? "Active" : "Inactive",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable({ columns, data: employees }, useSortBy, usePagination);

  return (
    <>
      <BreadCrumb page="Employees" />
      {/* <div className="flex justify-end mb-5">
        <Link
          to="/employees/add"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Add Employee
        </Link>
      </div>
      <div className="my-12 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <table
          {...getTableProps()}
          className="w-full border-collapse table-auto"
        > */}
      <div className="my-12 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            Employees
          </h6>
        </div>
        <div className="mb-4">
          <div className="flex justify-end mb-8 mr-4">
            <button
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
              // onClick={() => openSlide("create-user-role")}
            >
              Add Employee
            </button>
          </div>
          <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 overflow-hidden xl:col-span-2 border border-indigo-100 shadow-sm">
            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
              <table
                {...getTableProps()}
                className="w-full min-w-[640px] table-auto"
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="cursor-pointer border-b border-indigo-50 py-3 px-6 text-left"
                        >
                          <div className="flex flex-row item-center">
                            <span className="antialiased font-sans text-[11px] font-medium uppercase text-indigo-700 mr-2">
                              {column.render("Header")}{" "}
                            </span>

                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ArrowDownZA className="w-4 h-4" />
                              ) : (
                                <ArrowUpAZ className="w-4 h-4" />
                              )
                            ) : (
                              ""
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} lassName="text-sm">
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="py-3 px-5 border-b border-indigo-50"
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={previousPage}
                disabled={!canPreviousPage}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {pageIndex + 1} of {pageOptions.length}
              </span>
              <button
                onClick={nextPage}
                disabled={!canNextPage}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
