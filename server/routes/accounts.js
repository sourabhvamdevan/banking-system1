import express from 'express';
import Account from '../models/Account.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.userId });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accounts' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { accountType, currency } = req.body;
    const accountNumber = Math.random().toString().slice(2, 12);

    const account = new Account({
      userId: req.user.userId,
      accountType,
      accountNumber,
      currency,
    });

    await account.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: 'Error creating account' });
  }
});

export default router;