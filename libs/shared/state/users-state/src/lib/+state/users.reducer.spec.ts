import { UserEntity } from './users.models';
import * as UsersActions from './users.actions';
import { State, initialState, reducer } from './users.reducer';

describe('Users Reducer', () => {
  const createUsersEntity = (id: number, name = '') =>
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

  describe('valid Users actions', () => {
    it('loadUsersSuccess should return set the list of known Users', () => {
      const users = [
        createUsersEntity(1),
        createUsersEntity(9)
      ];
      const totalCount = 15;
      const action = UsersActions.loadUsersSuccess({ users, totalCount });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
