const express = require("express");
const https = require("https");
const port = process.env.PORT;

const app = express();

app.get("/", function (req, res) {

    const url ="https://api.openweathermap.org/data/2.5/weather?q=london&appid=be63a41c120d6e7b57a99f20a9f23289";

    https.get(url, function(response){
    // console.log(response);
    // console.log(response.statusCode);


    response.on("data", function(data){
    // console.log(data); // this shows the data in hex so need to use JSON.parse() to convert it to a JS object
    const weatherdata = JSON.parse(data);
    const temp = weatherdata.main.temp;
    console.log(temp);
    const weatherDescription = weatherdata.weather[0].descripton

    const icon= weatherdata.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
   
    res.write("<p>The weather is currently " + weatherDescription + "</p>");
    res.write("<h1>The temprature in London is " + temp + "degreea Celcius</h1>") // the last send() need to be deleted if this is added
    res.write("<img src=" + imageURL +">");
    res.send();

})
})
    // res.send("server running");
});

app.listen(port, function () {
  console.log("server listening...");
});
