export async function createEmployee(_parent, args, { dataSources }) {
  return dataSources.employeesAPI.createEmployee(args);
}

export async function findEmployeeByCompanyId(_parent, args, { dataSources }) {
  return dataSources.employeesAPI.findEmployeeByCompanyId(args);
}
