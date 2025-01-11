import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Newsletter } from '../../models/newsletter.model';

@Component({
  selector: 'app-schedule-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.css'],
})
export class ScheduleModalComponent {
  @Input() newsletter!: Newsletter;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSchedule = new EventEmitter<Date | null>();

  closeModal() {
    this.onClose.emit();
  }

  schedule() {
    this.onSchedule.emit(this.newsletter.schedule);
  }
}
