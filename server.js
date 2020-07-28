
if(process.env.NODE_ENV !==  "production") {
    require("dotenv").config()
}

var express = require("express");
var app = express();
var expressLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser")

var indexRouter = require("./routes/index")
var authorRouter = require("./routes/authors")

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false}))

var mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology:true })
var db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("connected to mongoose"))


app.use("/", indexRouter);
app.use("/authors", authorRouter);


app.listen(process.env.PORT || 3000)