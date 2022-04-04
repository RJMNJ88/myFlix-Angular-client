import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://blooming-wildwood-80599.herokuapp.com/';
// Get token from local storage requests
const token = localStorage.getItem('token');
// Get username from local storage
const username = localStorage.getItem('username');

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {

  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  
  // User login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  
  // Get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  // Get a single movie
  public getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  // Get director
  public getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/:Name', {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  // Get genre
  public getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/:Name', {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  // Get user profile
  public getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // public getUserProfile(): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const UserID = localStorage.getItem('UserID');
  //   return this.http.get(apiUrl + `users/${UserID}`, {headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + token,
  //     })
  //   }).pipe(map(this.extractResponseData), catchError(this.handleError));
  // }
  
  // Get favorite movie
  public getUserFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get(apiUrl + `users/${username}/movies`, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  // Add favorite movie
  // public addFavoriteMovie(MovieID: string): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const username = localStorage.getItem('user');
  //   return this.http.post(apiUrl + `users/${username}/movies/${MovieID}`, {}, {headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + token,
  //     })
  //   }).pipe(map(this.extractResponseData), catchError(this.handleError));
  // }
  public addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, null, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  // Delete favorite movie
  public deleteFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  // Edit user profile
  public editUserProfile(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.put(apiUrl + `users/${username}`, userData, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  // Delete user profile
  public deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Extract data response
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }
  // private extractResponseData(data: any | Object): any {
  //   return data || {};
  // }

  // Error handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
