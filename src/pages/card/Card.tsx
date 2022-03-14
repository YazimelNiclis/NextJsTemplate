import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
    Button,
    Card,
    CardActionArea,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid
} from "@mui/material";
import { SentimentSatisfiedOutlined } from "@mui/icons-material";

let id = 0;
function createData(nombre: string, imagen: any, info: string, value: number) {
    id += 1;
    return { id, nombre, imagen, info, value };
}

const informacion = [
    // comment
    createData(
        "Dark Souls",
        "https://media.vandal.net/master/56347/dark-souls-remastered-2018431697_1.jpg",
        "Entonces llegó el Fuego. Vuelve a disfrutar del aclamadísimo juego que definió el género y con el que empezó todo. Gracias a una magnífica remasterización, podrás regresar a Lordran con unos impresionantes detalles. Dark Souls Remastered incluye el juego principal y el contenido descargable ",
        1
    ),
    createData(
        "Dark Souls 2",
        "https://www.global-esports.news/wp-content/uploads/2021/11/Dark-Souls-game.jpg",
        "Desarrollado por From Software, Dark Souls II es la muy esperada segunda entrega del exigente juego de 2011 Dark Souls. La acción de la vieja escuela que ofrecía este RPG era algo único que cautivó la imaginación de los jugadores de todo el mundo gracias a sus increíbles desafíos e intensas recompensas emocionalesDark Souls II fusiona la famosa dificultad de la franquicia con nuevas y espectaculares innovaciones jugables que potenciarán tanto el juego en solitario como la experiencia multijugador.Únete a este oscuro viaje y experimenta los sobrecogedores encuentros con enemigos, peligros demoniacos y el reto constante que solo FROM SOFTWARE puede ofrecer.",
        2
    ),
    createData(
        "Bloodborne",
        "https://i.blogs.es/5625e8/bloodborne/1366_2000.jpeg",
        'Enfrenta tus pesadillas mientras buscas respuestas en la antigua ciudad de Yharnam, ahora maldecida por una enfermedad endémica que se propaga por las calles como un fuego arrasador. El peligro, la muerte y la locura merodean en cada esquina de este mundo oscuro y espantoso, y debes descubrir sus secretos más oscuros para poder sobrevivir.',
        3
    ),
    createData(
        "Dark Souls 3",
        "https://i.blogs.es/f1c097/dark-souls-3/1366_2000.jpg",
        "Mientras el fuego se desvanece y el mundo cae en ruinas, la desarrolladora FROMSOFTWARE  y el director Hidetaka Miyazaki continúan la amada serie de referencia en su género con Dark Souls III. Fans y nuevos jugadores podrán dejarse perder en la jugabilidad distintiva y gráficos inmersivos. Ahora solo quedan las brasas...",
        4
    ),
    createData(
        "Sekiro",
        "https://larepublica.pe/resizer/VvOUmzK2Tce_8yk6qbszezkjLlQ=/1250x735/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/ANJXNQF3WFG3TEN3IBZ5EXAAKY.png",
        'En Sekiro: Shadows Die Twice, encarnarás al "lobo de un solo brazo", un guerrero desfigurado y caído en desgracia rescatado de los brazos de la muerte. Tras comprometerte a proteger a un joven lord, descendiente de un antiguo linaje, te convertirás en el objetivo de varios enemigos, incluido el peligroso clan Ashina. Cuando el joven lord es capturado, nada podrá detener tu peligrosa búsqueda para recuperar tu honor, ni siquiera la muerte.',
        5
    ),
    createData(
        "Demon Soul",
        "https://i.blogs.es/1a0ad8/demons-souls-screenshot-05-disclaimer-en-30sept20/1366_2000.jpeg",
        'Boletaria queda marginada del mundo exterior y a los caballeros que se atreven a adentrarse en la densa niebla para liberar a la tierra de su aprieto, no los ven nunca más. Como guerrero solitario que desafió a la perniciosa niebla, debes enfrentar el desafío más duro para ganarte el título "Matademonios" y enviar al Antiguo de vuelta a su letargo.',
        6
    ),
    createData(
        "Elden Ring",
        "https://phantom-marca.unidadeditorial.es/364be7894c4985ee178a172632fd2ebb/crop/0x0/1198x674/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/15/16449203191679.jpg",
        "Álzate, Sinluz, y que la gracia te guíe para abrazar el poder del Círculo de Elden y encumbrarte como señor del Círculo en las Tierras Intermedias. En las Tierras Intermedias gobernadas por la Reina Márika, la Eterna, el Círculo de Elden, origen del Árbol Áureo, ha sido destruido. Los descendientes de Márika, todos semidioses, reclamaron los fragmentos del Círculo de Elden conocidos como Grandes Runas. Fue entonces cuando la demencial corrupción de su renovada fuerza provocó una guerra: la Devastación.",
        7
    )
];

export default function ActionAreaCard() {
    const [open, setOpen] = React.useState(false);
    const [info, setInfo] = React.useState<any>(null);


    const handleClickOpen = (info: any) => {
        setOpen(true);
        setInfo(info)
    };




    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid
                container
                spacing={4}
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: "5px" }}
            >
                {informacion.map((info) => (

                    <Grid item xs="auto" key={info.id}>
                        <Card sx={{ maxWidth: 345, height: 200 }}>
                            <CardActionArea onClick={() => {
                                handleClickOpen(info)
                            }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={info.imagen}
                                    alt="DS"

                                />
                                <CardContent>
                                    <Grid>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {info.nombre}
                                        </Typography>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>


                        </Card>
                    </Grid>

                ))}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {info?.nombre}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {info?.info}
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </>
    );
}