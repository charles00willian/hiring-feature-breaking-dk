export async function createCompany(_parent, args, { dataSources }) {
  return dataSources.companiesAPI.createCompany(args);
}

export async function getAllCompanies(_parent, args, { dataSources }) {
  return dataSources.companiesAPI.getAllCompanies(args);
}

export async function findCompanyById(_parent, { id }, { dataSources }) {
  return dataSources.companiesAPI.findById(id);
}
