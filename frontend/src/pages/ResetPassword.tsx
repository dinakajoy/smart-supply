import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AuthLayout from "../layouts/Auth";
import ThreeDotsLoader from "../components/Loaders/ThreeDots";
import { postOrPutData } from "../utils/apiRequests";

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    const { newPassword, confirmPassword } = values;
    if (newPassword === "" || confirmPassword === "") {
      setError("Please fill in all fields");
      return;
    }
    try {
      const userJson = await postOrPutData(
        "auth/reset-password",
        { newPassword, confirmPassword },
        "POST"
      );
      if (userJson.status === "error") {
        setError(
          Array.isArray(userJson.errors || userJson.error)
            ? userJson.errors[0].msg || userJson.error[0].msg
            : userJson.errors || userJson.error
        );
      } else {
        setAlert(userJson.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <AuthLayout title="Reset Password">
      <Formik
        initialValues={initialValues}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            {alert && (
              <div className="text-center font-bold mt-1 text-green-500 text-sm">
                <p>{alert}</p>
              </div>
            )}
            <div className="relative">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="flex items-center mt-1">
                <Field
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  className={`block w-full px-3 py-2 border ${
                    errors.newPassword && touched.newPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 text-gray-500 focus:outline-none"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <ErrorMessage
                name="newPassword"
                component="p"
                className="mt-1 text-red-500 text-sm"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="flex items-center mt-1">
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`block w-full px-3 py-2 border ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 text-gray-500 focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="mt-1 text-red-500 text-sm"
              />
            </div>
            {error && (
              <div className="text-center font-bold mt-1 text-red-500 text-sm">
                <p>{error}</p>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ThreeDotsLoader size="w-2 h-2" color="bg-indigo-300" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ResetPassword;
