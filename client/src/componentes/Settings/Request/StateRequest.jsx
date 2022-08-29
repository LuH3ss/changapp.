import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { getAllServices, updateRequest } from "../../../redux/actions";
import { Link } from "react-router-dom";

export default function StateRequest() {
  const { user } = useAuth();
  const serviceState = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const filterEmail = serviceState.filter(
    (state) => state.user?.email === user?.email
  );
  const [btn, setBtn] = useState({
    state: "",
    id: "",
  });
  console.log(filterEmail);
  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const handleOnClick = (e) => {
    e.preventDefault();
    setBtn({
      ...btn,
      state: e.target.name,
      id: e.target.id,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRequest(btn));
    window.location.reload(true);
  };

  console.log(filterEmail);
  return (
    <div>
      <h1>Estado del Servicio</h1>
      {filterEmail.length === 0 ? (
        <p>No tiene estados pendientes de servicios</p>
      ) : (
        filterEmail.map((e) => {
          return e.request[0]?.state !== "pending" &&
            e.request[0]?.state !== "aceptado" ? (
            <p>Tu servicio {e.name} no recibio solicitudes nuevas</p>
          ) : (
            <div>
              <p>Nombre del servicio: {e.name}</p>
              <p>Estado: {e.request[0]?.state}</p>
              <p>
                Trabajo solicitado para el dia {e.request[0]?.day} a las{" "}
                {e.request[0]?.hours}hs
              </p>
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <label>Aceptar</label>
                <input
                  type="checkbox"
                  name="aceptado"
                  id={e.request[0]?.id}
                  onChange={handleOnClick}
                  checked={btn === "rechazado" ? true : false}
                />
                <label>Rechazar</label>
                <input
                  type="checkbox"
                  name="rechazado"
                  id={e.request[0]?.id}
                  onChange={handleOnClick}
                  checked={btn === "rechazado" ? true : false}
                />
                <div>
                  <button>Confirmar</button>
                </div>
              </form>
            </div>
          );
        })
      )}
    </div>
  );
}
