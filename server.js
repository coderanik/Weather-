import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app =express();
const port = 3000;
const API_key = "68ecdccb80f5987ade3617f6645c0214"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",(req,res) =>{
    res.render("index.ejs",{
        location : "Enter the City Name",
        currentTemp : "",



    })
})

app.post("/search" , async (req,res) =>{

})



// import express, { query } from "express";
// import axios from "axios";
// import bodyParser from "body-parser";

// const app = express();
// const port = 3000;
// const API_URL1 = "http://api.weatherapi.com/v1/current.json";// for forecast weather
// const API_URL2 = "https://api.weatherstack.com/current" // for current weather 
// const apiToken1 = "d64111698a2a4b39a5f191157241211";
// const apiToken2 = "9243dedc2ae6c3bd0cd4980f2eb78553"

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));

// // Route to serve the home page
// app.get("/", (req, res) => {
//     res.render("index.ejs", { 
//         currenttemp: "", 
//         location: "Enter the location ", 
//         content: "" ,
//         date : "" ,
//         currenttime : ""
//     });
// });

// // Route to handle form submission and fetch weather data
// app.post("/search", async (req, res) => {
//     const { placedetails: place } = req.body; // Extract 'place' from the form submission
//     if (!place) {
//         return res.render("index.ejs", { 
//             currenttemp: "", 
//             location: "", 
//             content: "Please enter a city to search for weather information.",
//             date :"" ,
//             currenttime :"",
//         });
//     }

//     try {
//         const result1= await axios.get(API_URL, {
//             params: {
//                 key: apiToken1,
//                 q: place,
//                 aqi: "yes",
//             },
//         });

//         const result2 = await axios.get(API_URL2 , {
//             params:{
//                 access_key : apiToken2,
//                 query : place,
//             }
//         })

//         const locationName = result.data.location.name;
//         const localdate = result.data.location.localtime;
//         const temperature = result.data.current.temp_c;
//         const content = result.data.current.condition.text;
//         const currenttime = result.data.current.last_updated

//         res.render("index.ejs", { 
//             location: locationName, 
//             currenttemp: temperature, 
//             date : localdate,
//             content: content,
//             currenttime : currenttime,
//         });
//     } catch (error) {
//         const errorMessage = error.response?.data?.error?.message || "Unable to fetch weather data.";
//         res.render("index.ejs", { 
//             currenttemp: "", 
//             location: "", 
//             date : "",
//             content: `Error: ${errorMessage}` ,
//             currenttime : "",
//         });
//     }
// });

// // Setting up the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
