import companyModel from "../../company/company.model"
import createRandomNumericString from "./createRandomNumericString"
import faker from 'faker';
import companyFactory from "./companyFactory";

export default async (quantity: number) => {
  return Promise.all(new Array(quantity).fill(Math.random()).map(async () => {
    return companyModel.create(companyFactory())
  }))
}