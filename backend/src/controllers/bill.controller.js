import Bill from '../models/bill.model.js';
import User from '../models/user.model.js';


export const createBill = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated' });
    }

    const { to, description, amount } = req.body;
    if (!to || typeof to !== 'string' || !amount || isNaN(amount)) {
      return res.status(400).json({ success: false, message: 'Invalid input: to and amount are required' });
    }

    const to1 = await User.findOne({ 'username': to.trim() });
    if (!to1) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await Bill.create({ from: req.user._id, to: to1._id, amount, description, status: 'pending', completed: false });
    res.status(201).json({ success: true, message: 'Bill created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const closeBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    if (!bill.to.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only recipient can close the bill' });
    }

    bill.status = 'completed';
    bill.completed = true;
    await bill.save();

    res.json({ success: true, bill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getUnpaidBills = async (req, res) => {
  try {
    
    const bills = await Bill.find({
      to: req.user._id,
      status: 'pending'
    }).populate('from', 'name email username phoneNumber')
      .populate('to', 'name email username phoneNumber')
    .sort({ createdAt: -1 });

    res.json({ success: true, bills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPaidBills = async (req, res) => {
  try {
    const bills = await Bill.find({
      to: req.user._id,
      status: 'completed'
    }).populate('from', 'name email username phoneNumber')
      .populate('to', 'name email username phoneNumber')
    .sort({ createdAt: -1 });

    res.json({ success: true, bills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getMyBills = async (req, res) => {
  try {
    const bills = await Bill.find({ 
      from: req.user._id 
    }).populate('from', 'name email username phoneNumber')
      .populate('to', 'name email username phoneNumber')
    .sort({ createdAt: -1 });

    res.json({ success: true, bills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('from to', 'name email');
    res.json({ success: true, bills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    if (!bill.from.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to delete this bill' });
    }

    await bill.deleteOne();
    res.json({ success: true, message: 'Bill deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    if (!bill.from.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to update this bill' });
    }

    const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, bill: updatedBill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};