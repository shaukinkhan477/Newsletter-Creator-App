// header.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    translateServiceSpy = jasmine.createSpyObj('TranslateService', [
      'setDefaultLang',
      'use',
    ]);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: TranslateService, useValue: translateServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and set default language to "en"', () => {
    expect(component).toBeTruthy();
    expect(translateServiceSpy.setDefaultLang).toHaveBeenCalledWith('en');
  });

  it('should navigate to profile when goToProfile is called', () => {
    component.goToProfile();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/profile']);
  });

  describe('changeLanguage', () => {
    it('should use the selected language and set RTL for Arabic', () => {
      // Create an event with target.value = 'ar'
      const event = { target: { value: 'ar' } } as any as Event;
      component.changeLanguage(event);
      expect(translateServiceSpy.use).toHaveBeenCalledWith('ar');
      expect(document.documentElement.dir).toBe('rtl');
      expect(document.documentElement.classList.contains('rtl')).toBeTrue();
    });

    it('should use the selected language and set LTR for non-Arabic', () => {
      // Create an event with target.value = 'en'
      const event = { target: { value: 'en' } } as any as Event;
      // Set document to RTL state first.
      document.documentElement.dir = 'rtl';
      document.documentElement.classList.add('rtl');

      component.changeLanguage(event);
      expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
      expect(document.documentElement.dir).toBe('ltr');
      expect(document.documentElement.classList.contains('rtl')).toBeFalse();
    });
  });
});
