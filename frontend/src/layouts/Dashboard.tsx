import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMenu}
        className="cursor-pointer md:hidden absolute top-6 right-6 z-50 bg-blue-gray-50 text-white p-2 rounded-md"
      >
        <Menu size={24} />
      </button>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Left Sidebar */}
      <Sidebar isMenuOpen={isMenuOpen} />

      {/* Main Content */}
      <div className="p-4 xl:ml-80">
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
