import {
  faHome,
  faUsers,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  {
    title: "Dashboard",
    slug: "dashboard",
    path: "/dashboard",
    icon: faHome,
  },
  {
    title: "Roles and Permissions",
    slug: "roles-permissions",
    path: "/user-role",
    icon: faUserTie,
  },
  {
    title: "Employees",
    icon: faUsers,
    children: [
      {
        title: "Employees",
        slug: "employees",
        path: "/employees",
      },
      {
        title: "Attendance Records",
        slug: "attendance",
        path: "/employees/attendance",
      },
      {
        title: "Performance",
        slug: "performance",
        path: "/employees/performance",
      },
      {
        title: "Payroll",
        slug: "payroll",
        path: "/employees/payroll",
      },
    ],
  },
];

export default menuItems;
