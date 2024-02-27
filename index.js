import express from "express";
import axios from "axios";
import bodyParser from "body-parser";





const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/any");
        const result = response.data;
        res.render("home.ejs", { data: result });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("home.ejs", {
            error: "Failed to fetch jokes. Please try again later."
        });
    }
});



app.post('/', async (req, res) => {
    console.log(req.body);
    const categoryReq = req.body.category;
    console.log(categoryReq);
    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/${categoryReq}`);
        const result = response.data;
        console.log(result);
        res.render("home.ejs", { data: result });
    } catch (error) {
        console.error("Error fetching joke:", error);
        // Handle error appropriately, e.g., send an error response
        res.status(500).send("Error fetching joke");
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
