import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CustomerData } from '../model/customer-data';
import { InputMaskModule } from 'primeng/inputmask';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { maritalStatusOptions, genderOptions } from './enums/customer-enums';
import { createCustomerForm } from './forms/customer-form';
import { EditorModule } from 'primeng/editor';


@Component({
  selector: 'app-customer-data-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    DatePickerModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    ButtonModule,
    ProgressSpinnerModule,
    InputMaskModule,
    EditorModule,
  ],
  providers: [MessageService],
  templateUrl: './customer-data.component.html',
  styleUrl: './customer-data.component.scss'
})
export class CustomerDataComponent {
  customerForm: FormGroup;
  isLoading = false;
  customer: CustomerData = new CustomerData();

  maritalStatusOptions = maritalStatusOptions;
  genderOptions = genderOptions;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.customerForm = createCustomerForm(this.fb, this.customer);

    const customerId = this.route.snapshot.params['id'];
    if (customerId) {
      console.log('Carregando dados do cliente com ID:', customerId);
      this.loadCustomerData(customerId);
    }
  }

  private loadCustomerData(code: string) {
    this.isLoading = true;
    this.customerService.getCustomerByCode(code).subscribe({
      next: (customer: CustomerData) => {
        this.customer = customer;
        this.customerForm.patchValue(customer);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados do cliente:', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.isLoading = true;
      const payload: CustomerData = this.customerForm.value;
      payload.code = this.customer.code;
      this.customerService.saveCustomer(payload)
        .then(() => {
          this.isLoading = false;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente salvo com sucesso!' });
          setTimeout(() => {
            this.router.navigate(['/customers']);
          }, 3000);
        })
        .catch((error: any) => {
          this.isLoading = false;
          console.error('Erro ao salvar cliente:', error);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar cliente. Por favor, tente novamente.' });
        });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Por favor, preencha todos os campos obrigatórios.' });
    }
  }

  searchAddressByZipCode() {
    const zipCode = this.customerForm.get('address.zipCode')?.value;
    if (!zipCode) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Por favor, insira um CEP válido.' });
      return;
    }

    this.customerService.getAddressByZipCode(zipCode).subscribe(
      {
        next: (address: any) => {
          this.customerForm.patchValue({
            address: {
              street: address.logradouro,
              neighborhood: address.bairro,
              city: address.localidade,
              state: address.uf,
              country: 'Brasil'
            }
          });
        },
        error: (error: any) => {
          console.error('Erro ao buscar endereço:', error);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível buscar o endereço. Verifique o CEP e tente novamente.' });
        },
      });
  }

  cancel() {
    if (confirm('Tem certeza que deseja cancelar? Todas as alterações serão perdidas.')) {
      this.router.navigate(['/customers']);
    }
  }
}
