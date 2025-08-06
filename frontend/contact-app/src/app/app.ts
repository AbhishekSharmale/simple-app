import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('contact-app');
  
  contact = {
    name: '',
    mobile: '',
    email: ''
  };
  
  isSubmitting = false;
  message = '';
  isSuccess = false;
  
  constructor(private http: HttpClient) {}
  
  onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.message = '';
    
    this.http.post('/api/contact', this.contact)
      .subscribe({
        next: (response: any) => {
          this.isSuccess = true;
          this.message = 'Contact saved successfully!';
          this.contact = { name: '', mobile: '', email: '' };
          this.isSubmitting = false;
        },
        error: (error) => {
          this.isSuccess = false;
          this.message = error.error?.error || 'An error occurred. Please try again.';
          this.isSubmitting = false;
        }
      });
  }
}
