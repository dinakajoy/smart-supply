import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import menuItems from "../utils/routes";

const Sidebar = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };
  return (
    <aside
      className={`bg-white shadow-sm fixed inset-0 z-50 m-4
      h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300
      xl:translate-x-0 border border-indigo-100 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-80"
      }`}
    >
      <div className="relative py-6 px-6 text-center">
        <h1 className="block antialiased tracking-normal font-sans text-xl font-bold leading-relaxed text-indigo-900">
          AGRICORE ERP
        </h1>
      </div>
      <div className="m-4">
        <nav>
          <ul className="mb-4 flex flex-col gap-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.children ? (
                  <>
                    <div
                      className="flex items-center justify-between w-full py-2 rounded hover:bg-indigo-500/10"
                      onClick={() => toggleDropdown(item.title)}
                    >
                      <button className="cursor-pointer align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-indigo-900 active:bg-indigo-500/30 w-full flex items-center gap-4 px-4 capitalize">
                        {item.icon && (
                          <FontAwesomeIcon
                            icon={item.icon}
                            className="w-5 h-5 text-inherit"
                          />
                        )}
                        <span className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                          {item.title}
                        </span>
                      </button>
                      <button className="cursor-pointer ">
                        {openDropdown === item.title ? (
                          <ChevronDown />
                        ) : (
                          <ChevronRight />
                        )}
                      </button>
                    </div>
                    {openDropdown === item.title && (
                      <ul className="ml-4 my-3 border-l border-indigo-600">
                        {item.children.map((subItem, subIndex) => (
                          <li key={subIndex} className="mb-1">
                            <Link
                              to={subItem.path}
                              className="block px-3 py-1 rounded  text-indigo-700 hover:text-indigo-500"
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path as string}
                    className="align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-indigo-900 hover:bg-indigo-500/10 active:bg-indigo-500/30 w-full flex items-center gap-4 px-4 capitalize"
                  >
                    {item.icon && (
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="w-5 h-5 text-inherit"
                      />
                    )}
                    <span className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      {item.title}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
