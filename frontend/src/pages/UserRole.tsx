import { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import DashboardNav from "../components/DashboardNav";
import SlideIn from "../components/SlideIn";
import { fetchData } from "../utils/apiRequests";
import { IPermission, IRole } from "../interfaces/others";
import CircularLoader from "../components/Loaders/Circular";
import Modal from "../components/Modal";

const UserRole = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [formType, setFormType] = useState("");
  const [selectedData, setSelectedData] = useState<IPermission | IRole | null>(
    null
  );

  const {
    data: permissionsData,
    error: permissionsError,
    isLoading: permissionsLoading,
  } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => fetchData("api/permissions"),
  });

  const {
    data: rolesData,
    error: rolesError,
    isLoading: rolesLoading,
  } = useQuery({
    queryKey: ["userRoles"],
    queryFn: () => fetchData("api/user-roles"),
  });

  const openSlide = (type: string, data: IPermission | IRole | null = null) => {
    setFormType(type);
    setSelectedData(data);
    setIsSlideOpen(true);
  };

  const openModal = (type: string, data: IPermission | IRole | null = null) => {
    setFormType(type);
    setSelectedData(data);
    setIsModalOpen(true);
  };

  if (permissionsLoading || rolesLoading) return <CircularLoader />;

  if (rolesError)
    return <p className="text-red-500">{(rolesError as Error).message}</p>;

  if (permissionsError)
    return (
      <p className="text-red-500">{(permissionsError as Error).message}</p>
    );

  return (
    <section className="w-full lg:w-[95%] xl:w-[90%]">
      <DashboardNav page="User Role" />
      {/* User Role Table */}
      <div className="my-12 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            User Roles
          </h6>
        </div>
        <div className="mb-4">
          <div className="flex justify-end mb-8 mr-4">
            <button
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
              onClick={() => openSlide("create-user-role")}
            >
              Create User Role
            </button>
          </div>
          <div className="relative flex flex-col bg-clip-border bg-white text-gray-700 overflow-hidden xl:col-span-2 border border-indigo-100 shadow-sm">
            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    <th className="border-b border-indigo-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-indigo-700">
                        Role
                      </p>
                    </th>
                    <th className="border-b border-indigo-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-indigo-700">
                        Members
                      </p>
                    </th>
                    <th className="border-b border-indigo-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-indigo-700">
                        Description
                      </p>
                    </th>
                    <th className="border-b border-indigo-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-indigo-700">
                        Actions
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rolesData.length > 0 &&
                    rolesData.payload.map((role: IRole) => (
                      <tr key={role._id} className="text-sm">
                        <td className="py-3 px-5 border-b border-indigo-50">
                          {role.role}
                        </td>
                        <td className="py-3 px-5 border-b border-indigo-50">
                          <img
                            src="/material-tailwind-dashboard-react/img/team-1.jpeg"
                            alt="Romina Hadid"
                            className="inline-block relative object-cover object-center !rounded-full w-6 h-6 rounded-md cursor-pointer border-2 border-white"
                          />
                          <img
                            src="/material-tailwind-dashboard-react/img/team-2.jpeg"
                            alt="Ryan Tompson"
                            className="inline-block relative object-cover object-center !rounded-full w-6 h-6 rounded-md cursor-pointer border-2 border-white -ml-2.5"
                          />
                          <img
                            src="/material-tailwind-dashboard-react/img/team-3.jpeg"
                            alt="Jessica Doe"
                            className="inline-block relative object-cover object-center !rounded-full w-6 h-6 rounded-md cursor-pointer border-2 border-white -ml-2.5"
                          />
                          <img
                            src="/material-tailwind-dashboard-react/img/team-4.jpeg"
                            alt="Alexander Smith"
                            className="inline-block relative object-cover object-center !rounded-full w-6 h-6 rounded-md cursor-pointer border-2 border-white -ml-2.5"
                          />
                        </td>
                        <td className="py-3 px-5 border-b border-indigo-50">
                          {role.description}
                        </td>
                        <td className="py-3 px-5 border-b border-indigo-50">
                          <div className="flex justify-center items-center gap-4">
                            <span className="text-blue-600 hover:text-blue-800 transition duration-300 cursor-pointer">
                              <SquarePen
                                onClick={() => {
                                  setSelectedData(role);
                                  openSlide("edit-user-role", role);
                                }}
                              />
                            </span>
                            <span className="text-red-600 hover:text-red-800 transition duration-300 cursor-pointer">
                              <Trash2
                                onClick={() => {
                                  openModal("delete-permission", role);
                                }}
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="mt-24">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
              Permissions
            </h6>
          </div>
          <div className="mb-4">
            <div className="flex justify-end mb-8 mr-4">
              <button
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
                onClick={() => openSlide("create-permission")}
              >
                Create Permission
              </button>
            </div>
            <div className="relative flex flex-col bg-white text-gray-700 overflow-hidden xl:col-span-2 border border-indigo-100 shadow-sm">
              <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      <th className="border-b border-indigo-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-indigo-400">
                          Name
                        </p>
                      </th>
                      <th className="border-b border-indigo-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-indigo-400">
                          Group
                        </p>
                      </th>
                      <th className="border-b border-indigo-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-indigo-400">
                          Description
                        </p>
                      </th>
                      <th className="border-b border-indigo-50 py-3 px-6 text-left">
                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-indigo-400">
                          Actions
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissionsData.length > 0 &&
                      permissionsData.payload.map((permission: IPermission) => (
                        <tr key={permission._id} className="text-sm">
                          <td className="py-3 px-5 border-b border-indigo-50">
                            {permission.name}
                          </td>
                          <td className="py-3 px-5 border-b border-indigo-50">
                            {permission.group}
                          </td>
                          <td className="py-3 px-5 border-b border-indigo-50">
                            {permission.description}
                          </td>
                          <td className="py-3 px-5 border-b border-indigo-50">
                            <div className="flex justify-center items-center gap-4">
                              <span className="text-blue-600 hover:text-blue-800 transition duration-300 cursor-pointer">
                                <SquarePen
                                  onClick={() => {
                                    setSelectedData(permission);
                                    openSlide("edit-permission", permission);
                                  }}
                                />
                              </span>
                              <span className="text-red-600 hover:text-red-800 transition duration-300 cursor-pointer">
                                <Trash2
                                  onClick={() => {
                                    openModal("delete-permission", permission);
                                  }}
                                />
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SlideIn Component */}
      <SlideIn
        isOpen={isSlideOpen}
        onClose={() => setIsSlideOpen(false)}
        formType={formType}
        initialData={selectedData}
      />

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType={formType}
        initialData={selectedData as IRole | IPermission | undefined}
      />
    </section>
  );
};

export default UserRole;
