// DOM Elements
const paymentForm = document.getElementById('paymentForm');
const paymentMethods = document.getElementsByName('paymentMethod');
const paymentDetails = document.querySelectorAll('.payment-details');

// Update payment details based on selected method
if (paymentMethods.length > 0) {
    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            // Hide all payment details
            paymentDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            
            // Show selected payment details
            const selectedDetails = document.getElementById(`${method.value}Details`);
            if (selectedDetails) {
                selectedDetails.style.display = 'block';
            }
        });
    });
}

// Display fare summary
if (document.getElementById('distanceFare')) {
    const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
    
    if (bookingDetails) {
        const baseFare = 50;
        const distanceFare = bookingDetails.fare - baseFare;
        
        document.getElementById('baseFare').textContent = `₹${baseFare}`;
        document.getElementById('distanceFare').textContent = `₹${distanceFare}`;
        document.getElementById('totalFare').textContent = `₹${bookingDetails.fare}`;
    }
}

// Handle payment form submission
if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        let isValid = true;
        
        // Validate payment details based on method
        if (paymentMethod === 'creditCard') {
            const cardNumber = document.getElementById('cardNumber').value;
            const cardName = document.getElementById('cardName').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            
            if (!cardNumber || !cardName || !expiryDate || !cvv) {
                isValid = false;
                alert('Please fill all credit card details');
            }
        } else if (paymentMethod === 'upi') {
            const upiId = document.getElementById('upiId').value;
            
            if (!upiId) {
                isValid = false;
                alert('Please enter your UPI ID');
            }
        }
        
        if (isValid) {
            // In a real app, you would process the payment here
            alert('Payment successful! Your cab is on the way.');
            
            // Clear session storage
            sessionStorage.removeItem('bookingDetails');
            
            // Redirect to home page
            window.location.href = 'booking.html';
        }
    });
}