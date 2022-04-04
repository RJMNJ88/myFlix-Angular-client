import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule
  ) { }

  ngOnInit(): void { }
  
  // Movie list
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  // User profile page
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  // Log out user
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('You have been logged out.', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }

}
