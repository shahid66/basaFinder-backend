import { z } from 'zod';

const createRentalHousePostValidationSchema = z.object({
  body: z.object({
    location: z.string({
      required_error: 'Location  is required',
    }),
    details: z.string({
      required_error: 'Rental House description is required',
    }),
    rent_amount: z
      .number({
        required_error: 'Rental House price is required',
      })
      .min(0, 'Rental House price cannot be less than 0'),
    nof_bedroom: z
      .number({
        required_error: 'Rental House Number of Bedrooms is required',
      })
      .min(1, 'Rental House Number of Bedrooms  cannot be less than 1'),
  }),
});

const updateRentalHousePostValidationSchema = z.object({
  body: z.object({
    location: z
      .string({
        required_error: 'Location  is required',
      })
      .optional(),
    details: z
      .string({
        required_error: 'Rental House description is required',
      })
      .optional(),
    rent_amount: z
      .number({
        required_error: 'Rental House price is required',
      })
      .optional(),
    nof_bedroom: z
      .number({
        required_error: 'Rental House Number of Bedrooms is required',
      })
      .optional(),
  }),
});

export const productValidation = {
  createRentalHousePostValidationSchema,
  updateRentalHousePostValidationSchema,
};
