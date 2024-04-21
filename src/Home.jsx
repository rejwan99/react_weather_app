import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function Home() {
    const [data, setData] = useState({
        celcius: '',
        name: '',
        humidity: '',
        speed: '',
        image: '/Images/cloude.png'
    })
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    // useEffect(()=> {
    //     const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=c84bebf3b67510165b0c3258fe0793a4&units=metric`;
    //     axios.get(apiUrl)
    //     .then(res => {
    //         setData({...data, 
    //             celcius: res.data.main.temp,
    //             name: res.data.name, 
    //             humidity: res.data.main.humidity, 
    //             speed: res.data.wind.speed})
    //     })
    //     .catch( err => console.log(err))
    // }, [])

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
            }else{
                imagePath = "Images/clear.png"
            }


            setData({...data, 
                celcius: res.data.main.temp,
                name: res.data.name, 
                humidity: res.data.main.humidity, 
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
    <h1>Weather App </h1>
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
          <img src={data.image} alt="" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/Images/humidity.png" alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/Images/wind.png" alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
