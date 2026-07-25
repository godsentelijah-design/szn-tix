// Fetch and render live data on dashboard load
async function loadDashboardMetrics() {
  try {
    const response = await fetch('http://localhost:5000/api/dashboard/metrics');
    const data = await response.json();

    // Update your dashboard DOM elements
    document.getElementById('total-revenue').innerText = `₦${data.totalRevenue.toLocaleString()}`;
    document.getElementById('pending-balance').innerText = `₦${data.pendingBalance.toLocaleString()}`;
    document.getElementById('total-transactions').innerText = data.totalTransactions;
  } catch (error) {
    console.error('Error loading dashboard figures:', error);
  }
}

// Trigger Paystack Popup Checkout
function triggerPaystackPayment(amount, userEmail) {
  let handler = PaystackPop.setup({
    key: 'pk_test_your_actual_public_key_here', // Replace with your Public Key
    email: userEmail,
    amount: amount * 100, // Convert to kobo/lowest currency unit
    currency: 'NGN',
    callback: function(response) {
      // Send reference to backend for verification and metric update
      verifyTransaction(response.reference);
    },
    onClose: function() {
      alert('Payment window closed.');
    }
  });
  handler.openIframe();
}

// Send the reference back to your Node.js backend
async function verifyTransaction(reference) {
  try {
    const response = await fetch('http://localhost:5000/api/verify-paystack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference })
    });
    
    const result = await response.json();
    if (result.status === 'success') {
      alert('Payment successful! Dashboard updated.');
      loadDashboardMetrics(); // Refresh figures instantly
    }
  } catch (error) {
    console.error('Verification failed:', error);
  }
}

// Automatically load figures when the dashboard opens
window.onload = loadDashboardMetrics;