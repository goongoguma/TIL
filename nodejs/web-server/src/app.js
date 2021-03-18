const path = require('path');
const express = require('express');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');

// public 디렉토리에 있는 html파일 사용
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jae Hyun'
  })
});

app.get('/weather', (req, res) => {
  res.send([{
    location: 'paris',
    weather: 'rain'
  }])
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
});

