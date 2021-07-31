import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const api = {
  key:'0ea4e6ca66eb9187c847eafed53ee7f9',
  base: 'https://api.openweathermap.org/data/2.5/'
}
function App() {
  const dateBuilder =(d)=>{
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday","monday", "tuesday", "wednesday", "thursday", "Friday", "saturday"]
    let day = days [d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    return `${day} ${date} ${month} ${year} `

  }
  const [query, setQuery] = useState('');
  const [weather , setWeather] = useState ({})
  const search = evt => {
    if(evt.key==='Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=> {
        setWeather(result)
        setQuery("")
        console.log(result)
        })
    }
  }

  return (
    <div className={(typeof weather.main != "undefined")? ((weather.main.temp> 10)?"app__warm":'app'):"app"}>
      <main>
        <div className="search">
          <input type='text'
           placeholder="Search ..." 
           className='search__bar'
           onChange= {e => setQuery(e.target.value)}
           value = {query }
           onKeyPress ={ search}
           />
        </div>
        {
         (typeof weather.main != "undefined")? (
           <div>
              <div className='location__box'>
          <div className="location">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="date"> 
            {dateBuilder(new Date())}
          </div>

        </div>
        <div className="weather__box">
          <div className="temp"> {Math.round(weather.main.temp)}°c </div>
          <div className="weather"> {weather.weather[0].main} </div>
        </div>
           </div>
         ):('')
        }
        
      </main>
    </div>
  );
}

export default App;
