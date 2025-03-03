import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EmployeeForm: React.FC = () => {
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

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form Submitted", values);
  };

  return (
    <main className="flex-1 bg-gray-100 p-6 overflow-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Employee Form</h2>
      </div>
      {/* <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"> */}
      {/* <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
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
              <div className="flex items-center justify-between">
                <div>
                  <Field
                    name="address.streetNo"
                    placeholder="Street No"
                    className="input-field"
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
                    className="input-field"
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
                    className="input-field"
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
                    className="input-field"
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
                    className="input-field"
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
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {/* </div> */}
    </main>
  );
};

export default EmployeeForm;
