const express = require("express");
const app = express();
app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded(
    {extended: true}
));

const https = require("https");

app.listen(process.env.PORT || 3000, function(req, res) {
    console.log("Server started at port 3000...");
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
    const first_name = req.body.fname;
    const last_name = req.body.lname;
    const email = req.body.e_mail;
    // console.log(first_name + last_name + email);

    const data_object = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first_name,
                    LNAME: last_name
                }
            }
        ]
    };

    const json_data = JSON.stringify(data_object);

    const url = "https://us21.api.mailchimp.com/3.0/lists/268187a1df";
    
    const options = {
        method: "POST",
        auth: "abhijit:226a6f8ce9e4d5b233255c2b151e4cb6-us21"
    }
    
    const request = https.request(url, options, function(response) {
        // response.on("data", function(data) {
        //     console.log(JSON.parse(data));
        // });

        console.log(response.statusCode);

        if(response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
    });

    // request.write(json_data);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
})

    
//API key - 226a6f8ce9e4d5b233255c2b151e4cb6-us21
//Audience ID - 268187a1df

