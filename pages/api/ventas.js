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
    if (req.query.f && req.query.f === "informe ventas") {
      let tab = `${req.query.tab}`;

      const infoVentas = await isj.query(`
           SELECT
                m.CONTRATO,
                CONCAT(m.APELLIDOS, ', ', m.NOMBRES) AS 'SOCIO',
                m.ALTA,
                m.PRODUCTOR,
                p.DESCRIP,
                (
                    CASE
                    WHEN EXISTS (
                        SELECT
                            *
                        FROM
                            pagos AS pa
                        WHERE
                            pa.CONTRATO = m.CONTRATO
                        AND mes = ${parseInt(req.query.mes)}
                        AND ANO = ${parseInt(req.query.ano)}
                        AND movim = 'P'
                    ) THEN
                        'PAGO'
                    ELSE
                        'NO PAGO'
                    END
                ) 'PAGO',
                 c.IMPORTE
            FROM
                maestro AS m
            INNER JOIN producto AS p ON p.codigo = m.PRODUCTOR
            INNER JOIN cuo_fija AS c ON c.CONTRATO = m.CONTRATO
            WHERE m.ALTA BETWEEN '${moment(req.query.desde).format(
              "YYYY-MM-DD"
            )}' and '${moment(req.query.hasta).format("YYYY-MM-DD")}' 
            ORDER BY m.ALTA ASC
  `);

      await isj.end();
      res
        .status(200)
        .json(
          JSON.stringify(infoVentas, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    }
  }
}
