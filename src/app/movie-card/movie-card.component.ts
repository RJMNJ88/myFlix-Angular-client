import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  username: any = localStorage.getItem('username');
  currentUser: any = null;
  currentFavs: any = null;
  isInFavs: boolean = false;
  // genres: any[] = [];
  // directors: any[] = [];
  // favorites: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getCurrentUser();
    // this.getGenre();
    // this.getDirector();
  }

  getCurrentUser(): void {
    this.fetchApiData.getUserProfile().subscribe((resp: any) => {
      this.currentUser = resp;
      this.currentFavs = resp.FavoriteMovies;
      return (this.currentUser, this.currentFavs);
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
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

  toggleFavs(movieId: string): void {
    if(this.currentFavs.filter(function(e: any) { return e._id === movieId; }).length > 0) {
      this.removeFromFavs(movieId);
      this.isInFavs = false;
    } else {
      this.addToFavs(movieId);
      this.isInFavs = true;
    }
  }

  addToFavs(movieId: string): void {
    if(this.currentFavs.filter(function(e: any) { return e._id === movieId }).length > 0) {
      this.snackBar.open('Already added to favorites !', 'OK', { duration: 2000 });
    } else {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp: any) => {
        this.getCurrentUser();
        this.ngOnInit();
        this.snackBar.open('Added to favorites.', 'OK', { duration: 2000 });
      });
    }
  }

  removeFromFavs(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe((resp: any) => {
      this.snackBar.open('Removed from favorites.', 'OK', { duration: 2000 });
      this.getCurrentUser();
      this.ngOnInit();
      2000
    })
  }

  favCheck(movieId: string): any {
    let favIds = this.currentFavs.map(function (fav: any) { return fav._id });
    if(favIds.includes(movieId)) {
      this.isInFavs = true;
      return this.isInFavs;
    };
  }
    
}
