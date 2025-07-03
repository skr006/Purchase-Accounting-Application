import { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

import {
  createBill,
  updateBill,
  closeBill,
  getAllBills,
  getMyBills,
  deleteBill
} from '../controllers/bill.controller.js';

const billRouter = Router();

billRouter.use(authorize);
billRouter.post('/', createBill);
billRouter.put('/:id', updateBill);
billRouter.patch('/:id/close', closeBill);
billRouter.get('/my', getMyBills);
billRouter.get('/', requireRole('admin'), getAllBills);
billRouter.delete('/:id', deleteBill);

export default billRouter;