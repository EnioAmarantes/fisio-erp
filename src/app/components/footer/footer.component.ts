import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  getYear(): number {
    return new Date().getFullYear();
  }

  getVersion(): string {
    return '0.0.1';
  }

  getContactEmail(): string {
    return 'enio.amarantes@gmail.com';
  }
}
