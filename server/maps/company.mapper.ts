import { ICreateCompanyResponseDTO } from "../company/company.dto";
import { ICompanySchema } from "../company/company.model";

export class CompanyMapper {
  static toDTO(data: ICompanySchema): ICreateCompanyResponseDTO {
    return {
      id: String(data.id),
      address: data.address,
      chosenBenefits: data.chosenBenefits,
      cnpj: data.cnpj,
      name: data.name,
      tradingName: data.tradingName
    }
  }
}