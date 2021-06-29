import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { UserEntity } from '@github-user-search/shared/state/users-state';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface DialogData {
  user: UserEntity
}

@Component({
  selector: 'github-user-search-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss']
})
export class UserDetailDialogComponent implements OnInit {
  user: UserEntity;

  constructor(
    public dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.user = this.data.user;
  }

}

@NgModule({
  declarations: [UserDetailDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ]
})
class UserDetailDialogModule { }
