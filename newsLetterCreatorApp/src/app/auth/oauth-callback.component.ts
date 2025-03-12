// oauth-callback.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-oauth-callback',
  template: '<p>Logging you in...</p>',
})
export class OAuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        // Store the token and redirect to the home page.
        this.authService.setToken(token);
        // Optionally, fetch and set user details here.
        this.router.navigate(['/home']);
      } else {
        // If there’s no token, navigate back to login.
        this.router.navigate(['/login']);
      }
    });
  }
}
