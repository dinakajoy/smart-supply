import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IPermission, IRole } from "../interfaces/others";

const DeleteSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const DeleteConfirmation = ({
  initialData,
}: {
  initialData: IRole | IPermission;
}) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (id: string, type: string) =>
      type === "role"
        ? deleteData(id, "api/user-roles")
        : deleteData(id, "api/permissions"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (error) => {
      console.error("Error deleting:", error);
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
    <div>
      <h2 className="font-semibold text-md mb-3">
        Are you sure you want to delete this?
      </h2>
      <h4 className="font-semibold text-sm">
        If yes, type in{" "}
        <span className="bg-gray-200 text-gray-800 p-2 rounded-lg font-bold">
          {initialData.name || initialData.role}
        </span>
      </h4>

      <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <Formik
          initialValues={{
            name: initialData?.name || initialData?.role || "",
          }}
          validationSchema={DeleteSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
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
              <div>
                <Field
                  type="text"
                  name="name"
                  className="w-full border border-red-300 outline-red-400 rounded-lg p-2 mt-1"
                  placeholder="Enter name"
                />
                <ErrorMessage
                  name="name"
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
                className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
