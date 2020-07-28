var express = require("express");
var router = express.Router();
var Author = require("../models/author")

router.get("/", async (req,res) => {

    let searchOptions = {}
    if(req.query.name != null && req.query.name != ""){
        searchOptions.name = new RegExp(req.query.name, "i")
    }
    
    try{
        var authors = await Author.find(searchOptions)
        res.render("authors/index", {
            author : authors,
            searchOptions: req.query
        })
    }
    catch{
        res.redirect("/")
    }
    
})

router.get("/new", (req, res) =>{

    res.render("authors/new", {author: new Author()})
})

router.post("/" , async (req, res) =>{
    var author = new Author({
        name: req.body.name
    })
    try {

        var newAuthor = await author.save()
            // res.redirect(`authors/${newAuthor.id}`)
            res.redirect(`authors`)
    } catch {
                res.render("authors/new", {
                author: author,
                errorMessage: "error creating author"
                })

    }
    
})

module.exports = router