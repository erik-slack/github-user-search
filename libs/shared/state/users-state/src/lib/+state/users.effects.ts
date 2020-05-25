import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as fromUsers from './users.reducer';
import * as UsersActions from './users.actions';
import { UserEntity } from './users.models';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      fetch({
        run: (action) => {
          const url = `https://api.github.com/search/users?q=${action.searchTerm}&page=${action.page}&per_page=${action.perPage}`;
          return this.http.get(url)
            .pipe(map((response: GetUsersResponse) => {
              console.log('response', response);
              return UsersActions.loadUsersSuccess({ users: response.items, totalCount: response.total_count });
            }));
        },

        onError: (action, error) => {
          console.error('Error', error);
          return UsersActions.loadUsersFailure({ error });
        },
      })
    )
  );

  getUserDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.selectAndGetUserDetail),
      fetch({
        id: (action) => action.username,
        run: (action) => {
          const url = `https://api.github.com/users/${action.username}`;
          return this.http.get(url)
            .pipe(map((response: UserEntity) => {
              console.log('response', response);
              return UsersActions.selectAndGetUserDetailSuccess({ user: response });
            }));
        },

        onError: (action, error) => {
          console.error('Error', error);
          return UsersActions.selectAndGetUserDetailFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

}

interface GetUsersResponse {
  incomplete_results: boolean;
  items: UserEntity[];
  total_count: number;
}
