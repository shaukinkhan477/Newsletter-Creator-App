import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  onGetStarted() {
    if (!this.authService.isLoggedIn()) {
      // Not logged in => go to login
      this.router.navigate(['/login']);
    } else {
      // Already logged in => go to editor
      this.router.navigate(['/home']);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTypingEffect();
    }
  }

  startTypingEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const words = ['Create. ', 'Engage. ', 'Inspire. '];
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
}
