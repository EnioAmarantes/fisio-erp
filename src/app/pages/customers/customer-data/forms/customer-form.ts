import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerData } from '../../model/customer-data';
import { createContactInfoForm } from './contact-info-form';
import { createAddressForm } from './address-form';

export function createCustomerForm(fb: FormBuilder, customer: CustomerData): FormGroup {
  return fb.group({
    name: [customer.name, Validators.required],
    maritalStatus: [customer.maritalStatus, Validators.required],
    gender: [customer.gender, Validators.required],
    ensuranceName: [customer.ensuranceName],
    birthDate: [customer.birthDate],
    description: [customer.description],
    contactInfo: createContactInfoForm(fb, customer.contactInfo),
    address: createAddressForm(fb, customer.address),
  });
}
