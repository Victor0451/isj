import {
  werchow,
  sgi,
  serv,
  sep,
  camp,
  arch,
  club,
  sanmiguel,
  isj
} from "../../libs/db/index";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.f && req.query.f === "traer movimientos") {
      const mae = await isj.query(`
          SELECT 
                DIA_EMI,                
                OPERADOR,
                CONCAT("Produccion Puesto"," (",PUESTO,")")'DETALLE',
                SUM(IMPORTE) 'IMPORTE',
                'I' as 'MOVIM',
                SERIE,                                  
                NRO_RECIBO as 'NUMERO',
                665 as 'CODIGO',
                '0401050000' as 'CUENTA',
                DATE_FORMAT(CURDATE(), "%Y-%m-%d" ) as 'FECHA',
                DATE_FORMAT(CURDATE(), "%Y-%m-%d" ) as 'FEC_COMP',
                DATE_FORMAT(NOW( ), "%H:%i" ) as 'HORA',
                " " as TIPO,
                " " as CUIT
          FROM pagos
          WHERE OPERADOR = '${req.query.operador}'
          AND RENDIDO = 0
          AND DIA_EMI = CURDATE()
          AND MOVIM = 'P'
          GROUP BY DIA_EMI, PUESTO, OPERADOR, SERIE, NRO_RECIBO
`);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(mae, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer cuentas") {
      const mae = await isj.query(`
          SELECT 
               *                               
          FROM subcta
          WHERE MOVIM in ('${req.query.movim}', 'A')
`);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(mae, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer tipo facturas") {
      const mae = await sgi.query(`
          SELECT 
               *                               
          FROM tipo_facturas          
`);

      await sgi.end();

      res
        .status(200)
        .json(
          JSON.stringify(mae, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "listado cajas") {
      const listadoCajas = await isj.query(`
          SELECT FECHA, HORA, IMPORTE, OPERADOR              
          FROM caja
          WHERE DETALLE = 'VALORES A DEPOSITAR'
          AND OPERADOR = '${req.query.operador}'
          GROUP BY FECHA, HORA, IMPORTE, OPERADOR   
          ORDER BY FECHA DESC   
`);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(listadoCajas, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "listado cajas admin") {
      const listadoCajas = await isj.query(`
          SELECT FECHA, HORA, IMPORTE, OPERADOR              
          FROM caja
          WHERE DETALLE = 'VALORES A DEPOSITAR'
          GROUP BY FECHA, HORA, IMPORTE, OPERADOR    
          ORDER BY FECHA DESC 
`);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(listadoCajas, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer ingresos caja fecha") {
      const ingFecha = await isj.query(`
          SELECT *             
          FROM caja
          WHERE FECHA = '${moment(req.query.fecha).format("YYYY-MM-DD")}'
          AND MOVIM = 'I'
          AND DETALLE != ('SALDO INICIAL')
          AND OPERADOR = '${req.query.usuario}'
          
          
`);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(ingFecha, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer egresos caja fecha") {
      const egFecha = await isj.query(`
          SELECT *             
          FROM caja
          WHERE FECHA = '${moment(req.query.fecha).format("YYYY-MM-DD")}'
          AND MOVIM = 'E'
          AND DETALLE != ('VALORES A DEPOSITAR')
          AND OPERADOR = '${req.query.usuario}'
          
`);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(egFecha, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    }
  } else if (req.method === "POST") {
    if (req.body.f && req.body.f === "reg caja") {
      const movCaja = await isj.query(
        `
          INSERT INTO caja
          (
            SUCURSAL,
            PUESTO,
            CODIGO,
            MOVIM,
            CUENTA,
            IMPORTE,
            TIPO,
            SERIE,
            NUMERO,
            CUIT,
            DETALLE,
            FECHA,
            FEC_COMP,
            HORA,
            OPERADOR
          )

          VALUES
          (
            '${req.body.SUCURSAL}',
            ${parseInt(req.body.PUESTO)},
            ${parseInt(req.body.CODIGO)},
            '${req.body.MOVIM}',
            '${req.body.CUENTA}',
            ${parseFloat(req.body.IMPORTE)},
            '${req.body.TIPO}',
            ${parseInt(req.body.SERIE)},
            ${parseInt(req.body.NUMERO)},
            '${req.body.CUIT}',
            '${req.body.DETALLE}',
            '${moment(req.body.FECHA).format("YYYY-MM-DD")}',
            '${moment(req.body.FEC_COMP).format("YYYY-MM-DD")}',
            '${req.body.HORA}',
            '${req.body.OPERADOR}'
          )
        `
      );

      await isj.end();

      res.status(200).json(movCaja);
    }
  } else if (req.method === "PUT") {
    if (req.body.f && req.body.f === "rendir pagos") {
      const mae = await isj.query(`
          UPDATE pagos
          SET RENDIDO = 1,
              FECHA_CAJA = CURDATE()
          WHERE DIA_PAG = CURDATE()  
          AND RENDIDO = 0
          AND MOVIM = 'P'
               
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
