import companyModel from "../company/company.model";
import { ApolloServer } from "apollo-server";
import { CompaniesAPI } from "../company/company.data-source";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import employeeModel from "../employee/employee.model";
import { EmployeesAPI } from "../employee/employee.data-source";

export const apolloServer = () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    dataSources: () => ({
      companiesAPI: new CompaniesAPI(companyModel),
      employeesAPI: new EmployeesAPI(employeeModel, companyModel),
    }),
  });
