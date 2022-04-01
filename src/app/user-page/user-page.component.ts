import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent implements OnInit {
  userString: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userString);

  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday
  }
  constructor(
    public dialog: MatDialog,
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    const UserID = localStorage.getItem('UserID');
    if(UserID) {
      this.fetchApiData.getUserProfile().subscribe((res: any) => {
        this.user = res;
        return this.user;
      });
    }
  }

  editUserProfile(): void {
    this.fetchApiData.editUserProfile(this.userData).subscribe((resp) => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.snackBar.open('Profile updated !', 'OK', {
        duration: 4000,
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

  deleteUserProfile(): void {
    if(confirm('Are you sure you\'d like to delete your profile ?')) {
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        this.snackBar.open(`${this.user.Username} has been removed.`, 'OK', {
          duration: 4000,
        });
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }
  }
}
