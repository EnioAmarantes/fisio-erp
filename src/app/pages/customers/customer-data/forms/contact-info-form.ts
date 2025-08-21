import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactInfo } from '../../model/contact-info';

export function createContactInfoForm(fb: FormBuilder, contactInfo: ContactInfo): FormGroup {
  return fb.group({
    cpf: [contactInfo.cpf],
    email: [contactInfo.email],
    phoneNumber: [contactInfo.phoneNumber],
    whatsAppNumber: [contactInfo.whatsAppNumber],
    fatherName: [contactInfo.fatherName],
    motherName: [contactInfo.motherName],
    education: [contactInfo.education]
  });
}
