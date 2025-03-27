import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cta-section.component.html',
  styleUrl: './cta-section.component.css'
})
export class CtaSectionComponent {

  @Output() getStarted = new EventEmitter<void>();

  onGetStarted() {
    this.getStarted.emit();
  }

}
