const path = require('path')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode.js')
const express = require('express')
const hbs = require('hbs')
const app = express()
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
 
app.use(express.static(publicDirectoryPath))
 

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return  res.send({
            error:'Provide a search term'
        })
    }
        
    console.log(req.query.search)
        res.send({
            products: [],
        })
    
    
})
         
app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help page',
        name:'Abhilaksh Agnihotri'
    })
})
app.get('/about', (req, res) => {
    
    res.render('about', {
        title: 'About Me',
        name:'Abhilaksh Agnihotri'
})

})
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:'Abhilaksh Agnihotri'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address.'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            //console.log(forecastData)
            res.send({
                
                forecast: forecastData,
                location,
                address:req.query.address
           
            })
            
        })

    })


    // res.send({
    //     forecast: "It is snowing!",
    //     location: "Jalandhar",
    //     address:req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhilaksh Agnihotri',
        errorMessage:'Help Article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhilaksh Agnihotri',
        errorMessage:'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000.')
})

