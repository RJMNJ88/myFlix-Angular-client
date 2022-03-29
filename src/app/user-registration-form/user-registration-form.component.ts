import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      console.log(result);
      localStorage.setItem('token', result.token);
      localStorage.setItem('UserID', result.user._id);
      localStorage.setItem('user', JSON.stringify(result.user));
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open(result, 'OK', {
        duration: 2000
    });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}

