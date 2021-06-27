import companyModel from "../../company/company.model"
import createRandomNumericString from "./createRandomNumericString"
import faker from 'faker';

export default async (quantity: number) => {
  return Promise.all(new Array(quantity).fill(Math.random()).map(async () => {
    return companyModel.create({
      address: faker.address.streetAddress(),
      chosenBenefits: ["vt", "gymPass"],
      cnpj: createRandomNumericString(14),
      name: faker.company.companyName(),
      tradingName: faker.company.companyName()
    })
  }))
}