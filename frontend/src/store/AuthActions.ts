import { User } from '../types';

export const LoginStart = () => ({
  type: "LOGIN_START" as const,
});
  
export const LoginSuccess = (user: User) => ({
  type: "LOGIN_SUCCESS" as const,
  payload: user,
});
  
export const LoginError = (error: string) => ({
  type: "LOGIN_ERROR" as const,
  payload: error,
});

export const UpdateUser = (user: User) => ({
  type: "UPDATE_USER" as const,
  payload: user,
});

export const DeleteUser = () => ({
  type: "DELETE_USER" as const,
});

export const LogOut = () => ({
  type: "LOGOUT" as const,
});


export type AuthAction =
  | ReturnType<typeof LoginStart>
  | ReturnType<typeof LoginSuccess>
  | ReturnType<typeof LoginError>
  | ReturnType<typeof UpdateUser>
  | ReturnType<typeof DeleteUser>
  | ReturnType<typeof LogOut>;
