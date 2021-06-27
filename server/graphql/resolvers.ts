import {
  getAllCompanies,
  createCompany,
  findCompanyById,
} from "../company/company.resolver.js";

import {
  createEmployee
} from "../employee/employee.resolver.js";

export const resolvers = {
  Query: {
    getAllCompanies,
    findCompanyById,
  },
  Mutation: {
    createCompany,
    createEmployee,
  },
};
