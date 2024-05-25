import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: any;
  relatedBooks: any[] = [];
  loading = false;
  errorMessage: string;
  newReview: string = '';
  newRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const bookId = +this.route.snapshot.paramMap.get('id'); // Convert to number
    this.fetchBookDetails(bookId);
  }

  fetchBookDetails(bookId: number): void {
    this.loading = true;
    this.bookService.getBookById(bookId).subscribe(
      (book) => {
        this.book = book;
        this.loading = false;
        this.fetchRelatedBooks(book.author); // Fetch related books by author
      },
      (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    );
  }

  fetchRelatedBooks(author: string): void {
    this.bookService.getRelatedBooks(author).subscribe(
      (books) => {
        this.relatedBooks = books;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  addReview(): void {
    if (this.newReview && this.newRating > 0) {
      const review = {
        content: this.newReview,
        rating: this.newRating,
        date: new Date(),
      };
      this.book.reviews.push(review);
      this.newReview = '';
      this.newRating = 0;
    }
  }
}
