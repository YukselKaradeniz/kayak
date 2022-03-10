const express = require("express");
const app = express();

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//starting server
const PORT = 5000 ;
const server = app.listen(PORT, () => console.log("server is running on:",PORT));


//pull data from url
var request = require("request");
let url = "https://www.kayak.com/h/mobileapis/directory/airlines/homework?jsonp=processData";
let airlineData = [];

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        eval(body);
    }
})

const processData = data => {
    console.log(`processing data: found ${data.length} entries.`);
    airlineData = data;
}

app.post('/getdatas', async(req, res) => {
    if(airlineData && airlineData != null)
        res
            .status(200)
            .json({
            success: true,
            airlineData: airlineData
        });
    else
        res
        .status(201)
        .json({
        success: false
        });

})