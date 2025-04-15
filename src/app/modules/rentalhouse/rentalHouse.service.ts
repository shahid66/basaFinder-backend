import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { RequestRentModel } from '../requestHouse/requestHouse.model';
import { IRentalHousePost } from './rentalHouse.interface';
import { RentalHouseModel } from './rentalHouse.model';

const createRentalHousePostIntoDB = async (house: IRentalHousePost) => {
  const result = await RentalHouseModel.create(house);

  return result;
};
const updateRentalHousePostIntoDB = async (
  id: string,
  postData: IRentalHousePost,
) => {
  const result = await RentalHouseModel.findByIdAndUpdate(id, postData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const getRentalHousePostPublicFromDB = async (
  query: Record<string, unknown>,
) => {
  const productQuery = new QueryBuilder(
    RentalHouseModel.find().populate('user', 'name phone'),
    query,
  )
    .search(['location', 'details'])
    .filter()
    .sort()
    .paginate();
  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return { result, meta };
};

const getRentalHousePostFromDB = async (
  query: Record<string, unknown>,
  user: string,
) => {
  const productQuery = new QueryBuilder(
    RentalHouseModel.find({ user }).populate('user', 'name phone'),
    query,
  )

    .filter()
    .sort()
    .paginate();
  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return { result, meta };
};

const getSingleRentalHousePostFromDB = async (id: string) => {
  const result = await RentalHouseModel.findById(id).populate(
    'user',
    'name phone',
  );
  return result;
};

const deleteRentalHousePostFromDB = async (id: string) => {
  const result = await RentalHouseModel.findByIdAndDelete(id);
  return result;
};

const getAllRentRequestByID = async (landlord: string) => {
  const rentRequest = await RequestRentModel.find({ landlord })
    .populate('user', 'name email')
    .populate('rentalHouse', 'location images');
  return rentRequest;
};

const getSingleRentRequest = async (user: string, requestId: string) => {
  const rentRequest = await RequestRentModel.findOne({ user, requestId });
  return rentRequest;
};
const getRentRequestCount = async (landlord: string) => {
  const result = await RequestRentModel.aggregate([
    {
      $match: {
        landlord: new mongoose.Types.ObjectId(landlord),
      }
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1
      }
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        count: 1
      }
    }
  ]);
  return result;
};

const updateSingleRentRequest = async (
  user: string,
  requestId: string,
  status: string,
  landlordPhone: string,
) => {
  const rentRequest = await RequestRentModel.findOneAndUpdate(
    { _id: requestId, landlord: user },
    { status, landlordPhone },
    { new: true },
  );

  return rentRequest;
};

export const ListingsServices = {
  createRentalHousePostIntoDB,
  getRentalHousePostFromDB,
  getSingleRentalHousePostFromDB,
  updateRentalHousePostIntoDB,
  deleteRentalHousePostFromDB,
  getRentalHousePostPublicFromDB,

  getAllRentRequestByID,
  getRentRequestCount,
  getSingleRentRequest,
  updateSingleRentRequest,
};
