function payWithPaystack(amount, userEmail, referenceId) {
  let handler = PaystackPop.setup({
    key: 'pk_test_your_public_key_here', // Replace with your Paystack Public Key
    email: userEmail,
    amount: amount * 100, // Paystack expects the amount in kobo (or the lowest currency unit)
    currency: 'NGN', // Change to your preferred currency (e.g., GHS, USD, KES)
    ref: referenceId || '' + Math.floor((Math.random() * 1000000000) + 1),
    callback: function(response) {
      // This runs after a successful payment
      alert('Payment complete! Reference: ' + response.reference);
      verifyTransactionOnBackend(response.reference);
    },
    onClose: function() {
      alert('Transaction was not completed, window closed.');
    }
  });
  handler.openIframe();
}