import express from 'express';
import auth from '../../middleware/auth';
import { uploadLocal } from '../../utils/sendImageToCloudinary';
import { USER_ROLE } from '../User/user.constant';
import { RentalHousePostControllers } from './rentalHouse.controller';

const router = express.Router();

router.post(
  '/listings',

  auth(USER_ROLE.landlord, USER_ROLE.admin),
  RentalHousePostControllers.createRentalHousePost,
);

router.get(
  '/listings',
  auth(USER_ROLE.landlord),
  RentalHousePostControllers.getAllRentalHousePost,
);
router.get(
  '/listings/count',
  auth(USER_ROLE.landlord),
  RentalHousePostControllers.getAllRequestCount,
);
router.get('/', RentalHousePostControllers.getAllRentalHousePostPublic);

router.get(
  '/listings/:postId',
  RentalHousePostControllers.getSingleRentalHousePost,
);
router.put(
  '/listings/:postId',
  uploadLocal.array('images'),
  RentalHousePostControllers.updateRentalHousePost,
);
router.delete(
  '/listings/:postId',
  RentalHousePostControllers.deleteRentalHousePost,
);

// Request Handle for Landlord

router.get(
  '/requests',
  auth(USER_ROLE.landlord),
  RentalHousePostControllers.getAllRequest,
);
router.get('/requests/:requestId', RentalHousePostControllers.getSingleRequest);
router.put(
  '/requests/:requestId',
  auth(USER_ROLE.landlord),
  RentalHousePostControllers.updateSingleRequestByLandlord,
);

export const RentalHouseRoutes = router;
