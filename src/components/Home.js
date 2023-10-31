import React, { useEffect, useState , useMemo } from 'react'
import {  Autocomplete } from "@mui/material";
import { TextField , Box} from "@mui/material";
import Styles from "./Home.module.css"
import Cookies from 'js-cookie';


const Home = () => {
  
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      window.location.href = "/login";
      return;
    }
    Promise.all([
      fetch("http://rezayari.ir:5050/CityAndProvince/GetProvince", {
        headers: {
          Authorization: 'Bearer ' + token}
      }).then(response => response.json()),
      fetch("http://rezayari.ir:5050/CityAndProvince/GetCity" , {
        headers: {
          Authorization: 'Bearer ' + token}
      }).then(response => response.json())
    ])
      .then(([provinceData, cityData]) => {
        setProvinces(provinceData);
        setCities(cityData);
      })
      .catch(error => console.error(error));
  }, []);

  const citiesByProvinceId = useMemo(() => {
    // Create mapping of cities by province ID
    const mapping = {};
    cities.forEach(city => {
      if (!mapping[city.provinceId]) {
        mapping[city.provinceId] = [];
      }
      mapping[city.provinceId].push(city);
    });
    return mapping;
  }, [cities]);

  function handleProvinceChange(event, value) {
    // Update selected province in state
    setSelectedProvince(value);
    // Clear selected city
    setSelectedCity(null);
  }

  function handleCityChange(event, value) {
    // Update selected city in state
    setSelectedCity(value);
  }


 
  return (
    <Box>
        
        <Box className={Styles.container}>
          
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={provinces}
        getOptionLabel={option => option.name}
        value={selectedProvince}
        onChange={handleProvinceChange}
        sx={{ width: 300}}
        renderInput={(params) => <TextField {...params} label="لیست استان ها" />}
        />

        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={citiesByProvinceId[selectedProvince?.id] || []}
        getOptionLabel={option => option.name}
        value={selectedCity}
        onChange={handleCityChange}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="لیست شهرها" />}
        />
        
        </Box>
    </Box>
  )
}

export default Home