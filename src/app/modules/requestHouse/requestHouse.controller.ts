import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { RentRequestServices } from './requestHouse.service';

const createRequest = catchAsync(async (req, res) => {
  const { id } = req.user;

  const result = await RentRequestServices.createRentRequest(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Request send successfully',
    data: result,
  });
});
const getRequest = catchAsync(async (req, res) => {
  const result = await RentRequestServices.getRentRequest();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all Request ',
    data: result,
  });
});
const getSingleRequest = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await RentRequestServices.getSingleRentRequest(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Get Single Request ',
    data: result,
  });
});
const paymentRequest = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await RentRequestServices.paymentRentRequest(id, req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Get Single Request ',
    data: result,
  });
});

export const RequestHouseControllers = {
  createRequest,
  getRequest,
  getSingleRequest,
  paymentRequest,
  // createOrder,
  // getOrders,
  // verifyPayment,
  // deleteOrder,
  // getUserOrder,
  // updateOrdersStatus,
};
