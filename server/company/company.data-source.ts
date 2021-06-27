import { DataSource } from "apollo-datasource";
import mongoose from "mongoose";
import validateBenefits from "../utils/validateBenefits";
import { ICreateCompanyRequestDTO } from "./company.dto";
import { ICompanySchema } from "./company.model";

export class CompaniesAPI extends DataSource {
  constructor(private model: mongoose.Model<ICompanySchema>) {
    super();
  }

  async getAllCompanies() {
    return this.model.find();
  }

  async findById(id: string) {
    return this.model.findById(id);
  }

  async createCompany(args: ICreateCompanyRequestDTO) {

    if(!validateBenefits(args.chosenBenefits)){
      throw new Error("Benefícios devem ser apenas 'vt', 'vr', 'gympass'");
    }

    return this.model.create(args);
  }
}
