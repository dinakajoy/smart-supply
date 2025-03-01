import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import UserRoleForm from "./UserRoleForm";
import PermissionForm from "./PermissionForm";

const SlideUserStats = ({
  isOpen,
  onClose,
  formType,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  formType: string;
  initialData: any;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Close the modal when clicking outside
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    const container = containerRef.current;

    const toggleVisibility = () => {
      if (container && container.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (container) {
      container.addEventListener("scroll", toggleVisibility);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", toggleVisibility);
      }
    };
  }, []);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="fixed top-0 right-0 w-full h-full bg-indigo-50 shadow-lg z-50 overflow-auto md:w-3/6"
      >
        {/* Sticky header */}
        <div className="sticky top-0 w-full bg-indigo-100 p-4 flex justify-between items-center z-50">
          <h3 className="text-lg font-semibold text-indigo-900">
            {formType.replace("-", " ").toUpperCase()}
          </h3>
          <button
            className="text-white text-xl cursor-pointer"
            onClick={onClose}
          >
            ✖
          </button>
        </div>
        {formType === "create-user-role" && <UserRoleForm />}
        {formType === "create-permission" && <PermissionForm />}
        {formType === "edit-permission" && (
          <PermissionForm initialData={initialData} />
        )}
        {formType === "edit-user-role" && (
          <UserRoleForm initialData={initialData} />
        )}

        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-[1000]"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </motion.div>
    </>
  );
};

export default SlideUserStats;
