import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Bill sender is required']
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Bill recipient is required']
    },
    amount: {
        type: Number,
        required: [true, 'Bill amount is required'],
        min: 0
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'completed'],
      default: 'pending'
    },
    completed: {
        type: Boolean,
        default: false
    },
},{timestamps: true});
const Bill = mongoose.model('Bill',billSchema);
export default Bill;