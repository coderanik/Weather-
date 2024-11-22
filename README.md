# AeroSphere

AeroSphere is a web application that provides current weather information and forecasts for any city. It fetches data from the OpenWeather API and displays real-time weather updates, including temperature, humidity, pressure, visibility, wind speed, and more. It also provides a forecast for the upcoming days.

## Features
- **Weather Information**: Displays the current temperature, weather condition, humidity, pressure, visibility, and wind speed.
- **Forecast**: Displays the weather forecast for the upcoming days, with temperatures, feels-like temperatures, and more.
- **City Search**: Users can enter the name of a city to get the weather information.

## Technologies Used
- **Frontend**:
  - HTML
  - CSS (with responsive design for mobile devices)
  - EJS templating engine for dynamic data rendering
  - Google Fonts (Quicksand font)
  
- **Backend**:
  - Node.js
  - Express.js
  - Axios (for making API requests to OpenWeather)
  - Body-Parser (to handle form submissions)

- **API**:
  - OpenWeatherMap API (for weather data and forecasts)

## Installation

### Prerequisites:
- Node.js (v14.x or higher)
- NPM (Node Package Manager)

### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/aerosphere.git

2. Install dependencies:
   ```bash
   cd aerosphere
   npm install

3. Set up your OpenWeather API key:

   - Sign up for an API key at OpenWeatherMap.
   - Replace the API_key value in the server.js file with your own API key:
   ```js
   const API_key = "your-api-key";

4. Run the application:
   ```bash
   npm start
