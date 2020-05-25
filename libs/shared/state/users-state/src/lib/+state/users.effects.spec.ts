import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { UsersEffects } from './users.effects';
import * as UsersActions from './users.actions';
import { UserEntity } from './users.models';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UsersEffects', () => {
  let actions: Observable<any>;
  let effects: UsersEffects;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NxModule.forRoot()
      ],
      providers: [
        UsersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(UsersEffects);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  describe('loadUsers$', () => {
    it('should work', () => {
      const searchTerm = 'Erik';
      const page = 1;
      const perPage = 5;
      actions = hot('-a-|', { a: UsersActions.loadUsers({searchTerm, page, perPage}) });
      
      const expected = hot('-a-|', {
        a: UsersActions.loadUsersSuccess({ users: [], totalCount: 15 }),
      });
      

      expect(effects.loadUsers$).toBeObservable(expected);
      const req = http.expectOne(`https://api.github.com/search/users`);
      // q=${searchTerm}&page=${page}&per_page=${perPage}
      req.flush({ items: [], total_count: 15 });
    });
  });
});
