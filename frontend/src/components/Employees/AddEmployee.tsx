import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postOrPutData } from "../../utils/apiRequests";
import ThreeDotsLoader from "../Loaders/ThreeDots";

const EmployeeForm: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: {
      streetNo: "",
      street: "",
      town: "",
      state: "",
      country: "",
    },
    department: "",
    role: "",
    password: "",
    mustResetPassword: true,
    isActive: false,
    createdBy: "",
    updatedBy: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female"], "Invalid gender")
      .required("Gender is required"),
    address: Yup.object({
      streetNo: Yup.number().required("Street No is required"),
      street: Yup.string().required("Street is required"),
      town: Yup.string().required("Town is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
    }),
    department: Yup.string().required("Department is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    mustResetPassword: Yup.boolean(),
    isActive: Yup.boolean(),
    createdBy: Yup.string().required("Created By is required"),
    updatedBy: Yup.string().required("Updated By is required"),
  });

  // const handleSubmit = async (values: typeof initialValues) => {
  const handleSubmit = async (values) => {
    console.log("================ jjjj", values);
    // try {
    //   const response = await postOrPutData(
    //     "api/employees",
    //     { ...values },
    //     "POST"
    //   );
    //   if (response.status === "error" || response.errors) {
    //     setError(
    //       Array.isArray(response.errors || response.error)
    //         ? response.errors[0].msg || response.error[0].msg
    //         : response.errors || response.error
    //     );
    //     return;
    //   } else {
    //     setMessage("Employee added successfully!");
    //   }
    // } catch (error) {
    //   console.log("error", error);
    // }
  };

  return (
    <main className="flex-1 bg-gray-100 p-6 overflow-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Employee Form</h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 shadow rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <Field name="name" className="w-full border p-2 rounded" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <Field name="phone" className="w-full border p-2 rounded" />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <Field
                as="select"
                name="gender"
                className="w-full border p-2 rounded text-gray-500"
              >
                <option className="text-red-500" value="">
                  Select Gender
                </option>
                <option className="text-red-500" value="Male">
                  Male
                </option>
                <option className="text-red-500" value="Female">
                  Female
                </option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Department</label>
              <Field name="department" className="w-full border p-2 rounded" />
              <ErrorMessage
                name="department"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <Field name="role" className="w-full border p-2 rounded" />
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-6 mt-2">
              <label className="block text-gray-700">Address</label>
              <div className="flex justify-between gap-2">
                <div>
                  <Field
                    name="address.streetNo"
                    placeholder="Street No"
                    className="input-field border p-1 rounded"
                  />
                  <ErrorMessage
                    name="address.streetNo"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div>
                  <Field
                    name="address.street"
                    placeholder="Street"
                    className="input-field border p-1 rounded"
                  />
                  <ErrorMessage
                    name="address.street"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    name="address.town"
                    placeholder="Town"
                    className="input-field border p-1 rounded"
                  />
                  <ErrorMessage
                    name="address.town"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    name="address.state"
                    placeholder="State"
                    className="input-field border p-1 rounded"
                  />
                  <ErrorMessage
                    name="address.state"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    name="address.country"
                    placeholder="Country"
                    className="input-field border p-1 rounded"
                  />
                  <ErrorMessage
                    name="address.country"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-6 mb-4">
              <label className="flex items-center text-gray-700">
                <Field
                  type="checkbox"
                  name="mustResetPassword"
                  className="mr-2"
                />{" "}
                Must Reset Password
              </label>
              <label className="flex items-center text-gray-700">
                <Field type="checkbox" name="isActive" className="mr-2" />{" "}
                Active
              </label>
            </div>
            {error && (
              <div className="text-center font-bold mt-1 text-red-500 text-sm">
                <p>{error}</p>
              </div>
            )}
            {message && (
              <div className="text-center font-bold mt-1 text-green-500 text-sm">
                <p>{message}</p>
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ThreeDotsLoader size="w-2 h-2" color="bg-purple-300" />
              ) : (
                "Submitddddd"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default EmployeeForm;
