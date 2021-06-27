import { EmployeesAPI } from '../../employee/employee.data-source';
import * as mockedDB from '../env/database';
import companyModel from "../../company/company.model";
import employeeModel from "../../employee/employee.model";
import createRandomCompanies from '../utils/createRandomCompanies';
import faker from 'faker';
import createRandomNumericString from '../utils/createRandomNumericString';


describe('Employee data source', () => {
  const employeeApi = new EmployeesAPI(employeeModel, companyModel);

  beforeAll(async () => await mockedDB.connect());

  afterEach(async () => await mockedDB.clearDatabase());

  afterAll(async () => await mockedDB.closeDatabase());

  test('should save a new employee', async () => {
    const companies = await createRandomCompanies(2);

    const companiesId = companies.map(company => String(company.id));

    const fakeData = {
      address: faker.address.streetAddress(),
      benefits: ['vr', 'gymPass'],
      companies: companiesId,
      cpf: createRandomNumericString(11),
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      phoneNumber: createRandomNumericString(10)
    }

    const created = await employeeApi.createEmployee(fakeData);

    const updatedCompanies = await companyModel.find({
      _id: {
        $in: companiesId
      },
    })

    expect(created.id).toBeDefined();
    expect(created).toEqual(
      expect.objectContaining({
        address: fakeData.address,
        benefits: expect.arrayContaining(['vr', 'gymPass']),
        cpf: fakeData.cpf,
        name: fakeData.name,
        phoneNumber: fakeData.phoneNumber,
      })
    );
    expect(created.companies).toHaveLength(2)
    expect(String(updatedCompanies[0].employees[0])).toContain(created.id)
    expect(String(updatedCompanies[1].employees[0])).toContain(created.id)
  })

  test('should not save a new employee trying to assign the same employee twice to the same company', async () => {
    expect.assertions(1);
    const companies = await createRandomCompanies(2);

    const companiesId = companies.map(company => String(company.id));

    const fakeData = {
      address: faker.address.streetAddress(),
      benefits: ['vr', 'gymPass'],
      companies: [companiesId[0], companiesId[0]],
      cpf: createRandomNumericString(11),
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      phoneNumber: createRandomNumericString(10)
    }

    await employeeApi.createEmployee(fakeData)
      .catch(err => {
        expect(err.message).toEqual('Empresa não pode ter o mesmo colaborador registrado 2 vezes');
      })
  })

  test('should push new employees to company', async () => {
    const companies = await createRandomCompanies(2);

    const companiesId = companies.map(company => String(company.id));

    const fakeData = () => ({
      address: faker.address.streetAddress(),
      benefits: ['vr', 'gymPass'],
      companies: [companiesId[0]],
      cpf: createRandomNumericString(11),
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      phoneNumber: createRandomNumericString(10)
    })

    await employeeApi.createEmployee(fakeData());
    await employeeApi.createEmployee(fakeData());

    const company = await companyModel.findById(companiesId[0]);

    expect(company?.employees).toHaveLength(2);
  })

  test('should get employees by company', async () => {
    const companies = await createRandomCompanies(2);

    const companiesId = companies.map(company => String(company.id));

    const fakeData = () => ({
      address: faker.address.streetAddress(),
      benefits: ['vr', 'gymPass'],
      companies: [companiesId[0]],
      cpf: createRandomNumericString(11),
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      phoneNumber: createRandomNumericString(10)
    })

    await employeeApi.createEmployee(fakeData());
    await employeeApi.createEmployee(fakeData());

    const employees = await employeeApi.findEmployeeByCompanyId({
      companyId: companiesId[0]
    });

    const emptyEmployees = await employeeApi.findEmployeeByCompanyId({
      companyId: companiesId[1]
    });

    expect(employees.nodes).toHaveLength(2);
    expect(emptyEmployees.nodes).toHaveLength(0);
  })
})
