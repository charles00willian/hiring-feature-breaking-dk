import faker from 'faker';
import createRandomNumericString from "./createRandomNumericString"

export default () => {
  return {
    address: faker.address.streetAddress(),
    chosenBenefits: ["vt", "gymPass"],
    cnpj: createRandomNumericString(14),
    name: faker.company.companyName(),
    tradingName: faker.company.companyName()
  }
}