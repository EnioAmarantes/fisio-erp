import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { CustomerService } from '../../services/customer.service';
import { CustomerListView } from './model/customer-list';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [TableModule, ButtonModule, ProgressSpinnerModule, ToolbarModule, DatePipe, CommonModule, RouterLink],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  customers: CustomerListView[] = [];
  isLoading = false;

  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.loadCustomers();
  }

  reloadCustomers() {
    this.loadCustomers();
  }

  openFilter() {
    console.log('Filter opened');
  }

  onRowSelect(event: any) {
    const customer = event.data;
    if (customer) {
      this.router.navigate(['/customer-data', customer.code]);
    }
  }

  private loadCustomers() {
    this.isLoading = true;
    this.customerService.getCustomers().subscribe({
      next: (data: CustomerListView[]) => {
        this.customers = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
        this.isLoading = false;
        alert('Erro ao carregar clientes. Por favor, tente novamente mais tarde.');
      }
    });
  }
}
