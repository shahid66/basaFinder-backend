import { requestUtils } from './request.utils';
import { RequestRentModel } from './requestHouse.model';

interface IRenRequestPayload {
  rentalHouse: string;
  landlord: string;
  phone: string;
  message: string;

  // Make it optional if not always provided
}

const createRentRequest = async (user: string, payload: IRenRequestPayload) => {
  const { rentalHouse, landlord, phone, message } = payload;
  const rentRequest = await RequestRentModel.create({
    user,
    rentalHouse,
    landlord,
    phone,
    message,
  });
  return rentRequest;
};
const getRentRequest = async () => {
  const rentRequest = await RequestRentModel.find()
    .populate('user', 'name email')
    .populate('rentalHouse', 'location images');
  return rentRequest;
};
const getSingleRentRequest = async (user: string) => {
  const rentRequest = await RequestRentModel.findById(user);
  return rentRequest;
};

type ShurjopayPayload = {
  amount: number;
  order_id: string;
  currency: string;
  customer_name: string;
  customer_address: string;
  customer_email: string;
  customer_phone: string;
  customer_city: string;
  client_ip: string;
};

const paymentRentRequest = async (reqId: string, client_ip: string) => {
  const rentRequest = await RequestRentModel.findById(reqId)
    .populate('user')
    .populate('rentalHouse', 'rent_amount');

  
  // payment integration
  const shurjopayPayload: ShurjopayPayload = {
    amount: rentRequest?.rentalHouse?.rent_amount,
    order_id: reqId,
    currency: 'BDT',
    customer_name: rentRequest?.user?.name,
    customer_address: rentRequest?.user?.address,
    customer_email: rentRequest?.user?.email,
    customer_phone: rentRequest?.user?.phone,
    customer_city: rentRequest?.user?.city,
    client_ip,
  };

  const payment = await requestUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
   const order = await RequestRentModel.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }
  return payment.checkout_url;

 
};

export const RentRequestServices = {
  createRentRequest,
  getRentRequest,
  getSingleRentRequest,
  paymentRentRequest,
};
