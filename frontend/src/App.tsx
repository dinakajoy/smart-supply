import React, { Suspense, lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingIndicator from "./components/Loaders/Circular";
import reloadOnFail from "./utils/reloadOnFail";
import DashboardLayout from "./layouts/Dashboard";

const SignInPage = lazy(() => reloadOnFail(() => import("./pages/Signin")));
const ForgotPasswordPage = lazy(() =>
  reloadOnFail(() => import("./pages/ForgotPassword"))
);
const ResetPasswordPage = lazy(() =>
  reloadOnFail(() => import("./pages/ResetPassword"))
);

const Dashboard = lazy(() => reloadOnFail(() => import("./pages/Dashboard")));
const UserRole = lazy(() => reloadOnFail(() => import("./pages/UserRole")));
const Employees = lazy(() => reloadOnFail(() => import("./pages/Employees")));

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingIndicator />}>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
        </Suspense>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user-role" element={<UserRole />} />
            <Route path="employees" element={<Employees />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
