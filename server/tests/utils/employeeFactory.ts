import createRandomNumericString from "./createRandomNumericString";
import faker from 'faker';

export default ({
  companiesId,
  benefits,
}: {
  companiesId: string[],
  benefits: string[],
} ) => ({
  address: faker.address.streetAddress(),
  benefits,
  companies: companiesId,
  cpf: createRandomNumericString(11),
  name: faker.name.firstName() + ' ' + faker.name.lastName(),
  phoneNumber: createRandomNumericString(10)
})