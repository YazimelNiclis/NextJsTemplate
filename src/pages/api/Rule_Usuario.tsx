import { Api } from "@mui/icons-material";
import { Usuario } from "src/models/usuario";
import API from "./Rule_API";

export class UserService {
  async registrarUsuario(usuario: Usuario) {
    let url = "/usuarios/insert";
    return await API.post(url, usuario)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw Error(error || "Error procesando la solicitud");
      });
  }

  async actualizarUsuario(usuario: Usuario) {
    let url = "/usuarios/update";
    console.log(usuario)
    return await API.patch(url, {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      dni: usuario.dni,
      password: usuario.password,
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw Error(error || "Error procesando la solicitud");
      });
  }

  async obtenerUsuario() {
    let url = "/usuarios/getAll";
    return await API.get(url)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw Error(error || "Error procesando la solicitud");
      });
  }
  async getById(id: number) {
    let url = "/usuarios/byId?id=" + id;
    return await API.get(url)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw Error(error || "Error procesando la solicitud");
      });
  }
  async delete(id?: number) {
    let url = "/usuarios/delete";
    return await API.delete(url, {
      data: { id: id }
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw Error(error || "Error procesando la solicitud");
      });
  }

}
