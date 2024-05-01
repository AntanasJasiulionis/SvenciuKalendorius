import express from "express";
import axios from "axios";

const app = express();
const port = 8000;
const Holiday_Api = "https://date.nager.at/api/v3/PublicHolidays"
let result;
let year;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {year, result});
});

app.post("/dates", async (req, res) => {
    year = req.body.year;
    try {
        const response = await axios.get(Holiday_Api+`/${year}/LT`)
        result = response.data;
        res.redirect("/");
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});