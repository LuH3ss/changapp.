import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { getUserEmail, getAllReviews } from "../../redux/actions";
import Rating from "@mui/material/Rating";
import styles from "./Request/style";
import { Avatar, Box, Typography } from "@mui/material";
import userImg from "../../user.png";

export default function ProfileRev() {
  const { user } = useAuth();
  let allReviews = useSelector((state) => state.reviews);
  const userDb = useSelector((state) => state.filter);
  allReviews = allReviews.filter((r) => r.user_id === userDb[0]?.id);
  const dispatch = useDispatch();

  //Paginado para las reviews
  const paginas = Math.ceil(allReviews.length / 3);
  const [pages, setPages] = useState(1);
  const [notisPerPage] = useState(3);
  const ultima = pages * notisPerPage;
  const primera = ultima - notisPerPage;
  const revSlice = allReviews?.slice(primera, ultima);

  const handleAnterior = (e) => {
    e.preventDefault();
    setPages(pages - 1);
    if (pages < 2) {
      setPages(1);
    }
    window.scrollTo(0, 0);
  };

  const handleSiguiente = () => {
    setPages(pages + 1);
    if (pages >= paginas) {
      setPages(paginas);
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
    dispatch(getAllReviews());
  }, [dispatch, user?.email]);

  const stylesJP = {
    container: {
      display: "flex",
      width: "70%",
      flexDirection: "column",
      alignItems: "center",
    },
  };

  return (
    <Box style={stylesJP.container}>
      {allReviews?.length === 0 ? (
        <p>No recibiste reseñas por el momento</p>
      ) : (
        revSlice?.map((e) => {
          return (
            <Box
              key={e.id}
              sx={{
                display: "flex",
                border: "solid grey 1px",
                borderRadius: "10px",
                padding: "2%",
                margin: "2%",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: "100px" }}
                  src={e.author?.img ? e.author?.img : userImg}
                  alt="Rompio"
                  width="100px"
                  height="100px"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "1.2rem" }}>
                  Autor: {e.author?.firstName} {e.author?.lastName}
                </Typography>
                <Typography sx={{ fontSize: "1.2rem", overflow: "auto" }}>
                  Mensaje: {e.message}
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    fontSize: "1.2rem",
                    alignItems: "center",
                  }}
                >
                  Calificacion: <Rating defaultValue={e.rate} readOnly />
                </Typography>
              </Box>
            </Box>
          );
        })
      )}
      <div style={styles.paginadoDiv}>
        <button style={styles.btnPaginado} onClick={handleAnterior}>
          {"<"}
        </button>
        {pages} of {paginas}
        <button style={styles.btnPaginado} onClick={handleSiguiente}>
          {">"}
        </button>
      </div>
    </Box>
  );
}
