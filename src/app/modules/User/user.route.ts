/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';

import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',

  UserControllers.createUser,
);

router.get(
  '/',

  UserControllers.getAllUser,
);
router.get(
  '/own',
  auth(USER_ROLE.admin, USER_ROLE.tenant, USER_ROLE.landlord),
  UserControllers.getOwnUser,
);
router.get(
  '/:userId',

  UserControllers.getUser,
);

router.put(
  '/update-user',
  auth(USER_ROLE.admin, USER_ROLE.tenant, USER_ROLE.landlord),

  UserControllers.updateUser,
);
router.post(
  '/change-status/:id',

  UserControllers.changeStatus,
);
router.delete(
  '/:id',

  UserControllers.deleteUser,
);

export const UserRoutes = router;
