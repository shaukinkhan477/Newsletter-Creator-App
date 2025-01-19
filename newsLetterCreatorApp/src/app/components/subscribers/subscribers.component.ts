import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SubscribersService} from '../../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent implements OnInit {
  subscribers: any[] = [];
  newEmail = '';
  newName = '';
  errorMsg = '';
  successMsg = '';

  constructor(private subsService: SubscribersService) {}

  ngOnInit(): void {
    this.fetchSubscribers();
  }

  fetchSubscribers(): void {
    this.subsService.getAll().subscribe({
      next: (res: any) => {
        this.subscribers = res.subscribers || [];
      },
      error: (err) => {
        this.errorMsg = 'Error fetching subscribers.';
      },
    });
  }

  addSubscriber(): void {
    if (!this.newEmail) {
      this.errorMsg = 'Email is required.';
      return;
    }
    this.errorMsg = '';
    this.successMsg = '';

    this.subsService
      .addSubscriber({ email: this.newEmail, name: this.newName })
      .subscribe({
        next: (response: any) => {
          this.successMsg = 'Subscriber added successfully!';
          this.newEmail = '';
          this.newName = '';
          this.fetchSubscribers();
        },
        error: (err) => {
          this.errorMsg = err.error?.message || 'Error adding subscriber.';
        },
      });
  }

  deleteSub(id: string): void {
    if (!confirm('Are you sure you want to delete this subscriber?')) {
      return;
    }
    this.errorMsg = '';
    this.successMsg = '';

    this.subsService.deleteSubscriber(id).subscribe({
      next: () => {
        this.successMsg = 'Subscriber deleted successfully!';
        this.fetchSubscribers();
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Error deleting subscriber.';
      },
    });
  }
}
