import { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/requireRole.middleware.js';

import {
  createBill,
  updateBill,
  closeBill,
  getAllBills,
  getMyBills,
  deleteBill,
  getUnpaidBills,
  getPaidBills
} from '../controllers/bill.controller.js';

const billRouter = Router();

billRouter.use(authorize);


billRouter.post('/', createBill);


billRouter.get('/unpaid', getUnpaidBills);


billRouter.get('/paid', getPaidBills);


billRouter.get('/my', getMyBills);


billRouter.patch('/:id/close', closeBill);


billRouter.put('/:id', updateBill);


billRouter.get('/', requireRole('admin'), getAllBills);


billRouter.delete('/:id', deleteBill);

export default billRouter;