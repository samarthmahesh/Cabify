document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const closeChatbot = document.querySelector('.close-chatbot');
    const messagesContainer = document.querySelector('.chatbot-messages');
    const inputField = document.getElementById('chatbot-input-field');
    const sendButton = document.getElementById('send-message');
  
    // Initial bot message
    const initialMessages = [
      {
        text: "Hi there! I'm Cabby, your Cabify assistant. How can I help you today?",
        delay: 500
      },
      {
        text: "I can help you book rides, check fares, track your driver, or answer any questions about Cabify.",
        delay: 1500
      }
    ];
  
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
      chatbotContainer.classList.toggle('active');
      
      // Add initial messages when first opened
      if (chatbotContainer.classList.contains('active') && messagesContainer.children.length === 0) {
        showInitialMessages();
      }
    });
  
    closeChatbot.addEventListener('click', function() {
      chatbotContainer.classList.remove('active');
    });
  
    // Send message on button click or Enter key
    sendButton.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  
    function showInitialMessages() {
      initialMessages.forEach((msg, index) => {
        setTimeout(() => {
          addMessage(msg.text, 'bot');
        }, msg.delay);
      });
    }
  
    function sendMessage() {
      const message = inputField.value.trim();
      if (message) {
        addMessage(message, 'user');
        inputField.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot response delay
        setTimeout(() => {
          removeTypingIndicator();
          processUserMessage(message);
        }, 1000 + Math.random() * 2000);
      }
    }
  
    function addMessage(text, sender) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', '${sender}-message');
      messageElement.textContent = text;
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  
    function showTypingIndicator() {
      const typingElement = document.createElement('div');
      typingElement.classList.add('typing-indicator');
      typingElement.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
      `;
      messagesContainer.appendChild(typingElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  
    function removeTypingIndicator() {
      const typingElement = document.querySelector('.typing-indicator');
      if (typingElement) {
        typingElement.remove();
      }
    }
  
    // Process user messages and generate responses
    function processUserMessage(message) {
      const lowerMessage = message.toLowerCase();
      
      // Common questions and responses
      const responses = {
        greeting: ["Hello! 😊", "Hi there!", "Greetings! How can I assist you today?"],
        booking: ["To book a ride, go to our booking page and enter your pickup and dropoff locations.", 
                 "You can book a cab by selecting your locations on the map and choosing a vehicle type."],
        fare: ["Fares depend on distance and vehicle type. Use our fare calculator for estimates.",
               "Our fares start at ₹10/km for Mini cabs. Enter your route to see exact pricing."],
        payment: ["We accept UPI, credit/debit cards, wallets, and cash.", 
                  "You can pay via PhonePe, Google Pay, Paytm or cards at ride completion."],
        cancel: ["You can cancel rides through the app or website before driver arrival with no charge.",
                 "Cancellations after driver assignment may incur a small fee."],
        driver: ["Your driver details appear after booking. You can track them in real-time on the map.",
                 "All our drivers are verified professionals with background checks."],
        default: ["I'm not sure I understand. Could you rephrase that?",
                  "I can help with bookings, fares, payments, and ride tracking. What do you need?",
                  "For account-specific help, please contact our support team at support@cabify.com"]
      };
  
      let response = "";
      
      if (containsAny(lowerMessage, ['hi', 'hello', 'hey'])) {
        response = randomChoice(responses.greeting);
      } 
      else if (containsAny(lowerMessage, ['book', 'ride', 'cab', 'taxi'])) {
        response = randomChoice(responses.booking);
      }
      else if (containsAny(lowerMessage, ['fare', 'price', 'cost', 'how much'])) {
        response = randomChoice(responses.fare);
      }
      else if (containsAny(lowerMessage, ['pay', 'payment', 'upi', 'card'])) {
        response = randomChoice(responses.payment);
      }
      else if (containsAny(lowerMessage, ['cancel', 'refund'])) {
        response = randomChoice(responses.cancel);
      }
      else if (containsAny(lowerMessage, ['driver', 'who is', 'track'])) {
        response = randomChoice(responses.driver);
      }
      else {
        response = randomChoice(responses.default);
      }
  
      addMessage(response, 'bot');
    }
  
    // Helper functions
    function containsAny(str, substrings) {
      return substrings.some(sub => str.includes(sub));
    }
  
    function randomChoice(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
  });