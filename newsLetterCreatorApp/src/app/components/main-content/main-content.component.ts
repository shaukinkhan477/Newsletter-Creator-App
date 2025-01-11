import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

import { Newsletter } from '../../models/newsletter.model';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorModule],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent {
  @Input() newsletter!: Newsletter;
  @Output() onSaveDraft = new EventEmitter<void>();
  @Output() onOpenSchedule = new EventEmitter<void>();

  saveAsDraft() {
    this.onSaveDraft.emit();
  }

  openScheduleModal() {
    this.onOpenSchedule.emit();
  }

  editorConfig = {
    height: 500,
    menubar: true,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'code',
      'help',
      'wordcount',
      'colorpicker',
    ],
    toolbar:
      'undo redo | blocks | bold italic forecolor backcolor | alignleft aligncenter alignright | ' +
      'bullist numlist outdent indent | link image',
  };
}
