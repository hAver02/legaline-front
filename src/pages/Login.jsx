
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginReques } from '../api/auth'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'



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


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export function Login() {
    const { setIsAuth, setIdUser} = useContext(UserContext)
    // const { register, handleSubmit } = useForm()
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if(loginError){
            setTimeout(() => {
                setLoginError('')
            }, 3000)
        }
    }, [loginError])

  const handleSubmit =async  (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email").toLocaleLowerCase();
    const password = data.get("password").toLocaleLowerCase();
    const valores = { email, password }
    try {
        const rta = await loginReques(valores)
            if(rta.data.ok){
                setIsAuth(true)
                setIdUser(rta.data.userID)
                navigate('/')
            }else{
                setLoginError(rta.data.message.toUpperCase())
            }
    } catch (error) {
        setLoginError('Error al ingresar a la cuenta')
    }
  }
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
              legaLine-Chat
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            <p className='text-red-400  font-lg font-bold text-center'>
              {loginError}
            </p>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/recovery-pass" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
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


// export function Login () {
    // const { setIsAuth, setIdUser} = useContext(UserContext)
    // const { register, handleSubmit } = useForm()
    // const [loginError, setLoginError] = useState('')
    // const navigate = useNavigate()

//     useEffect(() => {
//         if(loginError){
//             setTimeout(() => {
//                 setLoginError('')
//             }, 3000)
//         }
//     }, [loginError])

//     return (
//         <div className='container-login flex h-4/5 w-3/6 m-auto py-10'>
//         <div className='login bg-gray-900 w-full h-full flex flex-col gap-5 items-center rounded-3xl p-10'>
//             <h1 className='text-5xl text-green-300 font-semibold'>LegalLine-Chat </h1>
//             {loginError && <p className='mensaje-error'>{loginError}</p>} 
            
//             <form className='login-form flex flex-col gap-6 t-5' 
//                 onSubmit={handleSubmit(async (values) => {
//                     const valores = {...values, email : values.email.toLowerCase()}
//                     try {
//                         const rta = await loginReques(valores)
//                         if(rta.data.ok){
//                             setIsAuth(true)
//                             setIdUser(rta.data.userID)
//                             navigate('/')
//                         }else{
//                             setLoginError(rta.data.message.toUpperCase())
//                         }
//                     } catch (error) {
//                         setLoginError('Error al ingresar a la cuenta')
//                     }
//             })}>
//                 <div className='login-datos flex flex-col gap-3 pt-10'>
//                     <input className='text-black p-1 border-2 border-green-400 rounded-2xl' type="text" placeholder='email' {...register('email', { required : true})}/>
//                     <input className='text-black p-1 border-2 border-green-400 rounded-2xl' type="password" placeholder='password' {...register('password', { required : true})}/>
//                 </div>
//                 <button type='submit' className='text-gray-400 border-2 border-green-300 p-1 rounded-2xl cursor-pointer'>
//                     Iniciar sesion
//                 </button>
//             </form>
//             <div className='flex flex-col mt-10 gap-1'>
//                 <p className="text-red-300 text-xl">¿Necesitas crear una cuenta? <Link to={'/register'} className='cursor-cover hover:text-red-600'>Registrarse</Link></p>
//                 <p className='text-red-300 text-xl'>¿Olvidaste tu contraseña? <Link  className='cursor-cover hover:text-red-600' to={'/recovery-pass'}>Recuperar Contraseña</Link></p>
//             </div>
//         </div>
//         </div>
//     )

// }