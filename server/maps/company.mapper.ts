import { ICreateCompanyResponseDTO } from "../company/company.dto";
import { ICompanySchema } from "../company/company.model";
import { EmployeeMapper } from "./employee.mapper";

export class CompanyMapper {
  static toDTO(data: ICompanySchema): ICreateCompanyResponseDTO {
    return {
      id: String(data.id),
      address: data.address,
      chosenBenefits: data.chosenBenefits,
      cnpj: data.cnpj,
      name: data.name,
      tradingName: data.tradingName,
      employees: data.employees?.map(employee => EmployeeMapper.toDTO(employee)) || [],
    }
  }
}