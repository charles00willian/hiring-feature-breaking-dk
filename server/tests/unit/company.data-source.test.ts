import { CompaniesAPI } from "../../company/company.data-source"
import companyModel from "../../company/company.model";
import * as mockedDB from '../env/database';
import faker from 'faker';
import createRandomNumericString from "../utils/createRandomNumericString";
import mongoose from 'mongoose';
import createRandomCompanies from "../utils/createRandomCompanies";

describe('Company Data Source', () => {

  beforeAll(async () => await mockedDB.connect());

  afterEach(async () => await mockedDB.clearDatabase());

  afterAll(async () => await mockedDB.closeDatabase());

  test('should save a new company', async () => {
    const companiesApi = new CompaniesAPI(companyModel);

    const saved = await companiesApi.createCompany({
      address: "Endereço teste 1",
      chosenBenefits: ["vt", "gymPass"],
      cnpj: "01234567891234",
      name: "Empresa Teste",
      tradingName: "Nome fanstasia teste"
    })

    expect(saved.id).toBeDefined();
    expect(saved).toEqual(
      expect.objectContaining({
        address: "Endereço teste 1",
        chosenBenefits: expect.arrayContaining(["vt", "gymPass"]),
        cnpj: "01234567891234",
        name: "Empresa Teste",
        tradingName: "Nome fanstasia teste"
      })
    )
  })

  test('should throw an error with wrong benefits', async () => {
    expect.assertions(1)
    const companiesApi = new CompaniesAPI(companyModel);

    await companiesApi.createCompany({
      address: "Endereço teste 1",
      chosenBenefits: ["vt", "gymPasss"],
      cnpj: "01234567891234",
      name: "Empresa Teste",
      tradingName: "Nome fanstasia teste"
    }).catch(err => {
      expect(err.message).toEqual("Benefícios devem ser apenas 'vt', 'vr', 'gympass'");
    });
  })

  test('should find a company by id', async () => {
    const saved = await companyModel.create({
      address: faker.address.streetAddress(),
      chosenBenefits: ["vt", "gymPass"],
      cnpj: createRandomNumericString(14),
      name: faker.company.companyName(),
      tradingName: faker.company.companyName()
    })

    const companiesApi = new CompaniesAPI(companyModel);
    
    const found = await companiesApi.findById(saved.id.toString());

    expect(saved.id).toEqual(found?.id);
  })
  
  test('should not find a company by id and return null', async () => {
    const companiesApi = new CompaniesAPI(companyModel);

    const found = await companiesApi.findById(mongoose.Types.ObjectId().toHexString());

    expect(found).toBe(null);
  })

  test('should not find all companies', async () => {

    await createRandomCompanies(5);
    const companiesApi = new CompaniesAPI(companyModel);

    const found = await companiesApi.getAllCompanies({
      
    });

    expect(found.nodes).toHaveLength(5)
  })

  test('should return offsetted', async () => {

    await createRandomCompanies(5)
    const companiesApi = new CompaniesAPI(companyModel);

    const found = await companiesApi.getAllCompanies({
      offset: 2
    });

    expect(found.nodes).toHaveLength(3)
  })

  test('should return with a limit', async () => {

    await createRandomCompanies(5)
    
    const companiesApi = new CompaniesAPI(companyModel);

    const found = await companiesApi.getAllCompanies({
      limit: 1
    });

    expect(found.nodes).toHaveLength(1)
  })
})
