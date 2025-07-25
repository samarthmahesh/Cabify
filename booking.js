// DOM Elements
const bookingForm = document.getElementById('bookingForm');
const proceedToPaymentBtn = document.getElementById('proceedToPayment');

// Initialize Google Maps
function initMap() {
    if (document.getElementById('map')) {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 20.5937, lng: 78.9629 }, // Center of India
            zoom: 5
        });

        const pickupInput = document.getElementById('pickupLocation');
        const dropoffInput = document.getElementById('dropoffLocation');

        const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput);
        const dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput);

        // Add markers for pickup and dropoff locations
        const pickupMarker = new google.maps.Marker({ map });
        const dropoffMarker = new google.maps.Marker({ map, icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' });

        // Update map when places change
        pickupAutocomplete.addListener('place_changed', () => {
            const place = pickupAutocomplete.getPlace();
            if (!place.geometry) return;
            
            pickupMarker.setPosition(place.geometry.location);
            pickupMarker.setVisible(true);
            
            if (dropoffMarker.getVisible()) {
                map.fitBounds(new google.maps.LatLngBounds(
                    place.geometry.location,
                    dropoffMarker.getPosition()
                ));
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(15);
            }
        });

        dropoffAutocomplete.addListener('place_changed', () => {
            const place = dropoffAutocomplete.getPlace();
            if (!place.geometry) return;
            
            dropoffMarker.setPosition(place.geometry.location);
            dropoffMarker.setVisible(true);
            
            if (pickupMarker.getVisible()) {
                map.fitBounds(new google.maps.LatLngBounds(
                    pickupMarker.getPosition(),
                    place.geometry.location
                ));
                
                // Calculate distance (simplified)
                calculateDistance(
                    pickupMarker.getPosition(),
                    dropoffMarker.getPosition()
                );
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(15);
            }
        });
    }
}

// Calculate distance between two points (simplified)
function calculateDistance(origin, destination) {
    // In a real app, you would use the Distance Matrix API
    const distance = Math.round(google.maps.geometry.spherical.computeDistanceBetween(origin, destination) / 1000);
    sessionStorage.setItem('distance', distance);
    return distance;
}

// Handle booking form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const pickup = document.getElementById('pickupLocation').value;
        const dropoff = document.getElementById('dropoffLocation').value;
        const cabType = document.getElementById('cabType').value;
        
        if (!pickup || !dropoff || !cabType) {
            alert('Please fill all fields');
            return;
        }
        
        // Calculate fare based on distance and cab type
        // const distance = sessionStorage.getItem('distance') || 10; // Default to 10km if not calculated
        const distance = parseFloat(sessionStorage.getItem('distance')) || 10; // Default to 10km if not calculated
        const fare = calculateFare(distance, cabType);
        
        // Assign a random driver
        const driver = getRandomDriver();
        
        // Store booking details in session
        sessionStorage.setItem('bookingDetails', JSON.stringify({
            pickup,
            dropoff,
            distance,
            cabType,
            fare,
            driver
        }));
        
        // Redirect to confirmation page
        window.location.href = 'confirm.html';
    });
}

// Calculate fare based on distance and cab type
function calculateFare(distance, cabType) {
    const rates = {
        'mini': 10,
        'sedan': 15,
        'suv': 20,
        'luxury': 30
    };
    
    const baseFare = 50;
    const distanceFare = distance * rates[cabType];
    const totalFare = baseFare + distanceFare;
    
    return totalFare;
}

// Get a random driver (simplified)
function getRandomDriver() {
    const drivers = [
        { name: 'Rajesh Kumar', vehicle: 'MH-01-AB-1234', rating: 4.5 },
        { name: 'Vikram Singh', vehicle: 'DL-02-CD-5678', rating: 4.7 },
        { name: 'Amit Gowda', vehicle: 'KA-03-EF-9012', rating: 4.3 },
        { name: 'Senthil Kumar', vehicle: 'TN-04-GH-3456', rating: 4.8 }
    ];
    
    return drivers[Math.floor(Math.random() * drivers.length)];
}

// Display booking confirmation details
if (document.getElementById('confPickup')) {
    const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
    
    if (bookingDetails) {
        document.getElementById('confPickup').textContent = bookingDetails.pickup;
        document.getElementById('confDropoff').textContent = bookingDetails.dropoff;
        document.getElementById('confDistance').textContent = `${bookingDetails.distance} km`;
        document.getElementById('confCabType').textContent = bookingDetails.cabType.charAt(0).toUpperCase() + bookingDetails.cabType.slice(1);
        document.getElementById('confFare').textContent = `₹${bookingDetails.fare}`;
        document.getElementById('confDriver').textContent = bookingDetails.driver.name;
        document.getElementById('confVehicle').textContent = bookingDetails.driver.vehicle;
    }
}

// Proceed to payment
if (proceedToPaymentBtn) {
    proceedToPaymentBtn.addEventListener('click', () => {
        window.location.href = 'payment.html';
    });
}

// Initialize Google Maps when API is loaded
// if (typeof google !== 'undefined') {
//     initMap();
// } else {
//     window.initMap = initMap;
// }