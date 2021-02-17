const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000
// Define path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Yatindra'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title : 'About',
        name : 'Yatindra'
    })
})


app.get('/help', (req, res)=>{
    res.render('help',{
        helpText : 'Some Helpful text',
        title : 'Help',
        name : 'Yatindra'
    })
})

app.get('/product', (req, res)=>{
    if(!req.query.search){
        res.send({
            error : "You must provide search parameter"
        })
    }
    else{
        console.log(req.query.search)
        res.send({
            product: []
        })
    }
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error : "Please provide address parameter"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude,location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error : error
                })
            }
            res.send({
                forecast : forecastdata.forecast,
                status : forecastdata.status,
                location
            })
        })
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title : '404',
        errorMessage : 'Help not found',
        name : 'Yatindra'
    })  
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        errorMessage : 'Page not found',
        name : 'Yatindra'
    })
})
app.listen(port, ()=>{
    console.log('Server is up on port .'+port)
})
