/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, postRequest } from "../redux/actions/index.js";
import { useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

import user from '../../src/user.png'

export default function RequestService(props) {
  const [request, setRequest] = useState({
    day: "",
    hours: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  const service = useSelector((state) => state.serviceDetail);

  console.log(service)
  const handleOnChange = (e) => {
    e.preventDefault();
    setRequest({
      ...request,
      [e.target.name]: e.target.value
    });
  };

  const handleDay = (e) => {
    if(!request.day.includes(e.target.value)){
      setRequest({
        ...request,
        day: [...request.day, e.target.value]
      });
    }
  }

  const handleSubmit = (e) => {
    request.day = request.day.join(",")
    e.preventDefault();
    let requestService = {...request, service:service.id}
    dispatch(postRequest(requestService));
    setRequest({
      day: "",
      hours: ""
    });
    navigate("/home");
  };

  const styles = {
    container:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width:'100vw',
      backgroundColor: '#E5E7EB',
      color: '#1F2937'
    },
    containerRequest:{
      width: '50%'
    },
    containerUser:{
      display:'flex',
      justifyContent: 'space-between',
      alignItems:'center',
      border: 'solid black 2px',
      padding: '20px'
    },
    containerService:{
      display:'flex',
      justifyContent: 'center',
      alignItems:'center',
      border: 'solid black 2px',
      marginTop: '20px',
      padding: '20px'
    },
    containerRequestForm:{
      display:'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      border: 'solid black 2px',
      marginTop: '20px',
      padding: '20px'
    },
    box:{
      display:'flex',
    },
    userPic:{
      width: '50px'
    }
  }

  return (
    <Box style={styles.container}>
      <Box style={styles.containerRequest}>
        <Box style={styles.containerUser}>
          <Typography sx={{textAlign:'center'}} variant="h4">Acá va el usuario</Typography>
          <img style={styles.userPic} src={user} alt="" />
        </Box> 
        <Box style={styles.containerService}>
          <Typography sx={{textAlign:'center'}} variant="h4">{service.name}</Typography>
          <Box style={styles.box}>
            <Typography variant="h7">Description: </Typography>
            <Typography variant="h7">{service.description}</Typography>
          </Box>
          <Box style={styles.box}>
            <Typography variant="h7">{`Price: $${service.price}`} </Typography>
          </Box>
          <Box style={styles.box}>
            <Typography variant="h7">{`Rating: ${service.rating}`} </Typography>
          </Box>
          </Box>
          <Box style={styles.containerRequestForm}>
            <form onSubmit={(e) => handleSubmit(e)}>
            {/* <Box style={styles.box}>
              <TextField
                id="outlined-basic"
                label="día"
                variant="outlined"
                style={styles.input}
                type="text"
                name="day"
                value={request.day}
                onChange={handleOnChange}
              />
            </Box> */}
            {console.log(request)}
            
            {
              service.day?.split(',').map(el => {
                return <Button value={el} onClick={(e)=>handleDay(e)}>{el}</Button>
              })
            }

            <Box style={styles.box}>
              <TextField
                id="outlined-basic"
                label="horario"
                variant="outlined"
                style={styles.input}
                type="text"
                name="hours"
                value={request.hours}
                onChange={handleOnChange}
              />
            </Box>
            
            
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button>
                <Link style={{ textDecoration: "none" }} to="/home">
                  <label style={{ color: "#1F2937" }}>Volver atras</label>
                </Link>
              </Button>
              <Button sx={{ color: "#1F2937" }} type="submit">
                Solicitar
              </Button>
            </Box>
          </form>
          </Box>
      </Box>
    </Box>
  );
}
