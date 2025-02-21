import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
})
export class ResumeComponent implements OnInit {

  resumeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resumeForm = this.fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      pinCode: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.resumeForm.valid) {
      console.log('Form Submitted', this.resumeForm.value);
      // You can send this data to a server or use it as needed
    } else {
      // Mark all controls as touched to show errors
      this.resumeForm.markAllAsTouched();
    }
  }
}
