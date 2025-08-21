import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, Observable, firstValueFrom, catchError, tap } from 'rxjs';
import { CustomerListView } from '../pages/customers/model/customer-list';
import { CustomerData } from '../pages/customers/model/customer-data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  getCustomers(): Observable<CustomerListView[]> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.get<CustomerListView[]>(`${environment.apiUrl}/customer`).pipe(
        map(data => {
          return data.map(customer => ({
            code: customer.code,
            id: customer.id,
            name: customer.name,
            sex: customer.sex,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            cpf: customer.cpf,
            dateOfBirth: customer.dateOfBirth
          }));
        }),
        catchError(error => {
          console.error('Erro ao carregar clientes:', error);
          return [];
        })
      );
    }
    return new Observable<CustomerListView[]>(); // Return an empty observable if not in browser
  }

  async getCustomerData(id: number): Promise<CustomerData> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const data = await firstValueFrom(
          this.http.get<any>(`${environment.apiUrl}/customer/${id}`)
        );
        const customer = new CustomerData();
        customer.id = data.id;
        customer.code = data.code;
        customer.name = data.name;
        customer.contactInfo.email = data.contactInfo?.email ?? '';
        return customer;
      } catch (error) {
        console.error('Erro ao buscar cliente por ID:', error);
        return new CustomerData();
      }
    }
    return new CustomerData();
  }

  getCustomerByCode(code: string): Observable<CustomerData> {
    console.log('Fetching customer by code:', code);
    return this.http.get<CustomerData>(`${environment.apiUrl}/Customer/${code}`);
  }

  async saveCustomer(payload: CustomerData): Promise<CustomerData> {
    if (isPlatformBrowser(this.platformId)) {
      const url = payload.code
        ? `${environment.apiUrl}/Customer/${payload.code}`
        : `${environment.apiUrl}/Customer`;

      console.log('Saving customer to URL:', url);
      console.log('Saving customer with payload:', JSON.stringify(payload));
      const method = payload.code ? 'PUT' : 'POST';

      try {
        const data = await firstValueFrom(
          method === 'POST'
            ? this.http.post<CustomerData>(url, payload)
            : this.http.put<CustomerData>(url, payload)
        );
        return data;
      } catch (error) {
        console.error('Erro ao salvar cliente:', error);
        throw new Error('Erro ao salvar cliente');
      }
    }
    return Promise.reject('Not in browser');
  }

  getAddressByZipCode(zipCode: string): Observable<any> {
    const apiUrl = `https://viacep.com.br/ws/${zipCode}/json/`;
    return this.http.get(apiUrl);
  }
}
