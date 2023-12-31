import { Route , Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { useState } from 'react';
import { createContext } from 'react';
import { ThemeProvider } from '@emotion/react';
import  theme  from './components/Theme';
 

export const dataContext = createContext()

function App() {

  const [data , setData] = useState({
    username: "",
    password : "" ,
});

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <dataContext.Provider value={{data , setData}}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
      </dataContext.Provider>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
