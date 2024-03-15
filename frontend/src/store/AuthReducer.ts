import { AuthAction } from "./AuthActions";
import { AuthState } from "../types/authType";


const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch(action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: "",
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: "",
      };
    case "LOGIN_ERROR":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'DELETE_USER':
      return {
        ...state,
        user: null,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

export default AuthReducer;
