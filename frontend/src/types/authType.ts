import { User } from './index';

export type AuthState = {
  user: User | null;
  isFetching: boolean;
  error: string;
}