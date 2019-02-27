import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { map, catchError, tap }  from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { Hero } from './hero';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }
  
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('assets/heroes.json')
    .pipe(
          map((res: any) => <Hero[]>res.data),
          tap(() => this.log('fetched heroes')),
          catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    this.log(msg);
    return throwError(msg);
  }


  ////////////////// Save Methods ///////////////////////

  /**Post: add a new Hero to the server */
  
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>('assets/heroes.json', hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError)
    );
  }


  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
