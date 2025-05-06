import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { RequestHouseControllers } from './requestHouse.controller';

const router = express.Router();

router.post(
  '/requests',
  auth(USER_ROLE.tenant, USER_ROLE.admin),
  RequestHouseControllers.createRequest,
);

router.get(
  '/requests/:id',
  auth(USER_ROLE.tenant, USER_ROLE.admin),
  RequestHouseControllers.getSingleRequest,
);
router.get(
  '/requests/:id/:postId',

  RequestHouseControllers.getRequestStatusByUser,
);
router.put(
  '/payment/:id',

  RequestHouseControllers.paymentRequest,
);
router.get(
  '/verify',
  auth(USER_ROLE.tenant, USER_ROLE.admin),
  RequestHouseControllers.verifyPayment,
);

//For Admin
router.get(
  '/requests',
  auth(USER_ROLE.tenant, USER_ROLE.admin, USER_ROLE.landlord),
  RequestHouseControllers.getRequest,
);

router.get(
  '/requests-ByUser',
  auth(USER_ROLE.tenant, USER_ROLE.admin, USER_ROLE.landlord),
  RequestHouseControllers.getRequestByUser,
);

export const RequestHouseRoutes = router;
