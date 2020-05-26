import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { faLinkedin, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { takeUntil, debounceTime, distinctUntilChanged, take, filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { UsersFacade } from '@github-user-search/shared/state/users-state';
import { UserEntity } from '@github-user-search/shared/state/users-state';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'github-user-search-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'gh-user-search';
  searchControl: FormControl;
  users$: Observable<UserEntity[]>;
  usersLoaded$: Observable<boolean>;
  detailLoaded$: Observable<boolean>;
  totalCount$: Observable<number>;
  error$: Observable<any>;
  hasNoMoreResults$: Observable<boolean>;
  nextPage = 2;
  loadingResults = false;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;
  faGithub = faGithub;
  
  private RESULTS_PER_PAGE = 50;
  private addEnvComponent: Promise<Type<UserDetailDialogComponent>>;
  private ngUnsubscribe = new Subject();

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private usersFacade: UsersFacade,
  ) {}

  ngOnInit(): void {
    this.searchControl = this.fb.control('', Validators.required);
    this.users$ = this.usersFacade.allUsers$;
    this.usersLoaded$ = this.usersFacade.loaded$;
    this.detailLoaded$ = this.usersFacade.detailLoaded$;
    this.totalCount$ = this.usersFacade.totalCount$;
    this.error$ = this.usersFacade.error$;
    this.hasNoMoreResults$ = this.usersFacade.hasNoMoreResults$;

    this.searchControl.valueChanges
      .pipe(
        filter((newValue: string) => newValue?.length > 0),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((newValue: string) => {
        this.commenceNewSearch(newValue);
      });
    
    this.users$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((users) => {
        console.log('users', users);
        this.loadingResults = false;
      });

    this.error$
      .pipe(
        filter((error) => error),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((error: any) => {
        console.error('Github error', error);
        this.openErrorSnackBar();
        this.loadingResults = false;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  resetBtnClicked(): void {
    this.usersFacade.reset();
    this.searchControl.reset();
  }

  searchBtnClicked(): void {
    this.commenceNewSearch(this.searchControl.value);
  }

  userClicked(user: UserEntity): void {
    this.usersFacade.selectUser(user.login);
    this.usersFacade.selectedUsers$
      .pipe(
        filter((selectedUser) => !!selectedUser),
        take(1)
      )
      .subscribe((selectedUser) => {
        this.getDialogComponent(selectedUser);
      });
  }

  searchResultsScrolled() {
    this.loadingResults = true;
    this.usersFacade.loadUsers(this.searchControl.value, this.nextPage, this.RESULTS_PER_PAGE);
    this.nextPage++;
  }

  private async getDialogComponent(user: UserEntity) {
    // Lazy load the component
    if (!this.addEnvComponent) {
      this.addEnvComponent = import(
        './user-detail-dialog/user-detail-dialog.component'
      ).then(({ UserDetailDialogComponent }) => UserDetailDialogComponent);
    }

    this.addEnvComponent.then((component: Type<UserDetailDialogComponent>) => {
      // Open the dialog
      this.dialog
        .open(component, {
            data: {
              user
            }
          })
        .afterClosed()
        .subscribe(result => {
          console.log(`Dialog result: ${result}`);
          this.usersFacade.resetSelected();
        });
    });
  }

  private commenceNewSearch(searchTerm: string) {
    this.loadingResults = true;
    this.usersFacade.reset();
    this.usersFacade.loadUsers(searchTerm, 1, this.RESULTS_PER_PAGE);
  }

  private openErrorSnackBar() {
    this._snackBar.open('Oops!', 'You broke Github...how could you?', <MatSnackBarConfig>{
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
