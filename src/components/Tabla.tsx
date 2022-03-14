import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Dialog, DialogActions, DialogTitle, Grid, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "../styles/TablaStyle";
import { Usuario } from "src/models/usuario";
import { UserService } from "src/pages/api/Rule_Usuario";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu, { MenuProps } from "@mui/material/Menu";
import { ExpandLess, ExpandMore, SettingsInputComponentTwoTone, SettingsPowerRounded } from "@mui/icons-material";
import router from "next/router";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
}));

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: "#1976D2",
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#E2E8EC",
  borderRadius: 10,
  boxShadow: "0px 5px 5px -4px black",
}));

export default function AcccessibleTable() {
  const userService = new UserService();
  const [cargando, setCargando] = React.useState(true);
  const [users, setUsers] = React.useState<Usuario[]>([]);
  const [id, setId] = React.useState<number | undefined>(undefined)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [abierto, setOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  React.useEffect(() => {
    getUsers();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>, id?: number) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDialog = ()=>{
    setOpen(false);
    window.location.reload();
    
  };
  const handleDelete = async (id?:number) => {
    try{
      setCargando(true);
      const okDelete:Usuario = await userService.delete(id)
      setOpen(true)
    }catch(error){
      console.log(error);
    }
  };
  const getUsers = async () => {
    try {
      setCargando(true);
      let resultUsuarios: Usuario[] = await userService.obtenerUsuario();
      console.log(resultUsuarios);
      setUsers(resultUsuarios);
    } catch (error) {
      console.log(error);
      /*throw Error(error.message || "Error al levantar usuarios.");*/
    }
  };
  const classes = styles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ padding: 10 }}
    >
      <Grid style={{ width: 1000 }}>
        <TableContainer component={Paper} style={{ borderRadius: 10 }}>
          <Div>{"Usuarios"}</Div>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>Nombre</b>
                </TableCell>
                <TableCell align="center">
                  <b>Apellido</b>
                </TableCell>
                <TableCell align="center">
                  <b>DNI</b>
                </TableCell>
                <TableCell align="center">
                  <b>Correo Electronico</b>
                </TableCell>
                <TableCell align="right">
                  <b>Opciones</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row: Usuario) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.nombre}</TableCell>
                  <TableCell align="center">{row.apellido}</TableCell>
                  <TableCell align="center">{row.dni}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="right">
                    <Button

                      key={row.id}
                      id="demo-customized-button"
                      aria-controls={open ? "demo-customized-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      variant="text"
                      disableElevation
                      onClick={(event) => { handleClick(event, row.id) }}
                    >
                      <ExpandMore />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {console.log(id)}
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => router.push({
                  pathname: '/editar',
                  query: { id: JSON.stringify(id) }
                })} disableRipple>
                  Editar
                </MenuItem>
                <MenuItem onClick={() => { handleDelete(id) }} disableRipple>
                  Eliminar
                </MenuItem>
              </StyledMenu>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Dialog
                open={abierto}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Usuario dado de baja correctamente!"}
                </DialogTitle>


                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        autoFocus
                    >
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
    </Grid>
    
  );
}
