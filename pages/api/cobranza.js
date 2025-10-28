import {
  werchow,
  sgi,
  serv,
  sep,
  camp,
  arch,
  club,
  sanmiguel,
  SMArchivo,
  ISJArchivo,
  isj,
} from "../../libs/db/index";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.f && req.query.f === "ultimo recibo") {
      const ultimoRec = await isj.query(
        `
        SELECT  NRO_RECIBO,
                id
        FROM pagos
        WHERE SERIE = ${parseInt(req.query.serie)}        
        ORDER BY NRO_RECIBO DESC
        LIMIT 1
      
      `
      );

      await isj.end();

      res.status(200).json(ultimoRec);
    } else if (req.query.f && req.query.f === "traer puestos") {
      const traerPuesto = await sgi.query(
        `
          SELECT *
          FROM puestos
          WHERE operador = '${req.query.operador}'
        `
      );

      await sgi.end();

      res.status(200).json(traerPuesto);
    } else if (req.query.f && req.query.f === "traer recibo") {
      const traerRec = await isj.query(
        `
        SELECT *
        FROM pagos
        WHERE CONTRATO= ${parseInt(req.query.contrato)}
        AND SERIE= ${parseInt(req.query.serie)}
        AND NRO_RECIBO= ${parseInt(req.query.rec)}
        AND DIA_PAG= '${moment(req.query.fecha).format("YYYY-MM-DD")}'

      `
      );

      await isj.end();

      res.status(200).json(traerRec);
    } else if (req.query.f && req.query.f === "listado recibos") {
      const listRec = await isj.query(
        `
            SELECT * 
            FROM pagos
            WHERE OPERADOR = '${req.query.operador}'
            ORDER BY DIA_PAG DESC
          `
      );

      await isj.end();

      res.status(200).json(listRec);
    } else if (req.query.f && req.query.f === "listado recibos admin") {
      const listRec = await isj.query(
        `
        SELECT *
        FROM pagos
        ORDER BY DIA_PAG DESC
      `
      );

      await isj.end();

      res.status(200).json(listRec);
    } else if (req.query.f && req.query.f === "check so") {
      let tab = `${req.query.tab}`;

      const checkSO = await ISJArchivo.query(`
       SHOW TABLES LIKE '${tab}'
`);

      await ISJArchivo.end();

      res.status(200).json(checkSO);
    } else if (req.query.f && req.query.f === "ofi emi") {
      let tab = `${req.query.tab}`;

      const ofiEmi = await ISJArchivo.query(`
          SELECT 'Oficina' as 'zona', 'Monterrico' as 'descr', COUNT(*) as 'fichas', SUM(CUOTA) as 'total' 
          FROM ${tab} 
          WHERE GRUPO = 1000 
          AND DEUDA IN (1, 2)
`);

      await ISJArchivo.end();

      res
        .status(200)
        .json(
          JSON.stringify(ofiEmi, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "ofi cob") {
      let tab = `${req.query.tab}`;

      const ofiEmi = await ISJArchivo.query(`
          SELECT 'Oficina' as 'zona', COUNT(*) as 'fichascob', SUM(CUOTA) as 'cobrado'           
          FROM ${tab}  as s
          INNER JOIN isj.pagos as p on p.CONTRATO = s.CONTRATO
          WHERE s.GRUPO = 1000
          AND s.DEUDA in (1,2)
          AND p.MES = ${parseInt(req.query.mes)}
          AND p.ANO = ${parseInt(req.query.ano)}
          AND p.MOVIM = 'P'
          AND p.DIA_PAG BETWEEN '${moment(req.query.mes, "MM")
            .startOf("month")
            .format("YYYY-MM-DD")}'
          AND '${moment(req.query.mes, "MM")
            .endOf("month")
            .format("YYYY-MM-DD")}'
          
`);

      await ISJArchivo.end();

      res
        .status(200)
        .json(
          JSON.stringify(ofiEmi, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "ofi adel") {
      const ofiEmi = await isj.query(`
          SELECT 'Oficina' as 'zona', 
          (CASE
          WHEN SUM(IMPORTE) IS NULL
          THEN 0
          WHEN SUM(IMPORTE) IS NOT NULL
          THEN SUM(IMPORTE)
          END
          ) as 'adelantado'           
          FROM  pagos as p 
          WHERE p.MES >= ${parseInt(req.query.mes)}
          AND p.ANO >= ${parseInt(req.query.ano)}
          AND p.MOVIM = 'P'
          AND p.DIA_PAG BETWEEN '${moment(req.query.mes, "MM")
            .startOf("month")
            .format("YYYY-MM-DD")}'
          AND '${moment(req.query.mes, "MM")
            .endOf("month")
            .format("YYYY-MM-DD")}'
          
`);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(ofiEmi, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "socios sin abonar") {
      let tab = `${req.query.tab}`;

      const ofiEmi = await ISJArchivo.query(`
              SELECT
                  *
              FROM
                  ${tab} AS s
              WHERE
                  s.GRUPO = 1000
              AND s.DEUDA IN (1, 2)
              AND NOT EXISTS (
                  SELECT
                    *
                  FROM
                    isj.pagos AS p
                  WHERE
                    s.CONTRATO = p.CONTRATO
                  AND p.MES = ${parseInt(req.query.mes)}
                  AND p.ANO = ${parseInt(req.query.ano)}
                  AND p.MOVIM = 'P'
                )
          
`);

      await ISJArchivo.end();

      res
        .status(200)
        .json(
          JSON.stringify(ofiEmi, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "check rec") {
      const chkRec = await isj.query(`
        SELECT
            *
        FROM
          pagos
        WHERE SERIE = ${parseInt(req.query.serie)}
        AND NRO_RECIBO = ${parseInt(req.query.nro)}
          
    
`);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(chkRec, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    }
  } else if (req.method === "POST") {
    if (req.body.f && req.body.f === "reg pago") {
      const nuPago = await isj.query(
        `
      INSERT INTO pagos
      (
          SERIE,
          NRO_RECIBO,
          MES,
          ANO,
          IMPORTE,
          DIA_REN,
          DIA_CAR,
          DIA_EMI,
          DIA_PAG,
          HORA_CAR,
          CONTRATO,
          MAN_COM,
          MOVIM,
          OPERADOR,
          PUESTO,
          ZONA,
          SUCURSAL,
          EMPRESA,
          RENDIDO,
          MED_PAG
      )

      VALUES
      (
          ${parseInt(req.body.SERIE)},
           ${parseInt(req.body.NRO_RECIBO)},
           ${parseInt(req.body.MES)},
           ${parseInt(req.body.ANO)},
           ${parseFloat(req.body.IMPORTE)},
           '${moment(req.body.DIA_REN).format("YYYY-MM-DD")}',
           '${moment(req.body.DIA_CAR).format("YYYY-MM-DD")}',
           '${moment(req.body.DIA_EMI).format("YYYY-MM-DD")}',
           '${moment(req.body.DIA_PAG).format("YYYY-MM-DD")}',
           '${req.body.HORA_CAR}',
           ${parseInt(req.body.CONTRATO)},
           '${req.body.MAN_COM}',
           '${req.body.MOVIM}',
           '${req.body.OPERADOR}',
           ${parseFloat(req.body.PUESTO)},
           ${parseInt(req.body.ZONA)},
           '${req.body.SUCURSAL}',
           '${req.body.EMPRESA}',
           ${parseInt(req.body.RENDIDO)},
           '${req.body.MED_PAG}'
      )
    `
      );

      await isj.end();

      res.status(200).json(nuPago);
    }
  } else if (req.method === "PUT") {
    if (req.body.f && req.body.f === "anular recibo") {
      const mae = await isj.query(`
          UPDATE pagos
          SET MOVIM = 'A'              
          WHERE id = ${parseInt(req.body.id)}          
               
`);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(mae, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    }
  }
}
