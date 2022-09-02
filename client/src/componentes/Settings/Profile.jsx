import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserEmail } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "../css/profile.css";
//IMPORT DE MATERIAL UI
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import { useAuth } from "../../context/authContext";
import { Avatar, Box } from "@mui/material";

import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Profile() {
  const { user } = useAuth();
  const estado = useSelector((state) => state.filter);
  const navigate = useNavigate();


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserEmail(user?.email));

  }, [dispatch, user?.email]);



    return (
      <Box sx={{ width: "70%" }}>
        {user?.email === null ? (
          <Box sx={{ display: "flex" }}>
            No tienes acceso a estos datos ya que ingresaste como un usuario
            anonimo. Ve a la seccion de registrar para poder utilizar estos
            servicios.
            <Link to="/register">Registrarse</Link>
          </Box>
        ) : estado?.length === 1 ? (
         
          <Box
            variant="section"
            sx={{ display:'flex', padding:'10%' }}
          >
              <Box sx={{width:'60%', display:'flex', flexDirection:'column'}}>
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={estado[0].img}
                  alt="Profile photo"
                />
                <Box sx={{display:'flex', justifyContent:'center', padding:'4%'}}>
                  <LocationOnIcon sx={{fontSize:'1.8rem'}}/>
                  <Typography variant="h6">
                    {estado[0].location}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{display:'flex', flexDirection:'column'}}>
              <Box
                sx={{ display: "flex", gap: "20px", padding:'5px 20px', borderBottom:'solid black 1px' }}
                variant="div"
              >
                <Typography variant="h4">
                  {
                  estado[0].firstName[0].toUpperCase().concat(estado[0].firstName.slice(1))
                  }
                </Typography>
                <Typography variant="h4">
                  {
                  estado[0].lastName[0].toUpperCase().concat(estado[0].lastName.slice(1))
                  }</Typography>
              </Box>
              <Typography sx={{padding:'4%'}} variant="h6">{estado[0].description}</Typography>

              </Box>
             
            </Box>
        ) : (
          navigate("/settings/edit")
        )}
      </Box>
    );
  

}
