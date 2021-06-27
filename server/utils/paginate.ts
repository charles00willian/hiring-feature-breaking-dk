import mongoose, { Document } from "mongoose";

export interface IPaginateRequest {
  limit?: number;
  offset?: number;
}

export interface IPaginateResult<T> {
  docs: T[];
  totalElements: number;
  limit: number;
}

export default async function paginate<T extends Document<any, {}>>(
  { limit, offset }: IPaginateRequest,
  model: mongoose.Model<T>,
  filter?: mongoose.FilterQuery<T>,
): Promise<IPaginateResult<T>> {
  const take = limit;
  const skip = offset || 0;

  const query = model.find(filter || {})

  if(take !== undefined){
    query.limit(take)
  }

  query.skip(skip)

  const results = await query.exec();

  const totalElements = await model.find(filter || {}).countDocuments();
     
  return {
    docs: results,
    limit: take || -1,
    totalElements,
  };
}
