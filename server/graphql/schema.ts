import { gql } from "apollo-server";

export const typeDefs = gql`
  type Company {
    id: ID
    name: String
    tradingName: String
    cnpj: String
    address: String
    chosenBenefits: [String]
    employees: [String]
  }

  type Employee {
    id: ID
    name: String
    companies: [String]
    cpf: String
    address: String
    phoneNumber: String
    benefits: [String]
  }

  type Query {
    getAllCompanies: [Company]
    findCompanyById(id: String!): Company
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
