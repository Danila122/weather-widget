"use strict";


class WheatherWidget{
  constructor(){
    this.apiUrl = 'https://api.openweathermap.org/data/2.5/'
    this.apiKey = 'a8e80d16514635295b7916eb45190ac0'
    this.cityID = '625144'
    this.currentDay = new Date().getDate()
    this.forecastButton = null
    this.forecast= null
    }

  printData(data){

    const weatherWidget = document.createElement('div')
    weatherWidget.classList.add('weather-widget')

    const closeButton = document.createElement('a')
    closeButton.href = '#'
    closeButton.classList.add('weather-widget__close')
    closeButton.innerHTML = '&#129146;'

    const weatherInfo = document.createElement('div')
    weatherInfo.classList = 'weather-widget__info info'

    const title = document.createElement('div')
    title.classList.add('info__title')
    title.innerHTML = 'Погода'

    const town = document.createElement('div')
    town.classList.add('info__town')
    town.innerHTML = `${data.name}`

    const temp = document.createElement('div')
    temp.classList.add('info__temp')
    temp.innerHTML = `<span>${data.main.temp} &#176;C</span><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="50" height="50">`

    const description = document.createElement('div')
    description.classList.add('info__description')
    description.innerHTML = `<span>Температура ощущается как <strong>${data.main.feels_like} &#176;С</strong></span> <span>Погоду можно описать как <strong>${data.weather[0].description}</strong></span> <span>Ветер<strong> ${data.wind.speed} м/c</strong></span>`

    const forecastButton = document.createElement('button')
    forecastButton.classList.add('info__forecast-button')
    forecastButton.innerHTML = 'Прогноз на четыре дня'
    this.forecastButton = forecastButton

    const forecast = document.createElement('div')
    forecast.classList.add('info__forecast')
    this.forecast = forecast

    weatherInfo.append(title)
    weatherInfo.append(town)
    weatherInfo.append(temp)
    weatherInfo.append(description)
    weatherInfo.append(forecastButton)
    weatherInfo.append(forecast)


    closeButton.addEventListener('click',()=>{
      weatherWidget.classList.toggle('active')
    })


    forecastButton.addEventListener('click',()=>{
      this.getWeatherForecast()
    })

    weatherWidget.append(closeButton)
    weatherWidget.append(weatherInfo)
    document.querySelector('body').append(weatherWidget)
  }

  printForecast(data){
    this.forecast.innerHTML = ''

    data.list.forEach(data=>{
      let date = data.dt_txt.split(' ') //получение даты
      let dateText = `${date[0].slice(8)}.${date[0].slice(5,7)}` //подготовка даты для отображения на странице 

      if(Number(date[1].slice(0,2))===12 && Number(date[0].slice(8)) !== this.currentDay){ 
        const forecastItem = document.createElement('div')
        forecastItem.classList.add('info__forecast-item')

        const dayWeek = document.createElement('div')
        dayWeek.classList.add('info__dayWeek')
        dayWeek.innerHTML = `Прогноз на ${dateText}`

        const temp = document.createElement('div')
        temp.classList.add('info__temp')
        temp.innerHTML = `<span>${data.main.temp} &#176;C</span><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="50" height="50">`

        forecastItem.append(dayWeek)
        forecastItem.append(temp)
        this.forecast.append(forecastItem)
      }
    })
  }

  getWeatherForecast(){   
    this.forecast.innerHTML= '<img src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif" width="50" height="50">' 
    
    let _this = this
    const apiWeather = this.apiUrl+ '/forecast?id=' + this.cityID + '&units=metric&lang=ru&appid=' +  this.apiKey;
    fetch(apiWeather)
      .then(response => response.json())
      .then(data=>_this.printForecast(data))
      .catch(error=>console.error('ошибка'))
    
  }

  getWeather(){
    let _this = this
    const apiWeather = this.apiUrl+ '/weather?id=' + this.cityID + '&units=metric&lang=ru&appid=' +  this.apiKey;
  
    fetch(apiWeather)
      .then(response => response.json())
      .then(data => _this.printData(data))
      .catch(error => console.error('ошибка'))
  }
}


new WheatherWidget().getWeather()




