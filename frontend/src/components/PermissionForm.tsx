import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRoleType } from "../constants";
import { postOrPutData } from "../utils/apiRequests";
import { IPermission } from "../interfaces/others";

// Validation Schema using Yup
const PermissionSchema = Yup.object().shape({
  key: Yup.string().required("Key is required"),
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  group: Yup.mixed<UserRoleType>()
    .oneOf(Object.values(UserRoleType), "Invalid group selection")
    .required("Group is required"),
});

const PermissionForm = ({ initialData }: { initialData?: IPermission }) => {
  const queryClient = useQueryClient();

  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (newData) =>
      postOrPutData({
        url: initialData
          ? `api/permissions/${initialData._id}`
          : "api/permissions",
        operation: initialData ? "PUT" : "POST",
        data: newData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [msg, error]);

  return (
    <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md">
      <Formik
        initialValues={{
          key: initialData?.key || "",
          name: initialData?.name || "",
          description: initialData?.description || "",
          group: initialData?.group || ("" as UserRoleType),
        }}
        validationSchema={PermissionSchema}
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
          <Form className="space-y-12">
            <div>
              <label className="block text-gray-600">Key</label>
              <Field
                type="text"
                name="key"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter key"
              />
              <ErrorMessage
                name="key"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-600">Name</label>
              <Field
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-600">Description</label>
              <Field
                as="textarea"
                name="description"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter description"
                rows={3}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-600">Group</label>
              <Field
                as="select"
                name="group"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              >
                <option value="">Select a group</option>
                {Object.values(UserRoleType).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="group"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
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
              className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PermissionForm;
