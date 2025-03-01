import { ReactNode } from "react";

type AuthProps = {
  title: string;
  children: ReactNode;
};

const AuthLayout = ({ title, children }: AuthProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100">
      <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl mb-4 text-center font-bold text-indigo-600">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
