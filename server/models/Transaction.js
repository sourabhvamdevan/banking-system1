import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: String,
  recipientAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'COMPLETED',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Transaction', transactionSchema);