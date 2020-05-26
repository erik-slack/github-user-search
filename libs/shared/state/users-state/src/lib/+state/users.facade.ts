import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromUsers from './users.reducer';
import * as UsersSelectors from './users.selectors';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersFacade {
  loaded$ = this.store.pipe(select(UsersSelectors.getUsersLoaded));
  allUsers$ = this.store.pipe(select(UsersSelectors.getAllUsers));
  selectedUsers$ = this.store.pipe(select(UsersSelectors.getSelected));
  detailLoaded$ = this.store.pipe(select(UsersSelectors.getUserDetailLoaded));
  totalCount$ = this.store.pipe(select(UsersSelectors.getTotalCount));
  error$ = this.store.pipe(select(UsersSelectors.getUsersError));
  hasNoMoreResults$ = this.store.pipe(select(UsersSelectors.getHasNoMoreResults));

  constructor(private store: Store<fromUsers.UsersPartialState>) {}

  loadUsers(searchTerm: string, page: number, perPage: number) {
    this.dispatch(UsersActions.loadUsers({ searchTerm, page, perPage }));
  }

  selectUser(username: string) {
    this.dispatch(UsersActions.selectAndGetUserDetail({ username }));
  }

  resetSelected() {
    this.dispatch(UsersActions.resetSelected());
  }

  reset() {
    this.dispatch(UsersActions.reset());
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
