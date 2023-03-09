const express = require('express');
const request = require('request');
const app = express();

// set view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/weather', (req, res) => {
    const location = req.body.location;
    const apiKey = 'b9660c03f23641639eb183258230903'; 
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  
    request(url, (error, response, body) => {
      if (error) {
        res.render('index', { weather: null, error: 'Error, please try again' });
      } else {
        const weatherData = JSON.parse(body);
        if (weatherData.main == undefined) {
          res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
          const weather = {
            city: weatherData.name,
            temperature: Math.round(weatherData.main.temp - 273.15),
            description: weatherData.weather[0].description,
            icon: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
          };
          res.render('index', { weather: weather, error: null });
        }
      }
    });
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  