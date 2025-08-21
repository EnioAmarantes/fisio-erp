import { FormBuilder, FormGroup } from '@angular/forms';
import { Address } from '../../model/address';

export function createAddressForm(fb: FormBuilder, address: Address): FormGroup {
  return fb.group({
    street: [address.street],
    number: [address.number],
    complement: [address.complement],
    neighborhood: [address.neighborhood],
    city: [address.city],
    state: [address.state],
    zipCode: [address.zipCode],
    country: [address.country]
  });
}
