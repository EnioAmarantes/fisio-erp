import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-toolbar',
  imports: [
    ToolbarModule,
    ButtonModule,
    IconFieldModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Input() title: string = '';
  @Output() toggleSidenav = new EventEmitter<void>();

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  do() {
    // Placeholder for any action to be performed on button click
    console.log('Button clicked!');
  }
}
