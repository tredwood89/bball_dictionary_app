const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express();
const terms = require("./terms")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false}))
app.use(function(req, res, next){
  console.log(`Method: ${req.method}. URL:${req.url} - ${JSON.stringify(req.body)}`);
  next()
})

app.use(express.static("./public"));
app.use(cors())

app.get("/dictionary-api", function(req, res){
  res.json(terms)
})

app.post("/dictionary-api", function(req, res){
  terms.push(req.body);
  res.json(terms)
})

app.delete("/dictionary-api/:term", function(req, res){
  const newTerms = terms.filter( termObj => {
    return termObj.term.toLowerCase() !== req.params.term.toLowerCase()
  })

    res.json(newTerms)
})

app.listen(3000)

console.log("express running on 3000");

module.exports = app
