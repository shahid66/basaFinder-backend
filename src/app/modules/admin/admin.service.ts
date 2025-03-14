/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import QueryBuilder from '../../builder/QueryBuilder';
import { sendImagesToCloudinary } from '../../utils/sendImageToCloudinary';
import { IRentalHousePost } from '../rentalhouse/rentalHouse.interface';
import { RentalHouseModel } from '../rentalhouse/rentalHouse.model';
import { User } from '../User/user.model';
import { TUser } from './user.interface';


// **GET** /admin/users: Retrieve all user(tenants, landlords) accounts.
// **PUT** /admin/users/:id: Update user roles.
// **DELETE** /admin/user/:id: Delete user.
// **GET** /admin/listings: Retrieve all rental house listings.
// **PUT** /admin/listings/:id: Update or moderate a rental listing.
// **DELETE** /admin/listings/:id: Remove a rental listing if necessary.

const getAllUserIntoDB = async () => {
  const result = await User.find({});
  return result;
};

const updateUserIntoDB = async (id: string, userData: TUser, files: any) => {
  if (files) {
    const uploadedFiles = files.map((file: any) => ({
      imageName: file.filename,
      path: file.path,
    }));

    //send image to cloudinary
    const cloudinaryResponses = await sendImagesToCloudinary(uploadedFiles);
    const images = cloudinaryResponses.map((res) => res.secure_url);
    userData.image = images[0];
  }

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



const getRentalHousePostPublicFromDB = async (
  query: Record<string, unknown>,
) => {
  const productQuery = new QueryBuilder(
    RentalHouseModel.find().populate('user', 'name phone'),
    query,
  )

    .filter()
    .sort()
    .paginate();
  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return { result, meta };
};

const updateRentalHousePostIntoDB = async (
  id: string,
  postData: IRentalHousePost,
  files: any,
) => {
  if (files && files.length > 0) {
    const uploadedFiles = files.map((file: any) => ({
      imageName: file.filename,
      path: file.path,
    }));

    //send image to cloudinary
    const cloudinaryResponses = await sendImagesToCloudinary(uploadedFiles);
    const images = cloudinaryResponses.map((res) => res.secure_url);
    postData.images = images;
  }

  const result = await RentalHouseModel.findByIdAndUpdate(id, postData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteRentalHousePostFromDB = async (id: string) => {
  const result = await RentalHouseModel.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  updateUserIntoDB,
  getRentalHousePostPublicFromDB,
  updateRentalHousePostIntoDB,
  deleteRentalHousePostFromDB,
  changeStatus,
  deleteUserFromDB,
  getAllUserIntoDB,
};
