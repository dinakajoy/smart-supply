import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IRole } from "../interfaces/others";
import { postOrPutData } from "../utils/apiRequests";

const RoleSchema = Yup.object().shape({
  slug: Yup.string().required("Slug is required"),
  role: Yup.string().required("Role is required"),
  description: Yup.string(),
  permissions: Yup.array()
    .of(Yup.string())
    .required("At least one permission is required"),
});

const availablePermissions = [
  { key: "view_users", name: "View Users" },
  { key: "edit_users", name: "Edit Users" },
  { key: "delete_users", name: "Delete Users" },
];

const UserRoleForm = ({ initialData }: { initialData?: IRole }) => {
  const queryClient = useQueryClient();

  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (newData) =>
      postOrPutData({
        url: initialData
          ? `api/user-roles/${initialData._id}`
          : "api/user-roles",
        operation: initialData ? "PUT" : "POST",
        data: newData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRoles"] });
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
          slug: initialData?.slug || "",
          role: initialData?.role || "",
          description: initialData?.description || "",
          permissions: initialData?.permissions || [],
        }}
        validationSchema={RoleSchema}
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
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-600">Slug</label>
              <Field
                type="text"
                name="slug"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter slug"
              />
              <ErrorMessage
                name="slug"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-600">Role</label>
              <Field
                type="text"
                name="role"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter role"
              />
              <ErrorMessage
                name="role"
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
              <label className="block text-gray-600">Permissions</label>
              <div className="border border-gray-300 rounded-lg p-2 mt-1">
                {availablePermissions.map((perm) => (
                  <label key={perm.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="permissions"
                      value={perm.key}
                      checked={values.permissions.includes(perm.key)}
                      onChange={(e) => {
                        const newPermissions = e.target.checked
                          ? [...values.permissions, perm.key]
                          : values.permissions.filter((p) => p !== perm.key);
                        setFieldValue("permissions", newPermissions);
                      }}
                      className="mr-2"
                    />
                    <span>{perm.name}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="permissions"
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

export default UserRoleForm;
