import React,{useState,useEffect} from 'react';
import { FormControl,MenuItem,Select,Card,CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table'
import {sortData} from './Util';
import './App.css';
import LineGraph  from "./LineGraph";


function App() {
 
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo]= useState([]);
  const [tableData,setTableData]= useState([]);

  useEffect(() => {
    const url=`https://disease.sh/v3/covid-19/all`;
    fetch(url).then(response => response.json()).then( data => {
      setCountryInfo(data);
    } );
  })

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
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
       });
    }    
    getCountiresData();
  },[]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);


    const url = countryCode === 'worldwide'
     ? `https://disease.sh/v3/covid-19/all`
     : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
       
     await fetch(url).then((response) => response.json()).then(data => {
       setCountry(countryCode);
       setCountryInfo(data);
     });
     
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
       <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
       <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
       <InfoBox title="Death" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
    </div>
     {/* Map */}
     <Map/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Caese by country</h3>
           {/* Table */}
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
             {/* Graph */}
      </Card>
    </div>
  );
}

export default App;
