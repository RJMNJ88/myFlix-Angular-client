import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('UserID', response.user._id);
        localStorage.setItem('user', response.user.Username);
        // localStorage.setItem('user', JSON.stringify(response.user));
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Login successful !', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
      }, (response) => {
        this.snackBar.open('Incorrect username or password. Please try again.', 'OK', {
          duration: 2000
      });
    });
  }
}

