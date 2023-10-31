import { Route , Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { useState } from 'react';
import { createContext } from 'react';




export const dataContext = createContext()

function App() {


  const [data , setData] = useState({
    username: "pantea",
    password : "dev123456789" ,
});

  return (
    <div className="App">
      <dataContext.Provider value={{data , setData}}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
      </dataContext.Provider>
      
    </div>
  );
}

export default App;
