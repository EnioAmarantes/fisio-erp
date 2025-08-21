import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';


@Component({
  selector: 'app-sidemenu',
  imports: [
    AccordionModule,
    ButtonModule,
    MenuModule,
  ],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {
  expanded = false;

  menuItems = [
    {
      label: 'Pacientes',
      icon: 'pi pi-user',
      routerLink: '/customers'
    },
    {
      label: 'Agendamento',
      icon: 'pi pi-calendar',
      routerLink: '/customers/new'
    },
    {
      label: 'Relatórios',
      icon: 'pi pi-chart-line',
      routerLink: '/customers/reports'
    }
  ];
}
