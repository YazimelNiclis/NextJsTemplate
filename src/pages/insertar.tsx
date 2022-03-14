import {
  Button,
  Card,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import router from "next/router";
import React from "react";
import Layaout from "src/components/layaout";
import type { } from "@mui/lab/themeAugmentation";
import { Formik } from "formik";
import styles from "../styles/FormularioStyle";
import { UserService } from "./api/Rule_Usuario";
import { Usuario } from "src/models/usuario";
import Formulario from "src/components/Formulario";

export default function Insertar() {
  const userService = new UserService();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = async (values: any) => {
    console.log(values);
    let usuario = new Usuario();
    usuario = { ...values, email: values.correo };
    await userService
      .registrarUsuario(usuario)
      .then(() => {
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Formulario
        handleClickAceptar={handleClickOpen}
        initialValues={{nombre: "",
        correo: "",
        password: "",
        fecha: "",
        dni: 0,
        apellido: ""}}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Registrado correctamente!"}
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => router.push(`/`)}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}