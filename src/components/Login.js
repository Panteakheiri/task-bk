import React from 'react'
import { useState , useEffect } from 'react';
import {  Button, TextField } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validate from './validate';
import { postData } from './HttpRequest';
import Styles from "./Login.module.css"
import { useContext } from 'react';
import {dataContext} from "../App"
const Login = () => {

    const {data , setData} = useContext(dataContext)
    
    
    const notify = (text , type) => {
        if(type === "success") {
            toast.success(text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        } else {
            toast.error(text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        };
    
    

    const changeHandler = event => {
            setData({...data,[event.target.name] : event.target.value} )
    }

    const [errors , setErrors] = useState({})
    const [touched , setTouched] = useState({})

    const focusHandler = (event) => {
        setTouched({...touched , [event.target.name]: true})
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        if(!Object.keys(errors).length) {
            notify("you loged in successfully" , "success")
        } else {
            notify("invalid data!" , "error")
            setTouched({
                username:  true,
                password :  true ,
            })
        }
        const response = await postData("auth/login" , data)
            document.cookie = `token = ${response.token} , max-age =${24 * 60 * 60} ; path=Auth/Login`
            window.location.assign("/")
    }

    useEffect(() => {
        setErrors(validate(data))
        console.log(errors)
    } , [data])


  return (
    
    <div className={Styles.container}>
        <form className={Styles.form} onSubmit={submitHandler}>
            <div>
            <TextField dir='rtl'
            name='username' label="نام کاربری" variant="outlined" value={data.username} onChange={changeHandler} onFocus={focusHandler}/>
            {errors.username && touched.username && <span>{errors.username}</span>}
            </div>
            <br />
            <div>
            <TextField dir='rtl'
             name='password' label="رمز عبور" variant="outlined" value={data.password} onChange={changeHandler} onFocus={focusHandler}/>
             {errors.password && touched.password && <span>{errors.password}</span>}
            </div>
            <br />
            <Button sx={{width : 220 , height : 50}} type='submit' variant="contained">ورود</Button>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Login