import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="container mt-5">
      <h2>Books</h2>
      <input
        type="text"
        [(ngModel)]="searchTerm"
        (input)="filterBooks()"
        placeholder="Search books"
        class="form-control mb-3"
      />
      <button
        class="btn btn-primary mb-3"
        *ngIf="!isGuest && !isMember"
        (click)="addBook()"
      >
        Add Book
      </button>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
            <th *ngIf="!isGuest && !isMember">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let book of filteredBooks">
            <td>{{ book.title }}</td>
            <td>{{ book.category }}</td>
            <td>{{ book.description }}</td>
            <td>{{ book.price }}</td>
            <td *ngIf="!isGuest && !isMember">
              <button class="btn btn-warning btn-sm" (click)="editBook(book)">
                Edit
              </button>
              <button
                class="btn btn-danger btn-sm"
                (click)="deleteBook(book.id)"
              >
                Delete
              </button>
            </td>
            <button class="btn btn-success btn-sm" 
              (click)="addToCart(book)"
              *ngIf="isMember">
                Add to Cart
              </button>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [``],
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  searchTerm: string = '';
  isGuest = false;
  isMember = false;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    const role = this.localStorageService.getItem('role') || 'guest';
    this.isGuest = role === 'guest';
    this.isMember = role === 'member';

    const storedBooks = this.localStorageService.getItem('books');
    if (storedBooks) {
      this.books = storedBooks;
    } else {
      this.http.get('/assets/books.json').subscribe((data: any) => {
        this.books = data;
        this.localStorageService.setItem('books', this.books);
      });
    }
    this.filteredBooks = [...this.books];
  }

  filterBooks() {
    this.filteredBooks = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addBook() {
    const title = prompt('Enter book title:');
    const category = prompt('Enter book category:');
    const description = prompt('Enter book description:');
    if (title && category && description) {
      const newBook = {
        id: Date.now(),
        title,
        category,
        description,
      };
      this.books.push(newBook);
      this.filteredBooks = [...this.books];
      this.localStorageService.setItem('books', this.books);
    }
  }

  editBook(book: any) {
    const title = prompt('Edit book title:', book.title);
    const category = prompt('Edit book category:', book.category);
    const description = prompt('Edit book description:', book.description);
    if (title && category && description) {
      book.title = title;
      book.category = category;
      book.description = description;
      this.localStorageService.setItem('books', this.books);
    }
  }

  deleteBook(bookId: number) {
    this.books = this.books.filter((book) => book.id !== bookId);
    this.filteredBooks = [...this.books];
    this.localStorageService.setItem('books', this.books);
  }

  addToCart(book: any) {
    const cart = this.localStorageService.getItem('cart') || { cart: [], totalPrice: 0 };
    cart.cart.push(book);
    cart.totalPrice += book.price;
    this.localStorageService.setItem('cart', cart);
    alert(`${book.title} added to cart!`);
  }
}