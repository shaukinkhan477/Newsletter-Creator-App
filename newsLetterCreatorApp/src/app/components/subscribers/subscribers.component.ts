import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Subscriber,
  SubscribersService,
} from '../../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent implements OnInit {
  subscribers: Subscriber[] = [];
  newSubscriber: Subscriber = {
    id: 0,
    email: '',
    status: 'active',
  };

  // Current filter setting (default is 'all')
  filterStatus: 'all' | 'active' | 'inactive' | 'need-approval' | 'pending' =
    'all';

  constructor(private subscribersService: SubscribersService) {}

  ngOnInit() {
    this.loadSubscribers();
  }

  loadSubscribers() {
    this.subscribersService.getAllSubscribers().subscribe((data) => {
      this.subscribers = data;
    });
  }

  get filteredSubscribers(): Subscriber[] {
    if (this.filterStatus === 'all') {
      return this.subscribers;
    } else {
      // Return only subscribers matching the chosen status
      return this.subscribers.filter((sub) => sub.status === this.filterStatus);
    }
  }

  addSubscriber() {
    if (!this.newSubscriber.email) {
      alert('Email is required!');
      return;
    }

    this.subscribersService
      .addSubscriber(this.newSubscriber)
      .subscribe((created) => {
        alert(`Subscriber added: ${created.email}`);
        this.newSubscriber = { id: 0, email: '', status: 'active' };
        this.loadSubscribers();
      });
  }

  removeSubscriber(id: number) {
    if (!confirm('Are you sure you want to remove this subscriber?')) return;

    this.subscribersService.deleteSubscriber(id).subscribe((success) => {
      if (success) {
        alert('Subscriber removed successfully.');
        this.loadSubscribers();
      } else {
        alert('Failed to remove subscriber.');
      }
    });
  }
}
