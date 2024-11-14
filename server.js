import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://api.weatherapi.com/v1/current.json";
const apiToken = "d64111698a2a4b39a5f191157241211";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/" ,(req,res) =>{
    res.render("index.ejs" , { content : ""});
});

app.post("/search", async (req, res) => {
    const place = req.body.location;
    try {
      const result = await axios.get(API_URL,{
        params:{
            key: apiToken,
            q: place,
            aqi:"yes"
        }
      });
      res.render("index.ejs", { 
        content: JSON.stringify(result.data.location.name) , 
        temperature : JSON.stringify(result.data.current.temp_c)});
    } catch (error) {
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
  });
// Setting up the server 
app.listen(port , () => {
    console.log(`Server is running on ${port}`);
})