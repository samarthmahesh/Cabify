// Simulated database
const usersDB = JSON.parse(localStorage.getItem('usersDB')) || [];

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('userEmail');
const tabBtns = document.querySelectorAll('.tab-btn');

// Tab switching
if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Login functionality
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Find user in database
        const user = usersDB.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store current user in session
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirect to booking page
            window.location.href = 'booking.html';
        } else {
            alert('Invalid email or password');
        }
    });
}

// Signup functionality
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('signupPhone').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Check if user already exists
        if (usersDB.some(u => u.email === email)) {
            alert('User with this email already exists');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            password
        };
        
        // Add to database
        usersDB.push(newUser);
        localStorage.setItem('usersDB', JSON.stringify(usersDB));
        
        // Store current user in session
        sessionStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Redirect to booking page
        window.location.href = 'booking.html';
    });
}

// Check if user is logged in on protected pages
const protectedPages = ['booking.html', 'confirm.html', 'payment.html'];
const currentPage = window.location.pathname.split('/').pop();

if (protectedPages.includes(currentPage)) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'index.html';
    } else if (userEmailSpan) {
        userEmailSpan.textContent = currentUser.email;
    }
}

// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
}

// Display user email on all pages
if (userEmailSpan) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
        userEmailSpan.textContent = currentUser.email;
    }
}