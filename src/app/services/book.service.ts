import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private books = [
    {
      id: 1,
      title: 'Book One',
      author: 'Author One',
      description: 'Description One',
      coverImage: 'https://picsum.photos/200/300?random=1',
    },
    {
      id: 2,
      title: 'Book Two',
      author: 'Author Two',
      description: 'Description Two',
      coverImage: 'https://picsum.photos/200/300?random=2',
    },
    {
      id: 3,
      title: 'Book Three',
      author: 'Author Three',
      description: 'Description Three',
      coverImage: 'https://picsum.photos/200/300?random=3',
    },
    {
      id: 4,
      title: 'Book Four',
      author: 'Author Four',
      description: 'Description Four',
      coverImage: 'https://picsum.photos/200/300?random=4',
    },
    {
      id: 5,
      title: 'Book Five',
      author: 'Author Five',
      description: 'Description Five',
      coverImage: 'https://picsum.photos/200/300?random=5',
    },
    {
      id: 6,
      title: 'Book Six',
      author: 'Author Six',
      description: 'Description Six',
      coverImage: 'https://picsum.photos/200/300?random=6',
    },
    {
      id: 7,
      title: 'Book Seven',
      author: 'Author Seven',
      description: 'Description Seven',
      coverImage: 'https://picsum.photos/200/300?random=7',
    },
    {
      id: 8,
      title: 'Book Eight',
      author: 'Author Eight',
      description: 'Description Eight',
      coverImage: 'https://picsum.photos/200/300?random=8',
    },
    {
      id: 9,
      title: 'Book Nine',
      author: 'Author Nine',
      description: 'Description Nine',
      coverImage: 'https://picsum.photos/200/300?random=9',
    },
    {
      id: 10,
      title: 'Book Ten',
      author: 'Author Ten',
      description: 'Description Ten',
      coverImage: 'https://picsum.photos/200/300?random=10',
    },
    {
      id: 11,
      title: 'Book Eleven',
      author: 'Author Eleven',
      description: 'Description Eleven',
      coverImage: 'https://picsum.photos/200/300?random=11',
    },
    {
      id: 12,
      title: 'Book Twelve',
      author: 'Author Twelve',
      description: 'Description Twelve',
      coverImage: 'https://picsum.photos/200/300?random=12',
    },
    {
      id: 13,
      title: 'Book Thirteen',
      author: 'Author Thirteen',
      description: 'Description Thirteen',
      coverImage: 'https://picsum.photos/200/300?random=13',
    },
    {
      id: 14,
      title: 'Book Fourteen',
      author: 'Author Fourteen',
      description: 'Description Fourteen',
      coverImage: 'https://picsum.photos/200/300?random=14',
    },
    {
      id: 15,
      title: 'Book Fifteen',
      author: 'Author Fifteen',
      description: 'Description Fifteen',
      coverImage: 'https://picsum.photos/200/300?random=15',
    },
    {
      id: 16,
      title: 'Book Sixteen',
      author: 'Author Sixteen',
      description: 'Description Sixteen',
      coverImage: 'https://picsum.photos/200/300?random=16',
    },
    {
      id: 17,
      title: 'Book Seventeen',
      author: 'Author Seventeen',
      description: 'Description Seventeen',
      coverImage: 'https://picsum.photos/200/300?random=17',
    },
    {
      id: 18,
      title: 'Book Eighteen',
      author: 'Author Eighteen',
      description: 'Description Eighteen',
      coverImage: 'https://picsum.photos/200/300?random=18',
    },
    {
      id: 19,
      title: 'Book Nineteen',
      author: 'Author Nineteen',
      description: 'Description Nineteen',
      coverImage: 'https://picsum.photos/200/300?random=19',
    },
    {
      id: 20,
      title: 'Book Twenty',
      author: 'Author Twenty',
      description: 'Description Twenty',
      coverImage: 'https://picsum.photos/200/300?random=20',
    },
    {
      id: 21,
      title: 'Book Twenty-One',
      author: 'Author Twenty-One',
      description: 'Description Twenty-One',
      coverImage: 'https://picsum.photos/200/300?random=21',
    },
    {
      id: 22,
      title: 'Book Twenty-Two',
      author: 'Author Twenty-Two',
      description: 'Description Twenty-Two',
      coverImage: 'https://picsum.photos/200/300?random=22',
    },
    {
      id: 23,
      title: 'Book Twenty-Three',
      author: 'Author Twenty-Three',
      description: 'Description Twenty-Three',
      coverImage: 'https://picsum.photos/200/300?random=23',
    },
    {
      id: 24,
      title: 'Book Twenty-Four',
      author: 'Author Twenty-Four',
      description: 'Description Twenty-Four',
      coverImage: 'https://picsum.photos/200/300?random=24',
    },
    {
      id: 25,
      title: 'Book Twenty-Five',
      author: 'Author Twenty-Five',
      description: 'Description Twenty-Five',
      coverImage: 'https://picsum.photos/200/300?random=25',
    },
    {
      id: 26,
      title: 'Book Twenty-Six',
      author: 'Author Twenty-Six',
      description: 'Description Twenty-Six',
      coverImage: 'https://picsum.photos/200/300?random=26',
    },
    {
      id: 27,
      title: 'Book Twenty-Seven',
      author: 'Author Twenty-Seven',
      description: 'Description Twenty-Seven',
      coverImage: 'https://picsum.photos/200/300?random=27',
    },
    {
      id: 28,
      title: 'Book Twenty-Eight',
      author: 'Author Twenty-Eight',
      description: 'Description Twenty-Eight',
      coverImage: 'https://picsum.photos/200/300?random=28',
    },
    {
      id: 29,
      title: 'Book Twenty-Nine',
      author: 'Author Twenty-Nine',
      description: 'Description Twenty-Nine',
      coverImage: 'https://picsum.photos/200/300?random=29',
    },
    {
      id: 30,
      title: 'Book Thirty',
      author: 'Author Thirty',
      description: 'Description Thirty',
      coverImage: 'https://picsum.photos/200/300?random=30',
    },

    // Add more mock books here
  ];

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return of(this.books).pipe(
      delay(500), // Simulate server latency
      catchError(this.handleError<any[]>('getBooks', []))
    );
  }

  /** GET related books by author */
  getRelatedBooks(author: string): Observable<any[]> {
    const url = `${this.books}/?author=${author}`;
    return this.http
      .get<any[]>(url)
      .pipe(catchError(this.handleError<any[]>('getRelatedBooks', [])));
  }
  searchBooks(query: string): Observable<any[]> {
    const results = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.description.toLowerCase().includes(query.toLowerCase())
    );
    return of(results).pipe(
      delay(500), // Simulate server latency
      catchError(this.handleError<any>('searchBooks'))
    );
  } // Method to fetch books based on search query

  // Method to fetch featured books
  getFeaturedBooks(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.books}?featured=true`)
      .pipe(catchError(this.handleError<any[]>('getFeaturedBooks', [])));
  }

  // Method to fetch book by ID
  getBookById(id: number): Observable<any> {
    const url = `${this.books}/${id}`;
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError<any>(`getBookById id=${id}`)));
  }
  getBook(id: string): Observable<any> {
    const book = this.books.find((book) => book.id === +id);
    if (!book) {
      return throwError('Book not found');
    }
    return of(book).pipe(
      delay(500), // Simulate server latency
      catchError(this.handleError<any>('getBook'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return throwError(error); // Using throwError to re-throw the error
    };
  }
}
