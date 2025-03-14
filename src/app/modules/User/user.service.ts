/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AuthServices } from '../Auth/auth.service';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  // Check if the user already exists by email
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'Email is already registered',
    );
  }

  // Create the user
  const user = new User(userData);
  const createdUser = await user.save();

  return AuthServices.loginUser({
    email: createdUser.email,
    password: userData.password,
  });
};
const getAllUserIntoDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query).paginate();
  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return { result, meta };
};
const getUserIntoDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const getOwnUserIntoDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const updateUserIntoDB = async (id: string, userData: TUser) => {
  const result = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  updateUserIntoDB,
  createUserIntoDB,
  getUserIntoDB,
  changeStatus,
  deleteUserFromDB,
  getAllUserIntoDB,
  getOwnUserIntoDB,
};
