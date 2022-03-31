import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss']
})

export class UserFavoritesComponent implements OnInit {
  user: any = {};
  genres: any[] = [];
  favorites: any[] = [];

  constructor(
    public dialog: MatDialog,
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getGenre();
    this.getUserFavorites();
  }

  getUserProfile(): void {
    const UserID = localStorage.getItem('UserID');
    if(UserID) {
      this.fetchApiData.getUserProfile().subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }
  
  getUserFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favorites = res.filter((movie: any) => {
        return this.user.favorites.includes(movie._id)
      });
      return this.favorites;
    })
  }

  getGenre(): void {
    this.fetchApiData.getGenre().subscribe((resp: any) => {
        this.genres = resp;
        console.log(this.genres);
        return this.genres;
    });
  }

  deleteFavoriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(MovieID).subscribe((res: any) => {
      this.snackBar.open(`${title} has been removed from your favorites !`, 'OK', {
        duration: 3000,
      });
      window.location.reload();
      this.ngOnInit();
    });
    return this.getUserFavorites();
  }

  openDirector(name: string, bio: string, born: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Born: born
      },
      width: '60rem'
    });
  }

  openGenre(id: string): void {
    let name;
    let description;

    for(let i=0; i < this.genres.length; i++) {
      if(this.genres[i]._id == id) {
        name = this.genres[i].Name;
        description = this.genres[i].Description;
      }
    }
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '60rem'
    })
  }

  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description
      },
      width: '60rem'
    })
  }

}
