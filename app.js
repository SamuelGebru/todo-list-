const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

let items = [];

app.set('view engine', 'ejs');

app.get('/', function(req, res) {

  res.sendFile(__dirname + '/index.html') // respond from our server to the client

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);


  // var currentDay = today.getDay();
  // var day = "";
  //
  // switch (currentDay) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //     break;
  //   default: console.log("Error: current day is equal to: " + currentDay);
 // }
  res.render("list", {
    kindOfDay: day, newListItem: items
  });
});

app.post('/', function(req, res) {
  console.log(req.body.toDoList);
  let item = req.body.toDoList;

  items.push(item)

  res.redirect("/")
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
})
