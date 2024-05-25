import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  featuredBooks: any[] = [];
  loading = false;
  errorMessage: string;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.fetchFeaturedBooks();
  }
  viewDetails(bookId: number): void {
    this.router.navigate(['/book-details', bookId]);
  }
  fetchFeaturedBooks(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe(
      (books) => {
        this.featuredBooks = books;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
}
