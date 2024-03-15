import React, { createContext, useContext, useReducer } from "react";
import AuthReducer from "../store/AuthReducer";
import { AuthState } from "../types";
import { AuthAction } from '../store/AuthActions';


const initialState: AuthState = {
  user: null,
  isFetching: false,
  error: "",
};

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
};


export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => {
    // not implemented
  },
});


export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children } : {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};