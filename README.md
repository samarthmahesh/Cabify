# 🚄  Cabify - A Modern Cab Booking Web App

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Google Maps API](https://img.shields.io/badge/Google_Maps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)

-Samarth Mahesh and Advaith Rajesh

---

This project is a front-end simulation of a modern ride-hailing app called Cabify. It was built using only vanilla HTML, CSS, and JavaScript to create a complete user experience—from signing up and logging in to booking a ride and making a payment.

The main goal was to build a clean, responsive, and interactive app that uses the Google Maps Platform to handle location-based features, just like a real cab service.

---

### Project File Structure

Here’s how the project files are organized:

<img width="654" height="319" alt="image" src="https://github.com/user-attachments/assets/3f9ba6c8-0998-4f6a-81b1-803191eb2aec" />

---
> **Important Note on API Functionality**
>
> The Google Cloud free trial associated with the original development of this project has expired. As a result, features that rely on the Google Maps Platform (such as map loading, address search, and distance calculation) may not work in a live demo.
>
> To get the full functionality, you will need to run the project locally using your own Google Maps API key.

---
### What The Project Does

*   **Full User Sign-up and Login**: Users can create an account or log in. The app uses the browser's `localStorage` to remember users, so it acts like a simple database.
*   **Interactive Map for Booking**: The core of the booking page is a live map. Users can type in their pickup and drop-off locations, and the app will suggest addresses as they type. It then places markers on the map to show the route.
*   **Dynamic Fare Calculation**: The app automatically calculates the distance between the two points and figures out the fare based on the type of cab selected (Mini, Sedan, SUV, etc.)
*   **Multi-Step Booking Process**: The user goes through a logical flow:
    1.  **Book**: Enter locations and choose a cab.
    2.  **Confirm**: See all the details, including the driver's name, vehicle number, and total fare.
    3.  **Pay**: Choose a payment method and complete the booking.
*   **AI Chatbot Assistant**: A simple chatbot named "Cabby" is included to answer common questions about booking, fares, and payments, making the app more user-friendly.
*   **Responsive Design**: The entire app is built to work well on any screen size, from desktops to mobile phones, using modern CSS with Flexbox and Grid.

---

### Google Maps API Integration

### Google Maps Platform APIs Used

*   **Maps JavaScript API**: The main API that displays the interactive map on your website and lets you place markers for the start and end points of a ride.

*   **Places API**: Provides real-time address suggestions as the user types into the location fields (Autocomplete) and gives your app access to Google's vast database of places.

*   **Geocoding API**: A utility that converts a human-readable street address into precise map coordinates (latitude and longitude), which is necessary to plot locations accurately.

*   **Directions API**: Calculates the optimal route between the pickup and drop-off points, providing the total travel distance and an estimated travel time.

---
### Sample images of our website

<img width="1489" height="724" alt="image" src="https://github.com/user-attachments/assets/13c1713f-0f39-4109-b927-dc806fdc349f" />

<img width="1482" height="672" alt="image" src="https://github.com/user-attachments/assets/9debdb09-b200-4854-9754-3545f3d5c4f2" />

<img width="1509" height="669" alt="image" src="https://github.com/user-attachments/assets/712f0b17-5d43-4b53-bc7f-1f9824c2bbdd" />

<img width="1029" height="630" alt="image" src="https://github.com/user-attachments/assets/9cb21624-5b34-4cf2-9803-0eb241d8c063" />

<img width="1012" height="445" alt="image" src="https://github.com/user-attachments/assets/bcc286b2-2105-47a1-8adf-43ffdc9173db" />

<img width="1029" height="512" alt="image" src="https://github.com/user-attachments/assets/dd3d9a90-3dee-449c-9c30-401e7a400f6f" />

---
### Tech Stack

This project was built from the ground up without any front-end frameworks like React or Angular.

*   **Core**: HTML5, CSS3, and Vanilla JavaScript
*   **APIs**: Google Maps Platform (Places, Maps JavaScript, Geometry)
*   **Storage**: `localStorage` (to simulate a user database) and `sessionStorage` (to pass booking details between pages).

---

### How to Run This Project

To run this project on your own computer, you will need a Google Maps API Key.

1.  **Get an API Key**: You can get one from the [Google Cloud Console](https://cloud.google.com/maps-platform/). Make sure you enable the **Maps JavaScript API** and the **Places API**.

2.  **Clone the Repository**:
    ```
    git clone https://github.com/samarthmahesh/Cabify.git
    cd Cabify
    ```

3.  **Add Your API Key**:
    Open the `booking.html` file. Find this line at the bottom and replace `YOUR_API_KEY` with your actual key:
    ```
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,geometry&callback=initMap" async defer></script>
    ```

4.  **Run the App**:
    Because this is a simple front-end project, you can just open the `index.html` file in a web browser. For the best results, it's a good idea to use a local web server (like the "Live Server" extension in VS Code) to avoid any issues.



