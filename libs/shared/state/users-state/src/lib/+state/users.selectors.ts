import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  USERS_FEATURE_KEY,
  State,
  UsersPartialState,
  usersAdapter,
} from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const getUsersState = createFeatureSelector<UsersPartialState, State>(
  USERS_FEATURE_KEY
);

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const getUsersLoaded = createSelector(
  getUsersState,
  (state: State) => state.loaded
);

export const getUsersError = createSelector(
  getUsersState,
  (state: State) => state.error
);

export const getAllUsers = createSelector(getUsersState, (state: State) =>
  selectAll(state)
);

export const getUsersEntities = createSelector(getUsersState, (state: State) =>
  selectEntities(state)
);

export const getIds = createSelector(
  getUsersState,
  (state: State) => state.ids
);

export const getSelectedId = createSelector(
  getUsersState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getUsersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getUserDetailLoaded = createSelector(
  getUsersState,
  (state: State) => state.detailLoaded
);

export const getTotalCount = createSelector(
  getUsersState,
  (state: State) => state.totalCount
);


export const getHasNoMoreResults = createSelector(
  getTotalCount,
  getIds,
  (totalCount, ids) => totalCount <= ids.length
);

