import { async, TestBed } from '@angular/core/testing';
import { SharedStateUsersStateModule } from './shared-state-users-state.module';

describe('SharedStateUsersStateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedStateUsersStateModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedStateUsersStateModule).toBeDefined();
  });
});
