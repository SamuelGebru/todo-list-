const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

let items = ["Buy food", "Cook food", "Eat food"];

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

  res.render("list", {
    kindOfDay: day, newListItems: items
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
