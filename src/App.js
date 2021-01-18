import React,{useState,useEffect} from 'react';
import { FormControl,MenuItem,Select } from '@material-ui/core';
import './App.css';

function App() {
 
  const [countries, setCountries] = useState([]);

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
  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value="abc">
          {/* Loop through all the countries and show a drop down list */}
          {
            countries.map( country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
    
     
     {/* Title + Select input dropdown field */}

     {/* info box */}
     {/* info box */}
     {/* info box */}

     {/* Table */}
     {/* Graph */}

     {/* Map */}
    </div>
  );
}

export default App;
