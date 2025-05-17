import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  // Check if localStorage is available
  isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined';
  }

  // Get an item from localStorage
  getItem(key: string): any {
    if (this.isLocalStorageAvailable()) {
      const data = localStorage.getItem(key);
      try {
        // Try to parse as JSON, fallback to returning the plain string
        return JSON.parse(data!);
      } catch {
        return data;
      }
    }
    return null;
  }

  // Set an item in localStorage (automatically converts objects to JSON)
  setItem(key: string, value: any): void {
    if (this.isLocalStorageAvailable()) {
      if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, value);
      }
    }
  }

  // Remove an item from localStorage
  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  // Role-based helpers
  getRole(): string {
    return this.getItem('role') || 'guest';
  }

  isGuest(): boolean {
    return this.getRole() === 'guest';
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isMember(): boolean {
    return this.getRole() === 'member';
  }
}