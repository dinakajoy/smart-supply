import React from "react";

type CircularLoaderProps = {
  size?: string;
  color?: string;
};

const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = "w-12 h-12",
  color = "text-purple-500",
}) => {
  return (
    <div className={`h-screen w-full flex items-center justify-center`}>
      <div
        className={`${size} border-4 border-t-transparent ${color} rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default CircularLoader;
