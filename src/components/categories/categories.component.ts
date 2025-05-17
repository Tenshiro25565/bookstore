import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  template: `
<div class="container mt-5">
      <h2>Categories</h2>
      <button
        class="btn btn-primary mb-3"
        *ngIf="!isGuest && !isMember"
        (click)="addCategory()"
      >
        Add Category
      </button>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th *ngIf="!isGuest && !isMember">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let category of categories">
            <td>{{ category.name }}</td>
            <td *ngIf="!isGuest && !isMember">
              <button class="btn btn-warning btn-sm" (click)="editCategory(category)">
                Edit
              </button>
              <button
                class="btn btn-danger btn-sm"
                (click)="deleteCategory(category.id)"
              >
                Delete
              </button>
            </td>
            <td>
              <button class="btn btn-info btn-sm" (click)="viewBooks(category.name)">
                  View Books
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div *ngIf="filteredBooks.length > 0">
        <h3>Books in "{{ activeCategory }}"</h3>
        <ul class="list-group">
          <li class="list-group-item" *ngFor="let book of filteredBooks">
            <strong>{{ book.title }}</strong> - {{ book.description }}
          </li>
        </ul>
      </div>
  `,
  styles: [``],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  books: any[] = [];
  filteredBooks: any[] = [];
  activeCategory: string = '';
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

    // Load categories from localStorage or JSON
    const storedCategories = this.localStorageService.getItem('categories');
    if (storedCategories) {
      this.categories = storedCategories;
    } else {
      this.http.get('/assets/categories.json').subscribe((data: any) => {
        this.categories = data;
        this.localStorageService.setItem('categories', this.categories); // Save to localStorage
      });
    }

    // Load books from localStorage or JSON
    const storedBooks = this.localStorageService.getItem('books');
    if (storedBooks) {
      this.books = storedBooks;
    } else {
      this.http.get('../../assets/books.json').subscribe((data: any) => {
        this.books = data;
        this.localStorageService.setItem('books', this.books); // Save to localStorage
      });
    }
  }

  viewBooks(categoryName: string) {
    this.filteredBooks = this.books.filter((book) => book.category === categoryName);
    this.activeCategory = categoryName;
  }

  clearFilter() {
    this.filteredBooks = [];
    this.activeCategory = '';
  }

  addCategory() {
    const name = prompt('Enter category name:');
    if (name) {
      const newCategory = { id: Date.now(), name };
      this.categories.push(newCategory);
      this.localStorageService.setItem('categories', this.categories); // Save to localStorage
    }
  }

  editCategory(category: any) {
    const name = prompt('Edit category name:', category.name);
    if (name) {
      category.name = name;
      this.localStorageService.setItem('categories', this.categories); // Save to localStorage
    }
  }

  deleteCategory(categoryId: number) {
    this.categories = this.categories.filter((category) => category.id !== categoryId);
    this.localStorageService.setItem('categories', this.categories); // Save to localStorage
  }
}