

import { useForm } from "react-hook-form"
import { registerRequest } from "../api/auth";
import { useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

export function Register() {

    const { setIdUser, setIsAuth } = useContext(UserContext)
    const navigate = useNavigate();
    const [registerError, setRegisterErrror] = useState('')

    useEffect(() => {
        if(registerError){
            setTimeout(() => {
                setRegisterErrror('')
            }, 3000)
        }
    }, [registerError])

    const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const datos = {
        email : data.get("email").toLocaleLowerCase(),
        password : data.get("password"),
        nombre : data.get("name")
    }
    if(!datos.email) return setRegisterErrror("Falta ingresar el email");
    if(!datos.nombre) return setRegisterErrror("Falta ingresar el nombre");
    if(!datos.password) return setRegisterErrror("Falta ingresar el password");

    try {
        const rta = await registerRequest(datos);
        console.log(rta);
        if(rta.data.ok) {
            setIdUser(rta.data.userID)
            setIsAuth(true)
            navigate("/")
        }else{
            if (rta.data.message.includes('duplicate')) return setRegisterErrror('Email utilizado anteriormente')
            setRegisterErrror('Error al crear usuario. Intente nuevamente')
        }
    } catch (error) {
        return setRegisterErrror("Error created user!")
    }
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Out
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                type="string"
                id="name"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            {registerError && <p className="text-center text-red-500 font-bold ">{registerError.toLocaleUpperCase()}</p>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Out
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Do you have a account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


// export function Register(){

// const { setIdUser, setIsAuth } = useContext(UserContext)
// const {register, handleSubmit} = useForm()
// const navigate = useNavigate()
// const [registerError, setRegisterErrror] = useState('')

// useEffect(() => {
//     if(registerError){
//         setTimeout(() => {
//             setRegisterErrror('')
//         }, 3000)
//     }
// }, [registerError])
// return (
//         <div className="flex h-4/5 w-3/6 m-auto py-10">
//             <div className="bg-gray-900 w-full h-full flex flex-col gap-5 items-center rounded-3xl p-10">
//                 <h2 className="text-4xl text-green-300 font-semibold">Formulario de Registro</h2>
//                 {registerError && <p className="register-error">{registerError}</p>}
//                 <form className="login-form flex flex-col gap-6 t-5"
//                         onSubmit={handleSubmit(async (values) => {
//                             const valores = {...values, email: values.email.toLowerCase()}
//                             const rta = await registerRequest(valores)
//                             if(rta.data.ok) {
//                                 setIdUser(rta.data.userID)
//                                 navigate("/")
//                                 setIsAuth(true)
//                             }else{
//                                 if (rta.data.message.includes('duplicate')) return setRegisterErrror('Email utilizado anteriormente')
//                                 setRegisterErrror('Error al crear usuario. Intente nuevamente')
//                             }
//                         })}
//                         >
//                         <div className="login-datos flex flex-col gap-3 pt-10">
//                             <input className='text-black p-1 border-2 border-green-400 rounded-2xl'  type="text" placeholder="Nombre" {...register("nombre", {required : true}) }/>
//                             <input className='text-black p-1 border-2 border-green-400 rounded-2xl'  placeholder="Email" type="email "{...register("email", {required : true}) }/>
//                             <input className='text-black p-1 border-2 border-green-400 rounded-2xl'  placeholder="Password" type="password"{...register("password", {required : true}) }/>
//                         </div>
//                         <button className='text-gray-400 border-2 border-green-300 p-1 rounded-2xl cursor-pointer hover:p-2' type="submit">
//                             Registrarse
//                         </button>
//                 </form>             
//                 <p className='text-red-300 text-xl'>¿Ya tienes una cuenta? <Link className='cursor-cover hover:text-red-600' to={'/login'}>Login</Link></p>
//             </div>

//         </div>
// )}
