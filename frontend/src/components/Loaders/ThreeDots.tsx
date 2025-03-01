import React from "react";

type ThreeDotsLoaderProps = {
  size?: string;
  color?: string;
};

const ThreeDotsLoader: React.FC<ThreeDotsLoaderProps> = ({
  size = "w-4 h-4",
  color = "bg-purple-500",
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className={`${size} ${color} rounded-full animate-bounce`}
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className={`${size} ${color} rounded-full animate-bounce`}
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className={`${size} ${color} rounded-full animate-bounce`}
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );
};

export default ThreeDotsLoader;
