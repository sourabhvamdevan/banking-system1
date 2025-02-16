import express from 'express';
import Transaction from '../models/Transaction.js';
import Account from '../models/Account.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { accountId, amount, description, transactionType, recipientAccountId } = req.body;

    const account = await Account.findOne({
      _id: accountId,
      userId: req.user.userId,
    });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (transactionType !== 'DEPOSIT' && account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    const transaction = new Transaction({
      accountId,
      amount,
      description,
      transactionType,
      recipientAccountId,
    });

    await transaction.save();

    if (transactionType === 'WITHDRAWAL' || transactionType === 'TRANSFER') {
      account.balance -= amount;
      await account.save();
    }

    if (transactionType === 'DEPOSIT') {
      account.balance += amount;
      await account.save();
    }

    if (transactionType === 'TRANSFER' && recipientAccountId) {
      const recipientAccount = await Account.findById(recipientAccountId);
      if (recipientAccount) {
        recipientAccount.balance += amount;
        await recipientAccount.save();
      }
    }

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error processing transaction' });
  }
});

export default router;