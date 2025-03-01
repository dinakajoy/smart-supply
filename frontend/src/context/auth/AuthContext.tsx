import * as React from "react";
import { IAuthContextType } from "../../interfaces/authContext";

export const AuthContext = React.createContext<IAuthContextType>({
  isAuthenticated: false,
  currentUser: null,
  setCurrentUser: () => {},
  setIsAuthenticated: () => {},
  logout: () => {},
  refreshSession: () => {},
});


export function useAuthContext() {
  return React.useContext(AuthContext);
}

export function withAuthContext<T extends object>(
  WrappedComponent: React.ComponentType<T & { authContext: IAuthContextType }>
) {
  return function WithAuthContext(props: T) {
    return (
      <AuthContext.Consumer>
        {(state) => <WrappedComponent {...props} authContext={state} />}
      </AuthContext.Consumer>
    );
  };
}
