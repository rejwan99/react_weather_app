import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import "./style.css";

function Home() {
    const [data, setData] = useState({
        sunrise: '',
        sunset: '',
        celcius: '',
        name: '',
        humidity: '',
        feels_like: '',
        speed: '',
        image: '/Images/cloude.png'
    })
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const formatTime = (timestamp) => {
      const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleClick = () => {
        if(name !== ""){
        const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c84bebf3b67510165b0c3258fe0793a4&units=metric`;
        axios.get(apiUrl)
        .then(res => {
            let imagePath = "";
            console.log(res.data);

            if(res.data.weather[0].main === "Clouds"){
                imagePath = "Images/cloude.png"
            }else if(res.data.weather[0].main === "Clear"){
                imagePath = "Images/clear.png"
            }else if(res.data.weather[0].main === "Rain"){
                imagePath = "Images/rain.png"
            }else if(res.data.weather[0].main === "Drizzle"){
                imagePath = "Images/drizzling.png"
            }else if(res.data.weather[0].main === "Mist"){
                imagePath = "Images/mist.png"
            }else if(res.data.weather[0].main === "Haze"){
              imagePath = "Images/haze.png"
            }else{
                imagePath = "Images/clear.png"
            }


            setData({...data, 
                sunrise: res.data.sys.sunrise,
                sunset: res.data.sys.sunset, 
                celcius: res.data.main.temp,
                name: res.data.name, 
                humidity: res.data.main.humidity, 
                feels_like: res.data.main.feels_like,
                speed: res.data.wind.speed,
                image: imagePath
            })
            setError('');
        })
        .catch( err => {
            if(err.response.status === 404){
                setError("Invalid City Name")
            }else{
                setError('');
            }
            console.log(err)
        });
        }
    }
  return (
    <div className="container">
      <h1 className="w_heading">Weather App </h1>
      <div className="weather">
        <div className="search">
          <input type="text" placeholder="Enter City Name" onChange={e =>setName(e.target.value)}/>
          <button>
            <img src="/Images/search.png" alt="" onClick={handleClick}/>
          </button>
        </div>
        <div className="error">
            {error}
        </div>
        <div className="winfo">
          <img src={data.image} alt="" className="winfo-img" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2 className="cityname">{data.name}</h2>
          <p className="feels_p">Feels Like: {Math.round(data.feels_like)}°c</p>
          <div className="details">
            <Row>
              <Col>
                <img src="/Images/sunrise.png" alt="" className="sunriseimg"/>
                <div className="sunrise">
                  <p>Sunrise</p>
                  <p>{formatTime(data.sunrise)}</p>
                </div>
              </Col>
              <Col>
                <img src="/Images/sunset.png" alt="" className="sunsetimg"/>
                <div className="sunset">
                  <p>Sunset</p>
                  <p>{formatTime(data.sunset)}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <img src="/Images/humidity.png" alt="" className="humidityimg"/>
                <div className="humidity">
                  <p>Humidity</p>
                  <p>{Math.round(data.humidity)}%</p>
                </div>
              </Col>
              <Col>
                <img src="/Images/wind.png" alt="" className="windimg"/>
                <div className="wind">
                  <p>Wind</p>
                  <p>{Math.round(data.speed)} km/h</p>
                </div>
              </Col>
            </Row>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
