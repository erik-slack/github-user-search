import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { UserEntity } from './users.models';
import { UsersEffects } from './users.effects';
import { UsersFacade } from './users.facade';

import * as UsersSelectors from './users.selectors';
import * as UsersActions from './users.actions';
import {
  USERS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './users.reducer';
import { of } from 'rxjs';

interface TestSchema {
  users: State;
}

describe('UsersFacade', () => {
  let facade: UsersFacade;
  let store: Store<TestSchema>;
  const usersFacadeMock = {
    allUsers$: of([]),
    loaded$: of(false)
  };
  const createUserEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      login: '',
      node_id: '',
      avatar_url: '',
      gravatar_id: '',
      url: '',
      html_url: '',
      followers_url: '',
      following_url: '',
      gists_url: '',
      starred_url: '',
      subscriptions_url: '',
      organizations_url: '',
      repos_url: '',
      events_url: '',
      received_events_url: '',
      type: '',
      site_admin: false,
      company: '',
      blog: '',
      location: '',
      email: '',
      hireable: false,
      bio: '',
      public_repos: 0,
      public_gists: 0,
      followers: 0,
      following: 0,
      created_at: '',
      updated_at: ''
    } as UserEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(USERS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([UsersEffects]),
        ],
        providers: [
          {provide: UsersFacade, useValue: usersFacadeMock}
        ]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(UsersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allUsers$);
        let isLoaded = await readFirst(facade.loaded$);
        const searchTerm = 'Erik';
        const page = 1;
        const perPage = 5;

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(UsersActions.loadUsers({searchTerm, page, perPage}));

        list = await readFirst(facade.allUsers$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadUsersSuccess` to manually update list
     */
    it('allUsers$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allUsers$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          UsersActions.loadUsersSuccess({
            users: [createUserEntity(1), createUserEntity(2)],
            totalCount: 15
          })
        );

        list = await readFirst(facade.allUsers$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
