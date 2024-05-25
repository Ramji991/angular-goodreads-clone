import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchForm: FormGroup;
  searchResults: any[] = [];
  loading = false;
  errorMessage: string;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      query: ['', Validators.required],
    });
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const { query } = this.searchForm.value;
    this.bookService.searchBooks(query).subscribe(
      (results) => {
        this.searchResults = results;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
  viewDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}
