import { ApolloServer } from 'apollo-server';
import { config } from '../env/apollo';
import * as mockedDB from '../env/database';
import { CREATE_COMPANY, CREATE_EMPLOYEE } from '../env/mutations';
import faker from 'faker';
import createRandomNumericString from '../utils/createRandomNumericString';
import companyFactory from '../utils/companyFactory';
import { GET_ALL_COMPANIES, GET_EMPLOYEES_BY_COMPANY_ID } from '../env/queries';
import companyModel from "../../company/company.model";
import createRandomCompanies from '../utils/createRandomCompanies';
import employeeFactory from '../utils/employeeFactory';

describe('Apollo server', () => {
  const server = new ApolloServer(config);

  beforeAll(async () => await mockedDB.connect());

  afterEach(async () => await mockedDB.clearDatabase());

  afterAll(async () => await mockedDB.closeDatabase());

  test('should create a company', async () => {
    const testData = companyFactory();

    const result = await server.executeOperation({
      query: CREATE_COMPANY,
      variables: testData
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.createCompany.id).toBeDefined();
    expect(result.data?.createCompany).toEqual(
      expect.objectContaining({
        address: testData.address,
        chosenBenefits: testData.chosenBenefits,
        cnpj: testData.cnpj,
        name: testData.name,
        tradingName: testData.tradingName
      })
    )
  })

  test('should find all companies paginated with offset and limit', async () => {
    await createRandomCompanies(4);

    const result = await server.executeOperation({
      query: GET_ALL_COMPANIES,
      variables: {
        offset: 1,
        limit: 2
      }
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.getAllCompanies.pagination.totalElements).toEqual(4);
    expect(result.data?.getAllCompanies.nodes).toHaveLength(2);
  })

  test('should find all companies without offset', async () => {
    await createRandomCompanies(5);

    const result = await server.executeOperation({
      query: GET_ALL_COMPANIES,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.getAllCompanies.pagination.totalElements).toEqual(5);
    expect(result.data?.getAllCompanies.nodes).toHaveLength(5);
  })

  test('should save a new employee', async () => {
    const companies = await createRandomCompanies(2);

    const companiesId = companies.map(company => String(company.id));

    const fakeData = employeeFactory({
      benefits: ['vr'],
      companiesId,
    })

    const result = await server.executeOperation({
      query: CREATE_EMPLOYEE,
      variables: fakeData
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.createEmployee.id).toBeDefined();
    expect(result.data?.createEmployee).toEqual(
      expect.objectContaining({
        address: fakeData.address,
        benefits: expect.arrayContaining(['vr']),
        cpf: fakeData.cpf,
        name: fakeData.name,
        phoneNumber: fakeData.phoneNumber,
      })
    );
  })

  test('should list employees from a company', async () => {
    const companies = await createRandomCompanies(5);

    const companiesId = [String(companies[2].id), String(companies[4].id)];

    const fakeData = employeeFactory({
      benefits: ['vr'],
      companiesId,
    })

    await server.executeOperation({
      query: CREATE_EMPLOYEE,
      variables: fakeData
    });

    const result = await server.executeOperation({
      query: GET_EMPLOYEES_BY_COMPANY_ID,
      variables: {
        id: String(companies[2].id)
      }
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.findEmployeeByCompanyId.pagination.totalElements).toEqual(1);
    expect(result.data?.findEmployeeByCompanyId.nodes).toHaveLength(1);
  })
})
