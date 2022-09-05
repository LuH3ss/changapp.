import React, { useEffect } from "react";
import Navbar from "../../PrivateRoute/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../../redux/actions";
import { NavLink, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormCategory from "./FormCategory";
import "../../css/filter-services.css"
import '../../css/empty.css'
import "../../css/card-services.css"
import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
export default function FilterCategory() {
  const services = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const param = useParams();
  const filterUsers = services.filter((e) => e.category?.name === param.name);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  

  return (
    <div className="service-container-full">
      <Navbar />
      
      <FormCategory />
      <div className="container-services">
      
      <Typography variant="h4">{param.name}</Typography>
      {filterUsers.length === 0 ? (
        <Box className="asdasd" sx={{textAlign: 'center', display: 'flex', flexDirection:'column', alignItems: 'center', maxWidth:'80%', position: 'relative', margin: '40px auto'  }} >
            <Box>
                <Typography variant="h5" mb={5}>  
                    No se encuentra ningun servicio para esta categoria{" "}
                    <NavLink className='linkk' to="/home/createService">Se el primero en postularte!</NavLink>
                </Typography>
                <Avatar sx={{ width: 182, height: 182, boxShadow:' rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px', position: 'relative', margin: '0 auto' }}>
            { 
              <img src='https://images.unsplash.com/photo-1505939675702-ea0ad504df86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt="?" width="182px" height="182px" />
            }
          </Avatar>

            </Box>
        </Box>
      ) : (
        filterUsers?.map((e) => {
          return (
            <div className="cards-services"
              key={e.id}
            >
              <img src={e.user?.img} alt="No tiene" width='64px' height="64px"/>
              <h3>Servicio: {e.name}</h3>
              <h4>{e.user?.firstName}</h4>
              <p>{e.description}</p>
              <p>${e.price}</p>
              <Link to={`/home/user/${e.name}`}>
                <Button variant="contained"  sx={{ backgroundColor: "#354152" }} >Haz tu reserva</Button>
              </Link>
            </div>
          );
        })
      )}
    </div>
  </div>
  );
}
