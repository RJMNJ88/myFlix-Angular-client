import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    public snackBar: MatSnackBar,
    public router: Router
  ) { }
    

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      let userCredentials = (({ Username, Password}) => ({ Username, Password })) (this.userData);
      this.fetchApiData.userLogin(userCredentials).subscribe((response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('UserID', response.user._id);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.dialogRef.close(); // This will close the modal on success!
        this.router.navigate(['movies']); //Routes to '/movies'
      }, (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000
      });
    });
      this.snackBar.open(`Welcome to myFlix ${this.userData.Username}!`, 'OK', {
        duration: 4000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open('Could not register! Please try another username.', 'OK', {
        duration: 2000
      });
    });
  }
}

