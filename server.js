// Requiring 
const express = require('express')
const mongoose = require('mongoose')

// Exporting the ShortUrl
const ShortUrl = require('./models/shortUrl')
const app = express()

// Connecting to de DataBase MongoDB
mongoose
    .connect('mongodb+srv://obede:19626805@obede.xjrpmkv.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 // listenig to a port after making sure its conected to the DB
.then(()=>{
        console.log("conectamos ao Mongo")
        app.listen(3000)
    })
.catch((err) => console.log(err))

// Using EJS
app.set('view engine', 'ejs')
// Telling the server that we are using Urls
app.use(express.urlencoded({ extended: false}))

// The main route
app.get('/', async (req, res) =>{
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls}) 
})
// The POST route
app.post('/shortUrls', async (req, res) =>{ 
   await ShortUrl.create({ full: req.body.fullUrl })
   res.redirect('/') 
}) 

// The route to GET the shortUrls
app.get('/:shortUrl', async (req, res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})

  if(shortUrl == null) res.sendStatus(404)   

//  redirecting the user
  res.redirect(shortUrl.full)
})
