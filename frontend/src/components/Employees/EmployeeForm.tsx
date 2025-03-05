import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ThreeDotsLoader from "../Loaders/ThreeDots";
import { IEmployee } from "../../interfaces/employee";
import { postOrPutData } from "../../utils/apiRequests";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female"], "Invalid gender")
    .required("Gender is required"),
  department: Yup.string().required("Department is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  mustResetPassword: Yup.boolean(),
  isActive: Yup.boolean(),
});

const EmployeeForm: React.FC = ({
  initialData,
}: {
  initialData?: IEmployee;
}) => {
  const queryClient = useQueryClient();

  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const mutation = useMutation<{ message: string }, Error, IEmployee>({
    mutationFn: (newData) =>
      postOrPutData({
        url: initialData ? `api/employees/${initialData._id}` : "api/employees",
        operation: initialData ? "PUT" : "POST",
        data: newData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  useEffect(() => {
    if (msg || error) {
      const timer = setTimeout(() => {
        setMsg(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [msg, error]);

  return (
    <div className="max-w-full mx-auto p-6 rounded-lg shadow-md">
      <Formik
        initialValues={{
          name: initialData?.name || "",
          email: initialData?.email || "",
          phone: initialData?.phone || "",
          gender: initialData?.gender || "",
          department: initialData?.department || "",
          role: initialData?.role || "",
          mustResetPassword: initialData ? false : true,
          isActive: initialData ? false : true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          mutation.mutate(values, {
            onSuccess: (data) => {
              resetForm();
              setMsg(data.message);
            },
            onError: (err) => {
              setError(err.message);
            },
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-600">Name</label>
              <Field
                name="name"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Phone</label>
              <Field
                name="phone"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Gender</label>
              <Field
                as="select"
                name="gender"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
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
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Department</label>
              <Field
                name="department"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
              <ErrorMessage
                name="department"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Role</label>
              <Field
                name="role"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
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
              <div className="text-center font-bold mt-1 bg-red-200 text-red-700 text-sm p-4 rounded-lg">
                <p>{error}</p>
              </div>
            )}

            {msg && (
              <div className="text-center font-bold mt-1 bg-green-200 text-green-700 text-sm p-4 rounded-lg">
                <p>{msg}</p>
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending ? (
                <ThreeDotsLoader size="w-2 h-2" color="bg-purple-300" />
              ) : (
                "Submit"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeForm;
