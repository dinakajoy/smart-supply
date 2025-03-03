import { faHome, faUsers, faUserTie } from "@fortawesome/free-solid-svg-icons";

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
    slug: "employees",
    path: "/employees",
  },
];

export default menuItems;
