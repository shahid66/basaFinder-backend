import mongoose, { Schema, model } from 'mongoose';
import { IRequestRent } from './requestHouse.interface';

const RequestRentSchema: Schema<IRequestRent> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    rentalHouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RentalHouse',
      required: true,
    },
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    landlordPhone: {
      type: String,
      default: null,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Pending', 'approve', 'reject', 'Completed'],
      default: 'Pending',
    },

    paymentStatus: {
      type: String,
      required: true,
      default: 'Pending',
    },

    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  },
);

export const RequestRentModel = model<IRequestRent>(
  'RequestRent',
  RequestRentSchema,
);
