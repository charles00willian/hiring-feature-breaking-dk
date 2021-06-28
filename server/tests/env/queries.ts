export const GET_ALL_COMPANIES = `
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

export const GET_EMPLOYEES_BY_COMPANY_ID = `
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


