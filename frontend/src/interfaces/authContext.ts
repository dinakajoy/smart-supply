import { IEmployeeWithoutPasswordAndRole } from "./employee";

export interface IAuthContextType {
  // Value that returns whether the user is authenticated
  isAuthenticated: boolean;

  // Function that sets user's authentication status
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;

  // Function that stores current loggedIn user
  setCurrentUser: React.Dispatch<React.SetStateAction<null>>;

  // Function that returns the current logged in user
  currentUser: IEmployeeWithoutPasswordAndRole | null;

  // Function that triggers the logout
  logout: () => void;

  // Function that triggers the session refresh
  refreshSession: () => void;
}
