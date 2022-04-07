# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## App Summary:
This particular application is a movie app with a database of stored movies
that users can browse. Movie data includes a synopsis, genre, director, and other related information.

## Key Features:
The myFlix app should have the following features:
- A welcome page with login and registration options
    - Existing users may log in using a username and password
    - New users can register via a registration dialog box:
        - Username
        - Password
        - Email
        - Birthday
- A main page containing a list of films from the database:
    - Once users have logged in, they should be brought to the movie-list page
    - Movie list page will have movie cards displaying the following
        - Movie title
        - Movie image
        - Genre, Synopsis, Director, and Like buttons
    - Users should be able to view information for a specific movie by clicking
    the buttons
    - Users should be able to add a movie to their list of favorites by clikcing the like button
- Profile Page:
    - The profile page should contain user data
    - User should be able to edit their profile information or delete their profile entirely
    - Profile page should also contain a list of the users favorited movies

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
