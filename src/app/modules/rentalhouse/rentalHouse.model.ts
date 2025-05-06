import mongoose, { Schema, model } from 'mongoose';
import { IRentalHousePost } from './rentalHouse.interface';

const ListingsSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    location: { type: String, required: true },
    details: { type: String, required: true },
    rent_amount: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'],
    },
    nof_bedroom: {
      type: Number,
      required: true,
      min: [1, 'Room must be a  minimum 1  '],
    },
    images: {
      type: [{ type: String, required: true }],
      required: true,
    },

    category: {
      type: String,
      enum: [
        'Apartment',
        'Condominium ',
        'Single-Family Home',
        'Multi-Family Home',
        'Townhouse',
        'Duplex',
        'Triplex',
        'Bungalow ',
        'Cottage',
        'Mansion',
        'Villa',
      ],
      required: true,
    },

    status: { type: String, required: true, default: 'available' },
  },
  {
    timestamps: true,
  },
);

export const RentalHouseModel = model<IRentalHousePost>(
  'RentalHouse',
  ListingsSchema,
);
