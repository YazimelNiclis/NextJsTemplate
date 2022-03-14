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
import { UserService } from "src/pages/api/Rule_Usuario";
import { Usuario } from "src/models/usuario";

interface formProps {
  handleClickAceptar: (values: any) => void
  initialValues: usuarioForm
}

interface usuarioForm {
  nombre?: string
  correo?: string
  password?: string
  fecha?: string
  dni?: number
  apellido?: string
}

export default function Formulario(props: formProps) {
  function sumDia(fecha: any, dias: any) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
  const classes = styles();
  return (
    <Layaout>
      <Formik
        initialValues={props.initialValues}
        validate={(valores) => {
          let errores = {
            nombre: "",
            correo: "",
            password: "",
            fecha: "",
            dni: "",
            apellido: "",
          };
          //Validación nombre
          if (!valores.nombre) {
            errores.nombre = "El nombre es requerido.";
          } else if (!/^[a-zA-ZÁ-ÿ\s]{1,40}$/.test(valores.nombre)) {
            errores.nombre = "El nombre solo puede contener letras y espacios.";
          }

          if (!valores.apellido) {
            errores.apellido = "El apellido es un campo obligatorio.";
          } else if (!/^[a-zA-ZÁ-ÿ\s]{1,40}$/.test(valores.apellido)) {
            errores.apellido =
              "El apellido solo puede contener letras y espacios.";
          }

          //Validación correo
          if (!valores.correo) {
            errores.correo = "Es obligatorio insertar un correo.";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.correo
            )
          ) {
            errores.correo =
              "El correo solo puede contener letras, numeros, puntos, guiones y guión bajo.";
          }
          //Validación password
          if (!valores.password) {
            errores.password = "Por favor registre una contraseña.";
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){4,15}$/.test(
              valores.password
            )
          ) {
            errores.password =
              "La contraseña debe de tener al menos un numero, una mayúscula y una minúscula.";
          }

          if (!valores.dni) {
            errores.dni = "Por favor registre un DNI";
          } else if (!/^\d{8}$/.test(valores.dni.toString())) {
            errores.dni = "El DNI debe ser de 8 dígitos.";
          }

          var dia = new Date(String(valores.fecha));
          var formateada = sumDia(dia, 1);
          var hoy = new Date();
          if (!valores.fecha) {
            errores.fecha = "Debe seleccionar una fecha.";
          } else if (formateada > hoy) {
            errores.fecha = "La fecha no puede ser mayor o igual a la actual.";
          }

          return errores;
        }}
        onSubmit={(values) => {
          console.log("Formulario enviado");
          console.log(values);
        }}
      >
        {({
          handleSubmit,
          values,
          errors,
          handleChange,
          handleBlur,
          touched,
        }) => (
          <form className="formulario" onSubmit={handleSubmit}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={4}
              style={{ padding: 5 }}
            >
              <Grid item xs="auto">
                <Card
                  style={{ borderColor: "#00000000", borderStyle: "inset" }}
                >
                  <Grid item xs="auto" style={{ padding: 5, width: 583 }}>
                    <Typography
                      variant="caption"
                      display="block"
                      style={{ padding: 8 }}
                    >
                      * Campo obligatorio
                    </Typography>
                    <TextField
                      fullWidth
                      className={classes.input}
                      id="nombre"
                      type="text"
                      placeholder="Ingrese su nombre"
                      name="nombre"
                      label="Nombre *"
                      variant="outlined"
                      value={values.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.nombre && errors.nombre && (
                      <div className="error">{errors.nombre}</div>
                    )}
                  </Grid>
                  <Grid item xs="auto" style={{ padding: 5 }}>
                    <TextField
                      fullWidth
                      className={classes.input}
                      id="apellido"
                      type="text"
                      placeholder="Ingrese su apellido"
                      name="apellido"
                      label="Apellido *"
                      variant="outlined"
                      value={values.apellido}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.apellido && errors.apellido && (
                      <div className="error">{errors.apellido}</div>
                    )}
                  </Grid>

                  <Grid item xs="auto" style={{ padding: 5 }}>
                    <TextField
                      fullWidth
                      id="fecha"
                      label="Fecha de nacimiento *"
                      type="date"
                      className={classes.input}
                      value={values.fecha}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    {touched.fecha && errors.fecha && (
                      <div className="error">{errors.fecha}</div>
                    )}
                  </Grid>
                  <Grid item xs="auto" style={{ padding: 5 }}>
                    <TextField
                      fullWidth
                      id="correo"
                      label="Mail *"
                      type="email"
                      value={values.correo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={classes.input}
                    />
                    {touched.correo && errors.correo && (
                      <div className="error">{errors.correo}</div>
                    )}
                  </Grid>
                  <Grid item xs="auto" style={{ padding: 5 }}>
                    <TextField
                      fullWidth
                      className={classes.input}
                      id="password"
                      label="Password *"
                      type="password"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.password && errors.password && (
                      <div className="error">{errors.password}</div>
                    )}
                  </Grid>

                  <Grid item xs="auto" style={{ padding: 5 }}>
                    <TextField
                      fullWidth
                      className={classes.input}
                      id="dni"
                      label="DNI *"
                      type="number"
                      autoComplete="current-dni"
                      value={values.dni}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.dni && errors.dni && (
                      <div className="error">{errors.dni}</div>
                    )}
                  </Grid>

                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                  >
                    <Grid item xs="auto">
                      {sumDia(new Date(String(values.fecha)), 1) < new Date() &&
                        /^[a-zA-ZÁ-ÿ\s]{1,40}$/.test(String(values.apellido)) &&
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                          String(values.correo)
                        ) &&
                        /^\d{8}$/.test(String(values.dni)) &&
                        /^[a-zA-ZÁ-ÿ\s]{1,40}$/.test(String(values.nombre)) &&
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){4,15}$/.test(
                          String(values.password)
                        ) ? (
                        <>
                          <Button
                            variant="contained"
                            type="submit"
                            onClick={() => { props.handleClickAceptar(values) }}
                            style={{ margin: 5 }}
                          >
                            Aceptar
                          </Button>

                        </>
                      ) : (
                        <Button
                          variant="contained"
                          type="submit"
                          disabled
                          onClick={props.handleClickAceptar}
                          style={{ margin: 5 }}
                        >
                          Aceptar
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        onClick={() => router.push(`/`)}
                        style={{ margin: 5 }}
                      >
                        Cancelar
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Layaout>
  );
}