import { ICreateEmployeeResponseDTO } from "../employee/employee.dto";

export interface ICreateCompanyRequestDTO {
  name: string;
  tradingName: string;
  cnpj: string;
  address: string;
  chosenBenefits: string[];
}

export interface ICreateCompanyResponseDTO {
  id: string;
  name: string;
  tradingName: string;
  cnpj: string;
  address: string;
  chosenBenefits: string[];
  employees?: ICreateEmployeeResponseDTO[];
}