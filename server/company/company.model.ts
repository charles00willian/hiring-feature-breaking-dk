import mongoose from "mongoose";
import { IEmployeeSchema } from "../employee/employee.model";


export interface ICompanySchema extends mongoose.Document {
  name: string;
  tradingName: string;
  cnpj: string;
  address: string;
  chosenBenefits: string[];
  employees: IEmployeeSchema[];
}

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nome da empresa é obrigatório"],
    maxlength: [100, "Nome deve possuir no máximo 100 caracteres"],
  },
  tradingName: {
    type: String,
    required: [true, "Nome fantasia é obrigatório"],
    maxlength: [100, "Nome fantasia deve possuir no máximo 100 caracteres"],
  },
  cnpj: {
    type: String,
    required: [true, "CNPJ é obrigatório"],
    unique: [true, "Já existe uma empresa com este CNPJ"],
    match: [/^[0-9]{14}$/, "CNPJ deve possuir apenas números e 14 caracteres"],
  },
  address: {
    type: String,
    required: [true, "Endereço é obrigatório"],
    maxlength: [100, "Endereço deve possuir no máximo 100 caracteres"],
  },
  chosenBenefits: {
    type: Array,
  },
  employees: [{
    type: mongoose.Types.ObjectId,
    ref: 'employees',
  }]
});

export default mongoose.model<ICompanySchema>("companies", CompanySchema);
