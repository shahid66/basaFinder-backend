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
const getRentRequestByUser = async (id: string) => {
  const rentRequest = await RequestRentModel.find({ user: id })
    .populate('user', 'name email')
    .populate('rentalHouse', 'location images');
  return rentRequest;
};
const getSingleRentRequest = async (user: string) => {
  const rentRequest = await RequestRentModel.findById(user);
  return rentRequest;
};
const getRequestStatusByUser = async (user: string, postId: string) => {
  const rentRequest = await RequestRentModel.findOne({
    user: user,
    rentalHouse: postId,
  });
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
  console.log(reqId, 'reqId');
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

  if (
    rentRequest?.user?.address == null ||
    rentRequest?.user?.address == undefined
  ) {
    return {
      status: false,
      message: 'You need to update your profile first',
    };
  } else {
    const payment = await requestUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
      console.log('dhukse');
      const order = await RequestRentModel.findByIdAndUpdate(
        { _id: payment.customer_order_id },
        {
          transaction: {
            id: payment.sp_order_id,
            transactionStatus: payment.transactionStatus,
          },
        },
      );
      console.log(order, 'order');
    }

    return payment.checkout_url;
  }
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await requestUtils.verifyPaymentAsync(order_id);
  console.log(order_id, 'verifiedPayment');
  if (verifiedPayment.length) {
    await RequestRentModel.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        paymentStatus:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

export const RentRequestServices = {
  createRentRequest,
  getRentRequest,
  getSingleRentRequest,
  getRequestStatusByUser,
  paymentRentRequest,
  verifyPayment,
  getRentRequestByUser,
};
