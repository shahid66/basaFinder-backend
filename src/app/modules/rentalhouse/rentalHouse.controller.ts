import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ListingsServices } from './rentalHouse.service';

const createRentalHousePost = catchAsync(async (req, res) => {
  const { id } = req.user;
  console.log(req.body);

  const result = await ListingsServices.createRentalHousePostIntoDB({
    user: id,
    ...req.body,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RentalHousePost is created successfully',
    data: result,
  });
});
const getAllRentalHousePost = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await ListingsServices.getRentalHousePostFromDB(req.query, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All RentalHousePost are retrieved successfully',
    data: result,
  });
});
const getSingleRentalHousePost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  const result = await ListingsServices.getSingleRentalHousePostFromDB(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RentalHousePost retrieved successfully',
    data: result,
  });
});
const updateRentalHousePost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  const result = await ListingsServices.updateRentalHousePostIntoDB(
    postId,
    req.body,
    
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RentalHousePost is update successfully',
    data: result,
  });
});

const deleteRentalHousePost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  const result = await ListingsServices.deleteRentalHousePostFromDB(postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RentalHousePost is deleted successfully',
    data: result,
  });
});

const getAllRentalHousePostPublic = catchAsync(async (req, res) => {
  const result = await ListingsServices.getRentalHousePostPublicFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All RentalHousePost are retrieved successfully p',
    data: result,
  });
});

const getSingleRequest = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  const { id } = req.user;

  const result = await ListingsServices.getSingleRentRequest(id, requestId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Request ',
    data: result,
  });
});
const getAllRequest = catchAsync(async (req, res) => {
  const { id } = req.user;

  const result = await ListingsServices.getAllRentRequestByID(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Request ',
    data: result,
  });
});

const updateSingleRequestByLandlord = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  const { id } = req.user;
  const { status, phone } = req.body;

  const result = await ListingsServices.updateSingleRentRequest(
    id,
    requestId,
    status,
    phone,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Single Request ',
    data: result,
  });
});

export const RentalHousePostControllers = {
  createRentalHousePost,
  getAllRentalHousePost,
  getSingleRentalHousePost,
  updateRentalHousePost,
  deleteRentalHousePost,
  getAllRentalHousePostPublic,
  getSingleRequest,
  getAllRequest,
  updateSingleRequestByLandlord,
};
