import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { demoEmployees } from "../demo-data/employees";
import BreadCrumb from "../components/DashboardNav";
import { SquarePen, Trash2 } from "lucide-react";
import SlideIn from "../components/SlideIn";
import EmployeeForm from "../components/Employees/EmployeeForm";
import { IEmployee } from "../interfaces/employee";
import DeleteConfirmation from "../components/Employees/DeleteConfirmation";
import Modal from "../components/Modal";

const Employee: React.FC = () => {
  const employees: IEmployee[] = demoEmployees;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [formType, setFormType] = useState("");
  const [selectedData, setSelectedData] = useState<IEmployee | null>(null);

  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "gender", header: "Gender" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "role", header: "Role" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-4">
          <span
            className="text-blue-600 hover:text-blue-800 transition duration-300 cursor-pointer"
            onClick={() => {
              setSelectedData(row.original);
              openSlide("edit-employee", row.original);
            }}
          >
            <SquarePen />
          </span>
          <span
            className="text-red-600 hover:text-red-800 transition duration-300 cursor-pointer"
            onClick={() => {
              setSelectedData(row.original);
              openModal("delete-employee", row.original);
            }}
          >
            <Trash2 />
          </span>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    // data: employees?.payload ?? [],
    data: employees ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const openSlide = (type: string, data: IEmployee | null = null) => {
    setFormType(type);
    setSelectedData(data);
    setIsSlideOpen(true);
  };

  const openModal = (type: string, data: IEmployee | null = null) => {
    setFormType(type);
    setSelectedData(data);
    setIsModalOpen(true);
  };

  return (
    <>
      <BreadCrumb page="Employees" />
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
              onClick={() => openSlide("add-employee")}
            >
              Add Employee
            </button>
          </div>
          <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 overflow-hidden xl:col-span-2 border border-indigo-100 shadow-sm">
            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-gray-100">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="border-b border-blue-gray-50 py-3 px-6 text-left"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="text-sm hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="py-3 px-5 border-b border-blue-gray-50"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* SlideIn Component */}
      <SlideIn
        isOpen={isSlideOpen}
        onClose={() => setIsSlideOpen(false)}
        formType={formType}
      >
        {formType === "add-employee" && <EmployeeForm />}
        {formType === "edit-employee" && (
          <EmployeeForm initialData={selectedData as IEmployee | undefined} />
        )}
      </SlideIn>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType={formType}
      >
        {formType === "delete-employee" && (
          <DeleteConfirmation
            id={selectedData?._id || ""}
            name={selectedData?.name || ""}
            close={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </>
  );
};

export default Employee;
