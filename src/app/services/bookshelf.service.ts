import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookshelfService {
  private bookshelvesUrl = 'api/bookshelves'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET bookshelves from the server */
  getBookshelves(): Observable<any[]> {
    return this.http
      .get<any[]>(this.bookshelvesUrl)
      .pipe(catchError(this.handleError<any[]>('getBookshelves', [])));
  }

  /** GET books by status */
  getBooksByStatus(status: string): Observable<any[]> {
    const url = `${this.bookshelvesUrl}/?status=${status}`;
    return this.http
      .get<any[]>(url)
      .pipe(catchError(this.handleError<any[]>('getBooksByStatus', [])));
  }

  /** ADD a book to the bookshelf */
  addBookToShelf(book: any, status: string): Observable<any> {
    const url = `${this.bookshelvesUrl}`;
    const newBook = { ...book, status };
    return this.http
      .post<any>(url, newBook, this.httpOptions)
      .pipe(catchError(this.handleError<any>('addBookToShelf')));
  }

  /** DELETE a book from the bookshelf */
  removeBookFromShelf(id: number): Observable<any> {
    const url = `${this.bookshelvesUrl}/${id}`;
    return this.http
      .delete<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('removeBookFromShelf')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
