import axios from "axios";
import { Dispatch } from "react";
import { AuthAction } from "../store/AuthActions";

export const loginCall = async (userCredentials: { email: string; password: string }, dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.post(`/api/auth/login`, userCredentials);
    localStorage.setItem('user', JSON.stringify(response.data));
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    alert('Login successfully!');
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    dispatch({ type: "LOGIN_ERROR", payload: errorMessage });
    alert('Failed to login.');
  }
};
