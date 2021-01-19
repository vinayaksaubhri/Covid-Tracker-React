import React,{useState,useEffect} from 'react';
import { FormControl,MenuItem,Select,Card,CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import './App.css';



function App() {
 
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect( () => {
    const getCountiresData = async () =>{
      const URL=`https://disease.sh/v3/covid-19/countries`;
       await fetch (URL)
       .then((response) =>response.json())
       .then((data) => {

        const countries = data.map((country) => (
          {
            name : country.country,
            value : country.countryInfo.iso2
          }
        ));
        setCountries(countries);
       });
    }    
    getCountiresData();
  },[])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }
  return (
    <div className="app">
      <div className="app__left">
          {/* Header */}
         <div className="app__header">
           {/* Title + Select input dropdown field */}
           <h1>COVID-19 TRACKER</h1>
           <FormControl className="app__dropdown">
           <Select variant="outlined" onChange={onCountryChange} value={country}>
           <MenuItem value="worldwide">Worldwide</MenuItem>
           {/* Loop through all the countries and show a drop down list */}
           {
             countries.map( country => (
               <MenuItem value={country.value}>{country.name}</MenuItem>
             ))
           }
           </Select>
           </FormControl>
      </div>
    
    <div className="app__stats">
       <InfoBox title="Coronavirus Cases" cases="100" total="10000"/>
       <InfoBox title="Recovered" cases="200" total="20000"/>
       <InfoBox title="Death" cases="300" total="30000"/>
    </div>
     {/* Map */}
     <Map/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Caese by country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
             {/* Table */}
             {/* Graph */}
      </Card>
    </div>
  );
}

export default App;
