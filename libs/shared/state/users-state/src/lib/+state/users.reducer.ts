import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as UsersActions from './users.actions';
import { UserEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';

export interface State extends EntityState<UserEntity> {
  selectedId?: string | number; // which Users record has been selected
  loaded: boolean; // has the Users list been loaded
  error?: string | null; // last none error (if any)
  detailLoaded?: boolean;
  totalCount?: number | null;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: State;
}

export const usersAdapter: EntityAdapter<UserEntity> = createEntityAdapter<
  UserEntity
>();

export const initialState: State = usersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users, totalCount }) =>
    usersAdapter.upsertMany(users, { ...state, loaded: true, totalCount })
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.selectAndGetUserDetail, (state) => ({
    ...state,
    error: null,
    detailLoaded: false,
  })),
  on(UsersActions.selectAndGetUserDetailSuccess, (state, { user }) =>
    usersAdapter.upsertOne(user, {
      ...state,
      detailLoaded: true,
      selectedId: user.id,
    })
  ),
  on(UsersActions.selectAndGetUserDetailFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.reset, () => ({ ...initialState })),
  on(UsersActions.resetSelected, (state) => ({
    ...state,
    selectedId: undefined,
    detailLoaded: true,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return usersReducer(state, action);
}
