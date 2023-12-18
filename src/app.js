const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

console.log(__dirname)
//define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
console.log(publicDirPath)


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name : 'Batman'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Batman'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Batman',
        message:'Visit this page to get any help from the weather app'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({error:'No address provided!'})
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
            if(error){
                return res.send({error:error})
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if (error){
                    return res.send({error})
                }

                return res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('notfound',{title:'404',name:'Joshua Jayaraj', message:'Help article not found!'})
})

app.get('*',(req,res)=>{
    res.render('notfound',{title:'404',name:'Joshua Jayaraj',message:'Page not found!'})
})


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})