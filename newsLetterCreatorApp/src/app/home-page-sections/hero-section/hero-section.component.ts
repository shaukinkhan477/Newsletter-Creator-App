import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID,
  Output,
  EventEmitter,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements AfterViewInit {
  @Output() getStarted = new EventEmitter<void>();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTypingEffect();
    }
  }

  startTypingEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const words = ['Create', 'Manage', 'Monitor', 'Engage', 'Inspire'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      if (wordIndex >= words.length) wordIndex = 0;
      const word = words[wordIndex];
      const speed = isDeleting ? 50 : 100;

      if (isDeleting) {
        textElement.innerText = word.substring(0, charIndex--);
      } else {
        textElement.innerText = word.substring(0, charIndex++);
      }

      if (!isDeleting && charIndex === word.length + 1) {
        isDeleting = true;
        setTimeout(type, 1000); // Pause before deleting
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        setTimeout(type, 500); // Pause before next word
      } else {
        setTimeout(type, speed);
      }
    };

    type();
  }

  onGetStarted() {
    this.getStarted.emit();
  }
}
