const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Mock database (Replace with your actual MongoDB, PostgreSQL, or SQL setup)
let dashboardData = {
  totalRevenue: 150000,
  pendingBalance: 12000,
  totalTransactions: 45
};

// 1. Endpoint to fetch current metrics for your dashboard
app.get('/api/dashboard/metrics', (req, res) => {
  try {
    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard figures' });
  }
});

// 2. Endpoint to verify Paystack Payment and update figures
app.post('/api/verify-paystack', async (req, res) => {
  const { reference } = req.body;

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    });

    const tx = response.data.data;

    if (tx.status === 'success') {
      // Amount paid comes in kobo/cents, divide by 100 to get standard currency value
      const amountPaid = tx.amount / 100;

      // Update your live figures securely on the backend
      dashboardData.totalRevenue += amountPaid;
      dashboardData.totalTransactions += 1;

      return res.status(200).json({ 
        status: 'success', 
        message: 'Payment verified & metrics updated',
        newMetrics: dashboardData 
      });
    } else {
      return res.status(400).json({ status: 'failed', message: 'Transaction was not successful' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));