import {
  werchow,
  sgi,
  serv,
  sep,
  camp,
  arch,
  club,
  isj,
  sanmiguel,
  SMArchivo,
} from "../../libs/db/index";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.f && req.query.f === "traer cuentas") {
      const cuentas = await isj.query(
        `
              SELECT *
              FROM subcta
              ORDER BY CUEN ASC
            `
      );

      await isj.end();
      res.status(200).json(cuentas);
    }
  } else if (req.method === "POST") {
    if (req.body.f && req.body.f === "reg cuenta") {
      const regCuen = await isj.query(
        `
            INSERT INTO subcta
            (
              CODI,
              DESC,
              CUEN,
              MOVIM
            )

            VALUES
            (
               ${parseInt(req.body.CODI)},
               '${req.body.DESC}',
               ${parseInt(req.body.CUEN)},
               '${req.body.MOVIM}'
            )
          `
      );

      await isj.end();

      res.status(200).json(regCuen);
    }
  } else if (req.method === "DELETE") {
    if (req.query.f && req.query.f === "eliminar cuenta") {
      const delCuenta = await isj.query(
        `
      DELETE FROM subcta
      WHERE id = ${parseInt(req.query.id)}
    `
      );

      await isj.end();

      res.status(200).json(delCuenta);
    }
  }
}
