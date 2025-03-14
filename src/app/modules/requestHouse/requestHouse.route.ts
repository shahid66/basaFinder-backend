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
router.put(
  '/payment/:id',

  RequestHouseControllers.paymentRequest,
);

//For Admin
router.get(
  '/requests',
  auth(USER_ROLE.tenant, USER_ROLE.admin),
  RequestHouseControllers.getRequest,
);

export const RequestHouseRoutes = router;
