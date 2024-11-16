import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://api.weatherapi.com/v1/current.json";
const apiToken = "d64111698a2a4b39a5f191157241211";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve the home page
app.get("/", (req, res) => {
    res.render("index.ejs", { 
        currenttemp: "", 
        location: "", 
        content: "" 
    });
});

// Route to handle form submission and fetch weather data
app.post("/search", async (req, res) => {
    const { placedetails: place } = req.body; // Extract 'place' from the form submission
    if (!place) {
        return res.render("index.ejs", { 
            currenttemp: "", 
            location: "", 
            content: "Please enter a city to search for weather information." 
        });
    }

    try {
        const result = await axios.get(API_URL, {
            params: {
                key: apiToken,
                q: place,
                aqi: "yes",
            },
        });

        const locationName = result.data.location.name;
        const temperature = result.data.current.temp_c;
        const content = result.data.current.condition.text;

        res.render("index.ejs", { 
            location: locationName, 
            currenttemp: temperature, 
            content: content,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.error?.message || "Unable to fetch weather data.";
        res.render("index.ejs", { 
            currenttemp: "", 
            location: "", 
            content: `Error: ${errorMessage}` 
        });
    }
});

// Setting up the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
