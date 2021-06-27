import { ICreateCompanyResponseDTO } from "../company/company.dto";

export interface ICreateEmployeeRequestDTO {
  name: string;
  cpf: string;
  address: string;
  phoneNumber: string;
  benefits: string[];
  companies: string[];
}

export interface ICreateEmployeeResponseDTO {
  id: string;
  name: string;
  cpf: string;
  address: string;
  phoneNumber: string;
  benefits: string[];
  companies?: string[];
}

