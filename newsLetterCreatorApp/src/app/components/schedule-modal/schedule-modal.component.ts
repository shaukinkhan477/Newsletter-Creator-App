import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.css'],
})
export class ScheduleModalComponent {
  @Input() newsletter: any; // or a proper interface
  @Output() onClose = new EventEmitter<void>();
  @Output() onSchedule = new EventEmitter<Date>();

  closeModal() {
    this.onClose.emit();
  }

  schedule() {
    if (!this.newsletter.schedule) {
      // Basic validation
      alert('Please choose a date/time for scheduling.');
      return;
    }
    // Emit the chosen date/time to the parent
    this.onSchedule.emit(this.newsletter.schedule);
  }
}
