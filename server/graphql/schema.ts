import { gql } from "apollo-server";

export const typeDefs = gql`

  type Company {
    id: ID
    name: String
    tradingName: String
    cnpj: String
    address: String
    chosenBenefits: [String]
  }

  type Employee {
    id: ID
    name: String
    benefits: [String]
    cpf: String
    address: String
    phoneNumber: String
  }

  type Pagination {
    limit: Int
    totalElements: Int
  }

  type EmployeePaginated {
    nodes: [Employee]
    pagination: Pagination
  }

  type CompanyPaginated {
    nodes: [Company]
    pagination: Pagination
  }

  type Query {
    getAllCompanies(offset: Int, limit: Int): CompanyPaginated
    findCompanyById(id: String!): Company
    findEmployeeByCompanyId(companyId: String!, offset: Int, limit: Int): EmployeePaginated
  }

  type Mutation {
    createCompany(
      name: String!
      tradingName: String!
      cnpj: String!
      address: String!
      chosenBenefits: [String]!
    ): Company
    
    createEmployee(
      name: String!
      companies: [String]!
      cpf: String!
      address: String!
      phoneNumber: String!
      benefits: [String]!
    ): Employee
  }
`;
