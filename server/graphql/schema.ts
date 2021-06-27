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

  type Query {
    getAllCompanies: [Company]
    findCompanyById(id: String!): Company
    findEmployeeByCompanyId(id: String!): [Employee]
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
