import { createReducer, on } from '@ngrx/store';
import { UserModel } from '../../core/models/auth.model';
import { login, logout } from './user.actions';

export const initialState: UserModel = { token: '' };

export const userReducer = createReducer(
  initialState,
  on(login, (state, { token }) => ({ ...state, token })),
  on(logout, (state) => ({ ...state, token: '' })),
);
