import { Component, OnInit, Input } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  editUserProfile(): void {
    this.fetchApiData.editUserProfile(this.userData).subscribe((res) => {
      this.dialogRef.close();
      window.location.reload();
      localStorage.setItem('username', res.Username)
      console.log(res)
      this.snackBar.open(this.userData.Username, 'User details have been updated.', {
        duration: 3000
      });
    })
  }

}
