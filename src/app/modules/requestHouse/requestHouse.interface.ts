import mongoose from 'mongoose';
export interface IRequestRent extends Document {
  user: mongoose.Types.ObjectId;
  landlord: mongoose.Types.ObjectId;

  rentalHouse: mongoose.Types.ObjectId;
  phone: string;
  message: string;
  landlordPhone?: string;
  status: 'Pending' | 'approve' | 'reject' | 'Completed';
  paymentStatus: 'Pending' | 'Paid' | 'Cancelled';

  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };

  createdAt?: Date;
  updatedAt?: Date;
}
