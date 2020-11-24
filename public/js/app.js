

console.log('Client side javascript file is loaded!')


const locationForm=document.querySelector('form')
const locationData=document.querySelectorAll('input')[0].value


locationForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const locationData=document.querySelectorAll('input')[0].value;
    console.log(locationData);
    const day=document.querySelectorAll('.day')[0]
    const date=document.querySelectorAll('.date')[0]
    const location=document.querySelectorAll('.location')[0]
    const ImgUrl=document.querySelectorAll('.locationforecast-icon img')[0] //pending
    const Tempurature=document.querySelectorAll('.num')[0]
    const windSpeed=document.querySelectorAll('.wind')[0]
    const windDirection=document.querySelectorAll('.direction')[0]
    const humidity=document.querySelectorAll('.umbrella')[0]

    var d= new Date()
    var weekDay=['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday']
    var Month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const nday=weekDay[d.getDay()]
    const ndate=d.getDate()
    const nmonth=Month[d.getMonth()]


    fetch('/weather?address='+locationData).then((response)=>{
   response.json().then((data)=>{
       console.log(data.main.temp)
       day.textContent=nday
       date.textContent=ndate+' '+nmonth
       location.textContent=data.name
       Tempurature.innerHTML=data.main.temp+'<sup>o</sup>C'
       windSpeed.innerHTML='<img  src="images/icon-wind.png" alt="no image found"></img>'+data.wind.speed+'Km/h'
       windDirection.innerHTML='<img  src="images/icon-compass.png" alt="no image found">'+data.wind.deg+'<sup>o</sup>'
       humidity.innerHTML='<img src="images/icon-umberella.png" alt="no image found">'+data.main.humidity
   })
})
})