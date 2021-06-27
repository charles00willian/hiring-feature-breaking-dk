export async function createEmployee(_parent, args, { dataSources }) {
  return dataSources.employeesAPI.createEmployee(args);
}
