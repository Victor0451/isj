import bcrypt from "bcryptjs";
import configs from "config";
import jwt from "jsonwebtoken";
import auth from "../../hook/auth";
import { werchow, sgi, serv, sep, camp, arch, club } from "../../libs/db/index";
import moment from "moment";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.f && req.query.f === "operadores") {
      const operadores = await sgi.query(
        `
        SELECT *
        FROM operador
        WHERE estado = true
      
      `
      );

      await sgi.end();

      res.status(200).json(operadores);
    }
  } else if (req.method === "POST") {
    if (req.body.f && req.body.f === "login") {
      const { usuario, contrasena } = req.body;

      // chek usuario existente

      await sgi
        .query(
          `
                  SELECT *
                  FROM operador
                  WHERE usuario = '${usuario}'
                `
        )
        .then((user) => {
          if (user.length === 0) {
            res.status(400).json({ msg: "Usuario Ingresado No Existe" });
          } else if (user[0].estado === 0) {
            res.status(400).json({ msg: "Usuario Dado de Baja" });
          } else {
            //Validate password
            bcrypt.compare(contrasena, user[0].contrasena).then((isMatch) => {
              if (!isMatch) {
                res.status(400).json({ msg: "Credenciales Invalidas" });
                sgi.end();
              }
              {
                jwt.sign(
                  { id: user[0].id },
                  configs.get("jwtSecret"),
                  { expiresIn: 3600 },
                  (err, token) => {
                    if (err) throw err;
                    sgi.end();

                    res.status(200).json({
                      token,
                      user: {
                        id: user[0].id,
                        usuario: user[0].usuario,
                        contrasena: user[0].contrasena,
                        nombre: user[0].nombre,
                        apellido: user[0].apellido,
                        perfil: user[0].perfil,
                        estado: user[0].estado,
                        puestom: user[0].puestom,
                        seriem: user[0].seriem,
                        m: user[0].m,
                        puestow: user[0].puestow,
                        seriew: user[0].seriew,
                        w: user[0].w,
                        codigo: user[0].codigo,
                        medicos: user[0].medicos,
                        sucursal: user[0].sucursal,
                        prestamos: user[0].prestamos,
                        ordenpago: user[0].ordenpago,
                        clubwerchow: user[0].clubwerchow,
                        ventas: user[0].ventas,
                        campanas: user[0].campanas,
                        socios: user[0].socios,
                        sepelio: user[0].sepelio,
                        administracion: user[0].administracion,
                        contabilidad: user[0].contabilidad,
                        gestion: user[0].gestion,
                        cobranza: user[0].cobranza,
                        createdAt: user[0].createdAt,
                        updatedAt: user[0].updatedAt,
                      },
                    });
                  }
                );
              }
            });
          }
        });
    }
  } else if (req.method === "PUT") {
    if (req.body.f && req.body.f === "cambiar contrasena") {
      let contra = req.body.contra;

      //Create salt & hash

      await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(contra, salt, (err, hash) => {
          if (err) throw err;
          contra = hash;

          sgi
            .query(
              `
                UPDATE operador
                SET contrasena = '${contra}'
                WHERE id= ${parseInt(req.body.id)}
              `
            )

            .then((operador) => {
              sgi.end();
              res.status(200).json(operador);
            })
            .catch((err) => {
              res.status(400).json(err);
              console.log(err);
            });
        });
      });
    }
  }
}
