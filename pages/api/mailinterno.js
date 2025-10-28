import { werchow, sgi, serv, sep, camp, arch, club } from "../../libs/db/index";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.f && req.query.f === "entrada") {
      const entrada = await sgi.query(
        `
          SELECT *
          FROM mails
          WHERE recibe = '${req.query.usu}'
          ORDER BY fecha DESC
        
        `
      );

      await sgi.end();

      res.status(200).json(entrada);
    } else if (req.query.f && req.query.f === "salida") {
      const salida = await sgi.query(
        `
          SELECT *
          FROM mails
          WHERE envia = '${req.query.usu}'
          ORDER BY fecha DESC
        
        `
      );

      await sgi.end();

      res.status(200).json(salida);
    } else if (req.query.f && req.query.f === "traer archivos") {
      const archivos = await sgi.query(
        `
         SELECT *
         FROM mails_adjuntos
         WHERE codmail = '${req.query.codmail}'  
         

         `
      );

      await sgi.end();

      res.status(200).json(archivos);
    } else if (req.query.f && req.query.f === "traer cajas mail") {
      const cajasMail = await sgi.query(`
       SELECT 
                CONCAT(empresa, '-' , idcaja, '-', fecha_carga) 'label',                
                CONCAT('/caja/sucursales/cajamail?id=',idcaja) 'value'
        FROM caja_sucursales
        WHERE operador_carga = '${req.query.op}'
        ORDER BY idcaja DESC
  
  `);

      await sgi.end();
      res.status(200).json(cajasMail);
    } else if (req.query.f && req.query.f === "noti entrada") {
      const entrada = await sgi.query(
        `
          SELECT *
          FROM mails
          WHERE  recibe = '${req.query.usu}'
          AND leido = false
          ORDER BY fecha DESC
        
        `
      );

      await sgi.end();

      res.status(200).json(entrada);
    }
  } else if (req.method === "POST") {
    if (req.body.f && req.body.f === "enviar mail") {
      const enviarMail = await sgi.query(
        `
              INSERT INTO mails
              (
                fecha,
                envia,
                recibe,
                descrip,
                codmail,
                asunto,
                leido,                
                url_caja
              
              )

              VALUES
              (
                '${moment(req.body.fecha).format("YYYY-MM-DD HH:mm")}',
                '${req.body.envia}',
                '${req.body.recibe}',
                '${req.body.descrip}',
                '${req.body.codmail}',
                '${req.body.asunto}',
                ${req.body.leido},               
                '${req.body.url_caja}'
                    
              )
          `
      );
      await sgi.end();

      res.status(200).json(enviarMail);
    }
  } else if (req.method === "PUT") {
  }
}
