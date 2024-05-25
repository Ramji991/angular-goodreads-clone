import { Component, OnInit } from '@angular/core';
import { BookshelfService } from '../../services/bookshelf.service';

@Component({
  selector: 'app-bookshelves',
  templateUrl: './bookshelves.component.html',
  styleUrls: ['./bookshelves.component.scss'],
})
export class BookshelvesComponent implements OnInit {
  bookshelves: any[] = [];
  loading = false;
  errorMessage: string;

  constructor(private bookshelfService: BookshelfService) {}

  ngOnInit(): void {
    this.fetchBookshelves();
  }

  fetchBookshelves(): void {
    this.loading = true;
    this.bookshelfService.getBookshelves().subscribe(
      (bookshelves) => {
        this.bookshelves = bookshelves;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  addBookToShelf(book: any, status: string): void {
    this.bookshelfService.addBookToShelf(book, status).subscribe(
      () => this.fetchBookshelves(),
      (error) => (this.errorMessage = error)
    );
  }

  removeBookFromShelf(id: number): void {
    this.bookshelfService.removeBookFromShelf(id).subscribe(
      () => this.fetchBookshelves(),
      (error) => (this.errorMessage = error)
    );
  }

  getBooksByStatus(status: string): void {
    this.loading = true;
    this.bookshelfService.getBooksByStatus(status).subscribe(
      (books) => {
        this.bookshelves = books;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
}
