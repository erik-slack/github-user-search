import { UserEntity } from './users.models';
import { State, usersAdapter, initialState } from './users.reducer';
import * as UsersSelectors from './users.selectors';

describe('Users Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getUsersId = (it) => it['id'];
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

  let state;

  beforeEach(() => {
    state = {
      users: usersAdapter.setAll(
        [
          createUserEntity(1),
          createUserEntity(2),
          createUserEntity(3),
        ],
        {
          ...initialState,
          selectedId: 2,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Users Selectors', () => {
    it('getAllUsers() should return the list of Users', () => {
      const results = UsersSelectors.getAllUsers(state);
      const selId = getUsersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(2);
    });

    it('getSelected() should return the selected Entity', () => {
      const result = UsersSelectors.getSelected(state);
      const selId = getUsersId(result);

      expect(selId).toBe(2);
    });

    it("getUsersLoaded() should return the current 'loaded' status", () => {
      const result = UsersSelectors.getUsersLoaded(state);

      expect(result).toBe(true);
    });

    it("getUsersError() should return the current 'error' state", () => {
      const result = UsersSelectors.getUsersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
