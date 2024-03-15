import { User } from './index';
import { AuthAction } from '../store/AuthActions';

export type AuthState = {
  user: User | null;
  isFetching: boolean;
  error: string;
}