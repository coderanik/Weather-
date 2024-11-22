import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_key = "68ecdccb80f5987ade3617f6645c0214";
const API_link_location = "http://api.openweathermap.org/geo/1.0/direct";
const API_link_weather = "https://api.openweathermap.org/data/2.5/weather";
const API_link_forecast = "https://api.openweathermap.org/data/2.5/forecast";

// Middleware setup
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Render the homepage
app.get("/", (req, res) => {
  res.render("index.ejs", {
    location: "Enter the City Name",
    temp: "",
    condition: "",
    maxTemp: "",
    minTemp: "",
    pressure: "",
    humidity: "",
    visibility: "",
    windspeed: "",
    forecastData: [], // Pass an empty array by default
  });
});

// Handle search requests
app.post("/search", async (req, res) => {
  const { placedetails: place } = req.body;
  if (!place) {
    return res.render("index.ejs", {
      location: "Please provide your location ?",
      temp: "",
      condition: "",
      forecastData: [], // Pass an empty array in case of no input
    });
  }

  try {
    // Fetch location data
    const locationResponse = await axios.get(API_link_location, {
      params: {
        q: place,
        appid: API_key,
      },
    });
    const locationData = locationResponse.data;
    const latitude = locationData[0].lat;
    const longitude = locationData[0].lon;
    const locationName = locationData[0].name;

    // Fetch weather data
    const weatherResponse = await axios.get(API_link_weather, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_key,
        units: "metric", // Display temperature in Celsius
      },
    });
    const weatherData = weatherResponse.data;

    const temp = weatherData.main.temp;
    const condition = weatherData.weather[0].main;
    const maxTemp = weatherData.main.temp_max;
    const minTemp = weatherData.main.temp_min;
    const pressure = weatherData.main.pressure;
    const humidity = weatherData.main.humidity;
    const visibility = weatherData.visibility;
    const windspeed = weatherData.wind.speed;

    // Fetch forecast data
    const forecastResponse = await axios.get(API_link_forecast, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_key,
        units: "metric",
      },
    });

    const forecastList = forecastResponse.data.list;
    const organizedForecast = {};

    // Organize data by date
    forecastList.forEach((item) => {

      const [date, time] = item.dt_txt.split(" ");
      const formattedDate = date.split("-").reverse().join("-"); // Convert yyyy-mm-dd to dd/mm/yyyy
      const formattedTime = time.slice(0, 5) + " hrs"; // Extract HH:MM and append "hrs"

      if (!organizedForecast[formattedDate]) {
        organizedForecast[formattedDate] = [];
      }
      organizedForecast[formattedDate].push({
        time: formattedTime,
        temp: item.main.temp,
        feels_like: item.main.feels_like,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
      });
    });

    // Render the template with organized data
    res.render("index.ejs", {
      location: locationName,
      temp: `${temp}°C`,
      condition,
      maxTemp: `${maxTemp}°C`,
      minTemp: `${minTemp}°C`,
      pressure: `${pressure}`,
      humidity: `${humidity}`,
      visibility: `${visibility}`,
      windspeed: `${windspeed}`,
      forecastData: organizedForecast, // Pass structured data to EJS
    });
  } catch (error) {
    console.error(error.message);
    res.render("index.ejs", {
      location: "Error: Could not fetch weather data",
      temp: "",
      condition: "",
      maxTemp: "",
      minTemp: "",
      forecastData: [],
    });
  }
});

// Setting up the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
