import { ICreateEmployeeResponseDTO } from "../employee/employee.dto";
import { IEmployeeSchema } from "../employee/employee.model";

export class EmployeeMapper {
  static toDTO(data: IEmployeeSchema): ICreateEmployeeResponseDTO {
    return {
      id: String(data.id),
      address: data.address,
      benefits: data.benefits,
      cpf: data.cpf,
      name: data.name,
      phoneNumber: data.phoneNumber,
    }
  }
}