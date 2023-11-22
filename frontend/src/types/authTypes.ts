import { User } from './index';
import { AuthAction } from '../store/AuthActions';

export interface AuthState {
  user: User | null;
  isFetching: boolean;
  error: string;
}