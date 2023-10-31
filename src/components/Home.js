import React, { useEffect, useState } from 'react'
import {  Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import Styles from "./Home.module.css"



const Home = () => {
  
  const [province , setProvince] = useState([])
  const [city , setCity] = useState([])

  

  const getProvince = async () => {
    fetch("http://rezayari.ir:5050/CityAndProvince/GetProvince", {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTg3MzgyODcsImlzcyI6InJlemF5YXJpLmlyIiwiYXVkIjoicmV6YXlhcmkuaXIifQ.NGrtQZ4vako1lZlAbbU2yjlX9q-mHfe1C6yCyTghYB8'}
    })
     .then(response => response.json())
     .then(json => setProvince(json)) 
  }

  const getCity = async () => {
    fetch("http://rezayari.ir:5050/CityAndProvince/GetCity", {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTg3MzgyODcsImlzcyI6InJlemF5YXJpLmlyIiwiYXVkIjoicmV6YXlhcmkuaXIifQ.NGrtQZ4vako1lZlAbbU2yjlX9q-mHfe1C6yCyTghYB8'}
    })
     .then(response => response.json())
     .then(json => setCity(json)) 
  }

  useEffect(() => {
    getProvince()
    getCity()
  },[])

  
    
  return (
    <div>
        
        <div className={Styles.container}>
          
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={province.map(item => item.name)}
        sx={{ width: 300}}
        renderInput={(params) => <TextField {...params} label="استان" />}
        />

        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={city.map(item => item.name)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="شهر" />}
        />
        
        </div>
    </div>
  )
}

export default Home