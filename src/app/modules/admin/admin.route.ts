/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';

import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get(
  '/users',

  AdminControllers.getAllUser,
);

router.put(
  '/users/:id',

  AdminControllers.changeStatus,
);
router.delete(
  '/users/:id',

  AdminControllers.deleteUser,
);




router.get(
  '/listings',

  AdminControllers.getAllRentalHousePost,
);
router.put(
  '/listings/:postId',

  AdminControllers.updateRentalHousePost,
);
router.delete(
  '/listings/:postId',

  AdminControllers.deleteRentalHousePost,
);

export const AdminRoutes = router;
