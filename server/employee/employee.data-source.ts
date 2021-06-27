import { DataSource } from "apollo-datasource";
import mongoose from "mongoose";
import { ICompanySchema } from "../company/company.model";
import { EmployeeMapper } from "../maps/employee.mapper";
import checkDuplicate from "../utils/hasDuplicates";
import paginate from "../utils/paginate";
import { ICreateEmployeeRequestDTO } from "./employee.dto";
import { IEmployeeSchema } from "./employee.model";

export class EmployeesAPI extends DataSource {
  constructor(
    private employeeModel: mongoose.Model<IEmployeeSchema>,
    private companyModel: mongoose.Model<ICompanySchema>
  ) {
    super();
  }
  async createEmployee(args: ICreateEmployeeRequestDTO) {
    
    if(checkDuplicate(args.companies)){
      throw new Error('Empresa não pode ter o mesmo colaborador registrado 2 vezes');
    }

    const employee = await this.employeeModel.create(args);

    const companiesID = employee.companies.map(company => company);

    await this.companyModel.updateMany({
      _id: companiesID,
    }, {
      $addToSet: {
        employees: employee.id.toString(),
      }
    });

    return EmployeeMapper.toDTO(employee);
  }

  async findEmployeeByCompanyId(
    {
      companyId,
      offset, 
      limit
    }:
    {
      companyId: string, 
      offset: number | undefined, 
      limit: number | undefined
    }
  ) {

    const paginatedResult = await paginate<IEmployeeSchema>(
      {
        limit,
        offset
      }, 
      this.employeeModel,
      {
        companies: companyId as any,
      }
    );

    return {
      pagination: {
      ...paginatedResult
      },
      nodes: paginatedResult.docs.map(EmployeeMapper.toDTO)
    };
  }
}
