import { gql } from "@apollo/client";

export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies($limit: Int, $offset: Int) {
    getAllCompanies(limit: $limit, offset: $offset) {
      pagination {
        totalElements
      }
      nodes {
        id
        name
        cnpj
        tradingName
        address
        chosenBenefits
      }
    }
  }
`;

export const GET_EMPLOYEES_BY_COMPANY_ID = gql`
  query GetEmployeeByCompanyId($id: String!, $limit: Int, $offset: Int)  {
    findEmployeeByCompanyId(companyId: $id, limit: $limit, offset: $offset){
      nodes {
        id
        name
        cpf
        address
        phoneNumber
        benefits
      }
      pagination {
        totalElements
      }
    }
  }
`;

