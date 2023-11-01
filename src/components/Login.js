import React from 'react'
import { useState , useEffect } from 'react';
import {  Box, Button, TextField } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validate from './validate';
import { postData } from './HttpRequest';
import Styles from "./Login.module.css"
import { useContext } from 'react';
import {dataContext} from "../App"
import Cookies from 'js-cookie';
const Login = () => {


    const {data , setData} = useContext(dataContext)
    
    // for login notifications 

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
        if(Object.keys(errors).length) {
            notify("نام کاربری و یا گذرواژه نا معتبر" , "error")
            setTouched({
                username:  true,
                password :  true ,
            })
        }
        const response = await postData("auth/login" , data)
        console.log("response is : " , response.token)
            if (response.token === undefined) {
                notify("نام کاربری و یا گذرواژه نا معتبر" , "error")
                setTouched({
                    username:  true,
                    password :  true ,
                })
                return
            }
            notify("با موفقیت وارد شدید" , "success")
            await new Promise(r => setTimeout(r, 2000));
            Cookies.set('token' , response.token,{expires :1})
            window.location.assign("/")
    }

    useEffect(() => {
        setErrors(validate(data))
        console.log(errors)
    } , [data])


  return (
    
    <Box className={Styles.container} >
        <form className={Styles.form} onSubmit={submitHandler}>
            <div>
            <TextField sx={{fontFamily : 'iranSans' , width : 300}} 
            error={!!touched.username && !!errors.username}
            helperText={touched.username && errors.usename}
            name='username' label="نام کاربری" variant="outlined"
            value={data.username} onChange={changeHandler} onFocus={focusHandler}/>
            </div>

            <div>
            <TextField sx={{fontFamily : "iranSans" , width : 300}} type='password'
            error={!!touched.password && !!errors.password}
            helperText={touched.password && errors.password}
            name='password' label="رمز عبور" variant="outlined"
            value={data.password} onChange={changeHandler} onFocus={focusHandler}/>
            </div>

            <Button sx={{width : 300 , height : 50 , fontFamily : "iranSans" , fontSize : 20}} type='submit' variant="contained">ورود</Button>
        </form>
        <ToastContainer />
    </Box>
  )
}

export default Login