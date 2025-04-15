import httpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllUser = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllUserIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All User get successfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AdminServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await AdminServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleted Successfully',
    data: result,
  });
});

const getAllRentalHousePost = catchAsync(async (req, res) => {
  const result = await AdminServices.getRentalHousePostPublicFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Rental House Post get successfully',
    data: result,
  });
});
const updateRentalHousePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await AdminServices.updateRentalHousePostIntoDB(
    postId,
    req.body,
    req.files,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Rental House Post successfully',
    data: result,
  });
});
const deleteRentalHousePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await AdminServices.deleteRentalHousePostFromDB(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Rental House Post successfully',
    data: result,
  });
});
const userCount = catchAsync(async (req, res) => {
  
  const result = await AdminServices.getUserCount();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Total user count successfully',
    data: result,
  });
});

export const AdminControllers = {
  changeStatus,
  deleteUser,
  getAllUser,
  getAllRentalHousePost,
  updateRentalHousePost,
  deleteRentalHousePost,
  userCount
};
