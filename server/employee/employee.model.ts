import mongoose from "mongoose";
import { ICompanySchema } from "../company/company.model";

export interface IEmployeeSchema extends mongoose.Document  {
  name: string;
  cpf: string;
  address: string;
  phoneNumber: string;
  benefits: string[];
  companies: mongoose.Schema.Types.ObjectId[];
}

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nome do colaborador é obrigatório"],
    maxlength: [100, "Nome deve possuir no máximo 100 caracteres"],
  },
  companies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'companies',
    }
  ],
  cpf: {
    type: String,
    unique: [true, "Não podem ser cadastrados 2 colaboradores com o mesmo CPF"],
    required: [true, "CPF é obrigatório"],
    match: [/^[0-9]{11}$/, "CPF deve possuir apenas números e 11 caracteres"],
  },
  address: {
    type: String,
    required: [true, "Endereço é obrigatório"],
    maxlength: [100, "Endereço deve possuir no máximo 100 caracteres"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Telefone é obrigatório"],
    match: [/^[0-9]{9,}$/, "Telefone está inválido, deve conter pelo menos 10 dígitos numéricos, adicione também o DDD"],
  },
  benefits: {
    type: Array,
  },
});

export default mongoose.model<IEmployeeSchema>("employees", EmployeeSchema);
