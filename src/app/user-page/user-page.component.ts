import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserEditComponent } from '../user-edit/user-edit.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent implements OnInit {
  user: any = localStorage.getItem('username');
  favs: any = null;
  // userString: any = localStorage.getItem('user');
  // user: any = JSON.parse(this.userString);

  // @Input() userData = {
  //   Username: this.user.Username,
  //   Password: this.user.Password,
  //   Email: this.user.Email,
  //   Birthday: this.user.Birthday
  // }

  constructor(
    public dialog: MatDialog,
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      this.user = resp;
      this.favs = resp.Favorites;
      console.log(this.user)
      return(this.user, this.favs);
    });
  }

  // Genre dialog box
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
        data: {
          Name: name,
          Description: description,
        },
      width: '28rem'
    });
  }
  
  // Director dialog box
  openDirector(name: string, bio: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
      },
      width: '28rem'
    });
  }
  
  // Synopsis dialog box
  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description
      },
      width: '28rem'
    })
  }

  openEditUserProfile(): void {
    this.dialog.open(UserEditComponent, {
      width: '28rem'
    });
  }

  getFavs(): void {
    let movies: any[] = [];
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      movies = res;
      movies.forEach((movie: any) => {
        if(this.user.favorites.includes(movie._id)) {
          this.favs.push(movie);
        }
      });
    });
    return this.favs;
  }

  removeFav(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((res: any) => {
      this.snackBar.open('Removed from favorites.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      return this.favs;
    })
  }

  deleteProfile(): void {
    if(confirm('Are you sure ? This cannot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted.', 'OK', { duration: 5000 });
      });
      this.router.navigate(['welcome'])
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        localStorage.clear();
      });
    }
  }

  // getUserProfile(): void {
  //   const UserID = localStorage.getItem('UserID');
  //   if(UserID) {
  //     this.fetchApiData.getUserProfile().subscribe((res: any) => {
  //       this.user = res;
  //       return this.user;
  //     });
  //   }
  // }

  // editUserProfile(): void {
  //   this.fetchApiData.editUserProfile(this.userData).subscribe((resp) => {
  //     localStorage.setItem('user', JSON.stringify(resp));
  //     this.snackBar.open('Profile updated !', 'OK', {
  //       duration: 4000,
  //     });
  //     setTimeout(() => {
  //       window.location.reload();
  //     });
  //   });
  // }

  // deleteUserProfile(): void {
  //   if(confirm('Are you sure you\'d like to delete your profile ?')) {
  //     this.fetchApiData.deleteUserProfile().subscribe(() => {
  //       this.snackBar.open(`${this.user.Username} has been removed.`, 'OK', {
  //         duration: 4000,
  //       });
  //       localStorage.clear();
  //     });
  //     this.router.navigate(['welcome']);
  //   }
  // }
}
