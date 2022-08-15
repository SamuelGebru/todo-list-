const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public')); // specify the location of the public folder

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];

app.set('view engine', 'ejs');

app.get('/', function(req, res) {

  let day = date();

  res.render("list", {
    listTitle: day, newListItems: items
  });
});

app.post('/', function(req, res) {
  console.log(req.body);
  let item = req.body.toDoList;

  if (req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/")
  }
});

app.get('/work', function(req, res) {

  res.render("list", {
    listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req,res) {
  res.render("about");
})


app.listen(3000, function() {
  console.log("Listening on port 3000");
})
