import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import Alert from "./Alert";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';


export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { login, loginGoogle, loginFacebook } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/home");
    } catch (error) {
      // setError(error.message)
      console.log(error.message);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      await loginGoogle();
      navigate("/home");
    } catch (error) {
      console.log("asd");
    }
  };

  const handleFacebook = async (e) => {
    e.preventDefault();
    try {
      await loginFacebook();
      navigate("/home");
    } catch (error) {
      console.log("Error facebook");
    }
  };

  const styles = {
    container:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#E5E7EB',
      color: '#1F2937'
    },
    login: {
      display: 'flex',
      flexDirection: 'column',
      width: '30%',
      alignItems: 'center',
      border: 'solid 3px lightblue',
      borderRadius: '15px',
      padding:'35px'

    },
    form: {
      width: '100%',
    },
    button: {
      width: '100%',
      margin: '12px'
    },
    input: {
      width: '100%',
      margin: '10px 0 10px 0'
    }
  }

  return (
    <Box style={ styles.container }>
      <Box mr={4}>
        <Typography variant="h3">CHANGAPP</Typography>
        <Typography component="p" mt={4} sx={{
        width: 480
        }
      }>Changa app es una aplicación web que te ayuda a ofrecer y/o contratar servicios. Decile al mundo quién sos y que hacés y presupuestá tu trabajo.
Escalá en el ranking de profesionales y conectá con más clientes.
Como cliente vas a encontrar los profesionales más destacados del mercado.
</Typography>
      </Box>
      <Box style={ styles.login }>
        <Typography variant="h4" sx={{ marginBottom: '30px' }}>
            Login
        </Typography>
        {error && <Alert message={error} />}
        <form style={ styles.form } onSubmit={(e) => handleSumbit(e)}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column'}}>
            <TextField id="outlined-basic" label="Email" variant="outlined"
              style={ styles.input }
              type="email"
              name="email"
              value={user.email}
              onChange={handleOnChange}
            />
            <TextField id="outlined-basic" label="Contraseña" variant="outlined"
              style={ styles.input }
              type="password"
              name="password"
              value={user.password}
              onChange={handleOnChange}
            />
            <Button style={ styles.button } type="submit">Iniciar Sesion</Button>
          </Box>
        </form>
        <Box   sx={{
          display: "flex"

        }
      }>

        <Typography mr={4} variant="h6" >
          Aun no te has registrado? 
        </Typography>
          <Link style={{textDecoration: 'none'}} to="/register">
            <Button variant="contained">Registrar</Button>
          </Link>
        </Box>
        <Button sx={{backgroundColor: '#030303', color:'#E5E7EB',  '&:hover': {
          color: 'primary.main',
          
        }}} variant="outlined" startIcon={<GoogleIcon />} style={ styles.button } onClick={handleGoogle}>Iniciar Sesion con Google</Button>
        <Button sx={{backgroundColor: '#030303'}}variant="outlined"  startIcon={<FacebookIcon />}style={ styles.button } onClick={handleFacebook}>Iniciar Sesion con Facebook</Button>
      </Box>
    </Box>
  );
}