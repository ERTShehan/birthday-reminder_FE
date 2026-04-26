import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Birthday Reminder';
  name = '';
  date = '';
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.name || !this.date) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = {
      name: this.name,
      date: this.date
    };

    this.http.post('http://localhost:5000/api/birthdays', payload).subscribe({
      next: (res) => {
        this.successMessage = `Successfully added birthday for ${this.name}!`;
        this.name = '';
        this.date = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to add birthday. Please try again.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
