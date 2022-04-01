import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  movies: any[] = [];
  genres: any[] = [];
  directors: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getGenre();
    this.getDirector();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
    });
  }
  
  getGenre(): void {
    this.fetchApiData.getGenre().subscribe((resp: any) => {
        this.genres = resp;
        console.log(this.genres);
        return this.genres;
    });
  }
  
  getDirector(): void {
    this.fetchApiData.getDirector().subscribe((resp: any) => {
        this.directors = resp;
        console.log(this.directors);
        return this.directors;
    });
  }

  getUserFavorites(): void {
    this.fetchApiData.getUserFavorites().subscribe((resp: any) => {
        this.favorites = resp;
        console.log(this.favorites);
        return this.favorites;
    });
  }

  addFavoriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.addFavoriteMovie(MovieID).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites !`, 'OK', {
        duration: 3000
      });
      this.ngOnInit();
    });
    return this.getUserFavorites();
  }

  deleteFavoriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(MovieID).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been removed from your favorites !`, 'OK', {
        duration: 3000
      });
      this.ngOnInit();
    });
    return this.getUserFavorites();
  }

  // Check favorites list
  isFavorited(MovieID: string): boolean {
    return this.favorites.includes(MovieID);
  }

  // Add or remove from favorites list
  toggleFavorites(movie: any): void {
    this.isFavorited(movie._id)
      ? this.deleteFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }

  // Genre dialog box
  
  // openGenre(id: string): void {
  //   let name;
  //   let description;

  //   for(let i=0; i < this.genres.length; i++) {
  //     if(this.genres[i]._id == id) {
  //       name = this.genres[i].Name;
  //       description = this.genres[i].Description;
  //     }
  //   }
  //   this.dialog.open(GenreViewComponent, {
  //     data: {
  //       Name: name,
  //       Description: description,
  //     },
  //     width: '28rem'
  //   })
  // }

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
  openDirector(name: string, bio: string, born: Date): void {
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


}


