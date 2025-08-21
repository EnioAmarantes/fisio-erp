import { ContactInfo } from './contact-info';
import { Address } from './address';

export class CustomerData {
    constructor() {
        this.contactInfo = {
            cpf: '',
            email: '',
            phoneNumber: '',
            whatsAppNumber: '',
            fatherName: '',
            motherName: '',
            education: ''
        };
        this.address = {
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        };
    }

    id: number = 0;
    code: string = '';
    name: string = '';
    birthDate: Date | null = null;
    maritalStatus: number | null = null;
    gender: string | null = null;
    ensuranceName: string = '';
    description: string = '';
    contactInfo: ContactInfo;
    address: Address;
}