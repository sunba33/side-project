import { createAction, props } from '@ngrx/store';

export const login = createAction('[User] Login', props<{ token: string; }>());
export const logout = createAction('[User] Logout');
