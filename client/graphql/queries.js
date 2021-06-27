import { gql } from "@apollo/client";

export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies {
    getAllCompanies {
      id
      name
      cnpj
      tradingName
      address
      chosenBenefits
    }
  }
`;

export const GET_EMPLOYEES_BY_ID = gql`
  query GetEmployeeByCompanyId($id: String!)  {
    findEmployeeByCompanyId(id: $id){
      id
      name
      cpf
      address
      phoneNumber
      benefits
    }
  }
`;

