import { gql } from "@apollo/client";

export const CREATE_COMPANY = gql`
  mutation CreateCompany(
    $name: String!
    $tradingName: String!
    $cnpj: String!
    $address: String!
    $chosenBenefits: [String!]!
  ) {
    createCompany(
      name: $name
      tradingName: $tradingName
      cnpj: $cnpj
      address: $address
      chosenBenefits: $chosenBenefits
    ) {
      id
      name
      cnpj
      tradingName
      address
      chosenBenefits
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee(
    $name: String!
    $companies: [String]!
    $cpf: String!
    $address: String!
    $phoneNumber: String!
    $benefits: [String]!
  ) {
    createEmployee(
      name: $name
      companies: $companies
      cpf: $cpf
      address: $address
      phoneNumber: $phoneNumber
      benefits: $benefits
    ) {
      name
      cpf
      address
      phoneNumber
      benefits
    }
  }
`;
