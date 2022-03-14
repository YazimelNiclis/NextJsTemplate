import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle
} from "@mui/material";
import router, { useRouter } from "next/router";
import React from "react";
import type { } from "@mui/lab/themeAugmentation";
import { UserService } from "./api/Rule_Usuario";
import { Usuario } from "src/models/usuario";
import Formulario from "src/components/Formulario";

export default function Editar(props: any) {
    const router = useRouter()
    const userService = new UserService();
    const [open, setOpen] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<Usuario>();
    const [cargando, setCargando] = React.useState<boolean>(true);

    React.useEffect(() => {
        getById(Number(router.query.id));
        console.log(router.query.id)
    }, []);

    const getById = async (id: number) => {
        try {
            let resultUsuario: Usuario = await userService.getById(id);
            console.log(resultUsuario);
            setUser(resultUsuario);
            setCargando(false);
        } catch (error) {
            console.log(error);
            setCargando(false);

        }
    };
    const handleClickOpen = async (values: any) => {
        let usuario = new Usuario();
        usuario = { ...values, email: values.correo };
        await userService
            .actualizarUsuario(usuario)
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
            {!cargando ? <Formulario
                handleClickAceptar={handleClickOpen}
                initialValues={{ ...user, correo: user?.email || "", fecha: "" }}
            /> : null}


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Actualizado correctamente!"}
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