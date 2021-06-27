import {
  getAllCompanies,
  createCompany,
  findCompanyById,
} from "../company/company.resolver.js";

import {
  createEmployee,
  findEmployeeByCompanyId
} from "../employee/employee.resolver.js";

export const resolvers = {
  Query: {
    getAllCompanies,
    findCompanyById,
    findEmployeeByCompanyId,
  },
  Mutation: {
    createCompany,
    createEmployee,
  },
};
