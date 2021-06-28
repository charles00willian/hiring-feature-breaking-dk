import companyModel from "../../company/company.model";
import { CompaniesAPI } from "../../company/company.data-source";
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schema";
import employeeModel from "../../employee/employee.model";
import { EmployeesAPI } from "../../employee/employee.data-source";

export const config = {
  typeDefs,
  resolvers,
  playground: true,
  dataSources: () => ({
    companiesAPI: new CompaniesAPI(companyModel),
    employeesAPI: new EmployeesAPI(employeeModel, companyModel),
  }), 
}
