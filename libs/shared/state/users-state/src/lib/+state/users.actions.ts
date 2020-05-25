import { createAction, props } from '@ngrx/store';
import { UserEntity } from './users.models';

export const loadUsers = createAction(
  '[Users] Load Users',
  props<{ searchTerm: string; page: number; perPage: number }>()
);

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: UserEntity[], totalCount: number }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>()
);

export const selectAndGetUserDetail = createAction(
  '[Users] Select and Get User Detail',
  props<{ username: string }>()
);

export const selectAndGetUserDetailSuccess = createAction(
  '[Users] Select and Get User Detail Success',
  props<{ user: UserEntity }>()
);

export const selectAndGetUserDetailFailure = createAction(
  '[Users] Select and Get User Detail Failure',
  props<{ error: any }>()
);

export const resetSelected = createAction(
  '[Users] Reset Selected'
);

export const reset = createAction(
  '[Users] Reset'
);
