const path = require('path')
const express = require('express')
const hbs=require('hbs')
const https= require('https')


const port=process.env.PORT || 3000
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath= path.join(__dirname,'../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    const address=req.query.address
    if(!req.query.address){
        return res.send({
            error:'You have not provided any address',
        })
    }
  

        var url="https://api.openweathermap.org/data/2.5/weather?q="+ address +"&appid=f8b38007cd9048407505063a677e44c6&units=metric";
      
        https.get(url,(response)=>{
      
            console.log(response.statusCode);
      
            response.on("data",(data)=>{
      
            const weatherData= JSON.parse(data); //JSON.stringify(data)
            console.log(weatherData)
            // const temp = weatherData.main.temp;
            // const weatherDiscription = weatherData.weather[0].description;
            // const feelLike = weatherData.main.feels_like;
            // const imgUrl="http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png"
            
            // const forecast={
            //     forecast:weatherData
            //     // weatherDiscription:weatherDiscription,
            //     // imgUrl:imgUrl,
            //     // feelLike:feelLike,
            //     // location:address,
            //     // temp:temp
            // }
            
            res.send( weatherData)
          })
          // console.log(JSON.parse(response))
      
      
        })
    
})

app.get('/contact',(req,res)=>{

    res.render('contact',{

    })

})




app.get('/help/*',(req,res)=>{
    res.render('Error404',{
        title:'Page not Found',
        description: ' Resquested page is not found'
    })
})


app.get('*',(req,res)=>{
    res.render('Error404',{
        title: 'Error 404 -- Page Not Found',
        description: 'The page that you have requested is not found',
    })
})

app.listen(PORT, () => {
    console.log('Server is up on port'+PORT+'.')
})

 