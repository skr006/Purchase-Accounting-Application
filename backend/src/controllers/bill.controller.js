import Bill from '../models/bill.model.js';
import User from '../models/user.model.js';

const normalizeText = (value) => typeof value === 'string' ? value.trim() : '';

const billPopulate = [
  { path: 'from', select: 'name email username phoneNumber' },
  { path: 'to', select: 'name email username phoneNumber' },
];

const populateBill = (query) => query.populate(billPopulate);

const parseAmount = (amount) => {
  const parsed = Number(amount);
  return Number.isFinite(parsed) ? parsed : null;
};

export const createBill = async (req, res) => {
  try {
    const to = normalizeText(req.body?.to);
    const description = normalizeText(req.body?.description);
    const amount = parseAmount(req.body?.amount);

    if (!to || !description || amount === null || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Recipient username, description, and a positive amount are required',
      });
    }

    const recipient = await User.findOne({ username: to });
    if (!recipient) {
      return res.status(404).json({ success: false, message: 'Recipient user not found' });
    }

    if (recipient._id.equals(req.user._id)) {
      return res.status(400).json({ success: false, message: 'You cannot create a bill for yourself' });
    }

    const bill = await Bill.create({
      from: req.user._id,
      to: recipient._id,
      amount,
      description,
      status: 'Pending',
      completed: false,
    });

    const populatedBill = await populateBill(Bill.findById(bill._id));
    res.status(201).json({
      success: true,
      message: 'Bill created successfully',
      bill: populatedBill,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const closeBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });

    if (!bill.from.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Only the creator can close this bill' });
    }

    if (bill.completed) {
      return res.status(400).json({ success: false, message: 'Bill is already closed' });
    }

    if (bill.status !== 'Paid') {
      return res.status(400).json({ success: false, message: 'Bill must be marked paid before closing' });
    }

    bill.completed = true;
    await bill.save();

    const populatedBill = await populateBill(Bill.findById(bill._id));
    res.json({ success: true, message: 'Bill closed successfully', bill: populatedBill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const payBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });

    if (!bill.to.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Only the receiver can mark this bill as paid' });
    }

    if (bill.completed) {
      return res.status(400).json({ success: false, message: 'Bill is already closed' });
    }

    if (bill.status === 'Paid') {
      return res.status(400).json({ success: false, message: 'Bill is already marked paid' });
    }

    bill.status = 'Paid';
    await bill.save();

    const populatedBill = await populateBill(Bill.findById(bill._id));
    res.json({ success: true, message: 'Bill marked as paid', bill: populatedBill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUnpaidBills = async (req, res) => {
  try {
    const bills = await populateBill(Bill.find({
      to: req.user._id,
      status: 'Pending',
      completed: false,
    })).sort({ createdAt: -1 });

    res.json({ success: true, bills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPaidBills = async (req, res) => {
  try {
    const bills = await populateBill(Bill.find({
      to: req.user._id,
      status: 'Paid',
    })).sort({ updatedAt: -1 });

    res.json({ success: true, bills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyBills = async (req, res) => {
  try {
    const bills = await populateBill(Bill.find({
      from: req.user._id,
    })).sort({ createdAt: -1 });

    res.json({ success: true, bills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBills = async (req, res) => {
  try {
    const bills = await populateBill(Bill.find()).sort({ createdAt: -1 });
    res.json({ success: true, bills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });

    await bill.deleteOne();
    res.json({ success: true, message: 'Bill deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }

    if (!bill.from.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Only the creator can update this bill' });
    }

    if (bill.completed || bill.status === 'Paid') {
      return res.status(400).json({ success: false, message: 'Paid or closed bills cannot be edited' });
    }

    const updates = {};

    if (req.body?.amount !== undefined) {
      const amount = parseAmount(req.body.amount);
      if (amount === null || amount <= 0) {
        return res.status(400).json({ success: false, message: 'Amount must be a positive number' });
      }
      updates.amount = amount;
    }

    if (req.body?.description !== undefined) {
      const description = normalizeText(req.body.description);
      if (!description) {
        return res.status(400).json({ success: false, message: 'Description is required' });
      }
      updates.description = description;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No supported bill fields provided' });
    }

    const updatedBill = await populateBill(Bill.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ));

    res.json({ success: true, message: 'Bill updated successfully', bill: updatedBill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
