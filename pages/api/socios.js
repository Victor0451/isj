import {
  werchow,
  sgi,
  serv,
  sep,
  camp,
  arch,
  club,
  isj,
  sanmiguel
} from "../../libs/db/index";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.f && req.query.f === "maestro") {
      const mae = await isj.query(`
            SELECT
                m.CONTRATO, 
                m.GRUPO, 
                m.SUCURSAL, 
                m.NRO_DOC, 
                m.APELLIDOS,
                m.NOMBRES, 
                m.ALTA, 
                m.VIGENCIA, 
                m.DOM_LAB, 
                m.PLAN,                 
                m.CALLE, 
                m.NRO_CALLE,
                m.BARRIO, 
                m.NACIMIENTO, 
                m.TELEFONO, 
                m.MOVIL, 
                m.MAIL,                 
                m.PRODUCTOR, 
                m.LOCALIDAD, 
                m.DOMI_COBR,
                m.DOM_LAB ,                 
                "T" as "perfil", 
                o.NOMBRE "OBRA_SOC",
                o.CODIGO "COD_OBRA", 
                m.ADHERENTES, 
                TIMESTAMPDIFF(YEAR,m.NACIMIENTO,CURDATE()) "EDAD",  
                m.SEXO,
                m.ZONA, 
                m.ESTADO,
                m.idmaestro
                FROM maestro as m                
                INNER JOIN obra_soc as o on o.CODIGO = m.OBRA_SOC
                WHERE m.NRO_DOC = ${req.query.dni}

    `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(mae, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "maestro contrato") {
      const mae = await isj.query(`
            SELECT
                m.CONTRATO, 
                m.GRUPO, 
                m.SUCURSAL, 
                m.NRO_DOC, 
                m.APELLIDOS,
                m.NOMBRES, 
                m.ALTA, 
                m.VIGENCIA, 
                m.DOM_LAB, 
                m.PLAN,                 
                m.CALLE, 
                m.NRO_CALLE,
                m.BARRIO, 
                m.NACIMIENTO, 
                m.TELEFONO, 
                m.MOVIL, 
                m.MAIL,                 
                m.PRODUCTOR, 
                m.LOCALIDAD, 
                m.DOM_LAB ,    
                m.DOMI_COBR,             
                "T" as "perfil", 
                o.NOMBRE "OBRA_SOC",
                o.CODIGO "COD_OBRA", 
                m.ADHERENTES, 
                TIMESTAMPDIFF(YEAR,m.NACIMIENTO,CURDATE()) "EDAD",  
                m.SEXO,
                m.ZONA,
                m.ESTADO,
                m.idmaestro
                                    
                FROM maestro as m                
                INNER JOIN obra_soc as o on o.CODIGO = m.OBRA_SOC
                WHERE m.CONTRATO = ${req.query.ficha}

    `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(mae, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "maestro apellido") {
      const mae = await isj.query(`
            SELECT
               *     
            FROM maestro as m               
            WHERE m.APELLIDOS LIKE UPPER('%${req.query.apellido}%')

    `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(mae, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "adh") {
      const adh = await isj.query(`
          SELECT
                a.CONTRATO, 
                a.SUCURSAL, 
                a.NRO_DOC, 
                a.NACIMIENTO,             
                a.SEXO,
                a.APELLIDOS, 
                a.NOMBRES, 
                a.ALTA, 
                a.VIGENCIA, 
                a.NACIMIENTO,
                m.GRUPO,
                o.NOMBRE "OBRA_SOC",
                o.CODIGO "COD_OBRA",  
                a.PRODUCTOR,                  
                TIMESTAMPDIFF(YEAR,a.NACIMIENTO,CURDATE()) "EDAD",                                
                "A" as "perfil",
                a.BAJA,
                a.EDAD 'FALLE',
                a.idadherent
                FROM adherent as a
                INNER JOIN maestro as m on a.CONTRATO = m.CONTRATO                  
                INNER JOIN obra_soc as o on o.CODIGO = m.OBRA_SOC
                WHERE a.CONTRATO = ${req.query.contrato}
                

    `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(adh, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "mae adh") {
      const maeAdh = await isj.query(`
            SELECT
                a.CONTRATO, 
                a.SUCURSAL, 
                a.NRO_DOC, 
                a.NACIMIENTO,             
                a.SEXO,
                a.APELLIDOS, 
                a.NOMBRES, 
                a.ALTA, 
                a.VIGENCIA, 
                a.NACIMIENTO,
                m.GRUPO,
                o.NOMBRE "OBRA_SOC",
                o.CODIGO "COD_OBRA",                 
                TIMESTAMPDIFF(YEAR,a.NACIMIENTO,CURDATE()) "EDAD",     
                a.PRODUCTOR,           
                CASE 
                    WHEN m.EMPRESA = "W" THEN  "WERCHOW"
                    WHEN m.EMPRESA = "M" THEN  "MUTUAL"
                    ELSE  null
                END 'EMPRESA'    ,
                "A" as "perfil",
                a.EDAD 'FALLE',
                a.idadherent
                FROM adherent as a
                INNER JOIN maestro as m on a.CONTRATO = m.CONTRATO                  
                INNER JOIN obra_soc as o on o.CODIGO = m.OBRA_SOC
                WHERE a.NRO_DOC = ${req.query.dni}
                AND BAJA IS NULL

    `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(maeAdh, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "mae adh baja") {
      const maeAdh = await isj.query(`
            SELECT
                a.CONTRATO, 
                a.SUCURSAL, 
                a.NRO_DOC, 
                a.NACIMIENTO,             
                a.SEXO,
                a.APELLIDOS, 
                a.NOMBRES, 
                a.ALTA, 
                a.VIGENCIA, 
                a.NACIMIENTO,
                m.GRUPO,
                o.NOMBRE "OBRA_SOC",
                o.CODIGO "COD_OBRA",   
                a.PRODUCTOR,                 
                TIMESTAMPDIFF(YEAR,a.NACIMIENTO,CURDATE()) "EDAD",       
                "A" as "perfil",
                a.EDAD 'FALLE',
                a.idadherent
                FROM adherent as a
                INNER JOIN maestro as m on a.CONTRATO = m.CONTRATO                  
                INNER JOIN obra_soc as o on o.CODIGO = m.OBRA_SOC
                WHERE a.NRO_DOC = ${req.query.dni}
                AND BAJA IS NOT NULL

    `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(maeAdh, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer grupo") {
      const grup = await isj.query(`
            SELECT
                CODIGO,
                DESCRIP                
            FROM grupos 
            WHERE CODIGO = ${parseInt(req.query.grupo)}
                

    `);

      await isj.end();

      res.status(200).json(grup);
    } else if (req.query.f && req.query.f === "traer pagos") {
      const pagos = await isj.query(
        `
                SELECT *
                FROM pagos
                WHERE CONTRATO = ${parseInt(req.query.ficha)}
                AND MOVIM = 'P'
                ORDER BY DIA_PAG DESC
          `
      );

      await isj.end();

      res.status(200).json(pagos);
    } else if (req.query.f && req.query.f === "traer pagosb") {
      const pagos = await isj.query(
        `
          SELECT *
          FROM pago_bco
          WHERE CONTRATO = ${parseInt(req.query.ficha)}  
          ORDER BY DIA_PAGO DESC
          `
      );
      await isj.end();
      res.status(200).json(pagos);
    } else if (req.query.f && req.query.f === "traer archivos") {
      const archivos = await sgi.query(`
                SELECT *
                FROM legajo_virtual
                WHERE contrato = ${parseInt(req.query.ficha)}

                `);

      await sgi.end();
      res.status(200).json(archivos);
    } else if (req.query.f && req.query.f === "traer usos") {
      const listUsos = await serv.query(`
         
         SELECT
          u.CONTRATO,
          u.FECHA,
          u.HORA,
          u.NRO_DOC,
          p.NOMBRE,
          u.SERVICIO,
          u.IMPORTE,
          u.ANULADO,        
          u.ORDEN
        FROM
          USOS AS u
        INNER JOIN PRESTADO AS p ON p.COD_PRES = u.PRESTADO
        WHERE
          u.CONTRATO = ${parseInt(req.query.contrato)}
        AND u.EMPRESA = 'SM'
        ORDER BY u.FECHA DESC
`);

      await serv.end();
      res
        .status(200)
        .json(
          JSON.stringify(listUsos, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer grupos") {
      const grupos = await isj.query(`
         
            SELECT
               CODIGO,
               DESCRIP
            FROM
               grupos       
        
            ORDER BY CODIGO ASC
              `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(grupos, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer zonas") {
      const zonas = await isj.query(`
         
            SELECT
               CODIGO,
               DESCRIP
            FROM
               zonas       
        
            ORDER BY CODIGO ASC
              `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(zonas, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer sucursales") {
      const sucursales = await sgi.query(`
         
            SELECT
              codigo,
              sucursal
            FROM
               sucursal        
            
              `);

      await sgi.end();

      res
        .status(200)
        .json(
          JSON.stringify(sucursales, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer productores") {
      const producto = await sgi.query(`
         
            SELECT
               CODIGO,
               DESCRIP
            FROM
               producto       
        
            ORDER BY CODIGO ASC      
            
              `);

      await sgi.end();

      res
        .status(200)
        .json(
          JSON.stringify(producto, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer localidades") {
      const localida = await sgi.query(`
         
            SELECT
               CODIGO,
               DETALLE 'DESCRIP'
            FROM
               localida   
        
            ORDER BY CODIGO ASC      
            
              `);

      await sgi.end();

      res
        .status(200)
        .json(
          JSON.stringify(localida, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer obra social") {
      const localida = await isj.query(`
         
            SELECT
               CODIGO,
               NOMBRE 'DESCRIP'
            FROM
               obra_soc   
        
            ORDER BY CODIGO ASC      
            
              `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(localida, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer planes") {
      const planes = await isj.query(`
         
            SELECT
               PLAN,             
               DESCRIP
            FROM
               planes   
                     
            
              `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(planes, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer n ficha") {
      const nFicha = await isj.query(
        `
          SELECT CONTRATO
          FROM maestro          
          ORDER BY CONTRATO DESC
          LIMIT 1
          `
      );

      await isj.end();
      res.status(200).json(nFicha);
    } else if (req.query.f && req.query.f === "traer historial") {
      const histCuota = await isj.query(`
         
      SELECT
            *
      FROM
         historia
      WHERE 
         CONTRATO = ${parseInt(req.query.contrato)}                

      ORDER BY idhistoria DESC
        `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(histCuota, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer cuota mensual") {
      const cuotaMensual = await isj.query(
        `
          SELECT *
          FROM cuo_fija
          WHERE CONTRATO = ${parseInt(req.query.contrato)}
        `
      );

      await isj.end();
      res.status(200).json(cuotaMensual);
    } else if (req.query.f && req.query.f === "traer cuotas") {
      const histCuota = await isj.query(`
         
            SELECT
              *
            FROM
               historia
            WHERE 
               CONTRATO = ${parseInt(req.query.contrato)}                
            AND 
               ACCION like '%Actualizacion%'                       
            ORDER BY idhistoria DESC
              `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(histCuota, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "traer cuenta") {
      const cuenta = await isj.query(`
         
            SELECT
              *
            FROM
             maestro_cuentas
            WHERE 
               CONTRATO = ${parseInt(req.query.contrato)}                
            
              `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(cuenta, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.query.f && req.query.f === "gasto luto") {
      const gastoLuto = await isj.query(
        `
        SELECT *
        FROM gasto_luto
      `
      );

      await isj.end();

      res.status(200).json(gastoLuto);
    }
  } else if (req.method === "POST") {
    if (req.body.f && req.body.f === "soli afi") {
      const regSoli = await isj.query(
        `
        INSERT INTO rehabilitaciones
        (
          contrato,
          apellido,
          nombre,
          operador,
          idoperador,
          vigencia,
          fecha,
          cuotas,
          dni,
          empresa
        )

        VALUES
        (
          ${parseInt(req.body.contrato)},
          '${req.body.apellido}',
          '${req.body.nombre}',
          '${req.body.operador}',
          ${parseInt(req.body.idoperador)},
          '${moment(req.body.vigencia).format("YYYY-MM-DD")}',
          '${moment(req.body.fecha).format("YYYY-MM-DD")}',
          ${parseInt(req.body.cuotas)},
          ${parseInt(req.body.dni)},
          '${req.body.empresa}'
        )
      
      `
      );

      await isj.end();

      res.status(200).json(regSoli);
    } else if (req.body.f && req.body.f === "reg socio") {
      const regSocio = await isj.query(
        `INSERT INTO maestro
          (
              CONTRATO,
              GRUPO,
              ZONA,
              SUCURSAL,
              PRODUCTOR,
              APELLIDOS,
              NOMBRES,
              NRO_DOC,
              NACIMIENTO,
              CALLE,
              NRO_CALLE,
              BARRIO,
              LOCALIDAD,
              DOMI_COBR,
              DOM_LAB,
              ALTA,
              VIGENCIA,
              TELEFONO,
              MOVIL,
              MAIL,
              EMPRESA,
              OPERADOR,
              OBRA_SOC,
              PLAN,
              SEXO,
              ESTADO

          
          )

          VALUES
          (
               ${parseInt(req.body.CONTRATO)},
                ${parseInt(req.body.GRUPO)},
                ${parseInt(req.body.ZONA)},
                '${req.body.SUCURSAL.toUpperCase()}',
                ${parseInt(req.body.PRODUCTO)},
                '${req.body.APELLIDOS.toUpperCase()}',
                '${req.body.NOMBRES.toUpperCase()}',
                ${parseInt(req.body.NRO_DOC)},
                '${moment(req.body.NACIMIENTO).format("YYYY-MM-DD")}',
                '${req.body.CALLE.toUpperCase()}',
                ${parseInt(req.body.NRO_CALLE)},
                '${req.body.BARRIO.toUpperCase()}',
                '${req.body.LOCALIDAD.toUpperCase()}',
                '${req.body.DOMI_COBR.toUpperCase()}',
                '${req.body.DOMI_LAB.toUpperCase()}',
                '${moment(req.body.ALTA).format("YYYY-MM-DD")}',
                '${moment(req.body.VIGENCIA).format("YYYY-MM-DD")}',
                '${req.body.TELEFONO}',
                '${req.body.MOVIL}',
                '${req.body.MAIL.toUpperCase()}',
                '${req.body.EMPRESA.toUpperCase()}',
                '${req.body.OPERADOR}',
                ${parseInt(req.body.OBRA_SOC)},
                '${req.body.PLAN}',
                '${req.body.SEXO}',
                ${req.body.ESTADO}
          )

          `
      );

      await isj.end();

      res.status(200).json(regSocio);
    } else if (req.body.f && req.body.f === "reg adh") {
      const regAdh = await isj.query(
        `
            INSERT INTO adherent
            (
              CONTRATO,
              SUCURSAL,
              PRODUCTOR,
              APELLIDOS,
              NOMBRES,
              NRO_DOC,
              NACIMIENTO,
              ALTA,
              VIGENCIA,
              OBRA_SOC,
              PLAN,
              SEXO
            )

            VALUES
            (
               ${parseInt(req.body.CONTRATO)},
               '${req.body.SUCURSAL.toUpperCase()}',
               ${parseInt(req.body.PRODUCTOR)},
               '${req.body.APELLIDOS.toUpperCase()}',
               '${req.body.NOMBRES.toUpperCase()}',
               ${parseInt(req.body.NRO_DOC)},
               '${moment(req.body.NACIMIENTO).format("YYYY-MM-DD")}',
               '${moment(req.body.ALTA).format("YYYY-MM-DD")}',
               '${moment(req.body.VIGENCIA).format("YYYY-MM-DD")}',
               ${parseInt(req.body.OBRA_SOC)},
               '${req.body.PLAN}',
               '${req.body.SEXO}'
            )
          `
      );

      await isj.end();

      res.status(200).json(regAdh);
    } else if (req.body.f && req.body.f === "reg cuota") {
      const regCuota = await isj.query(
        `
            INSERT INTO cuo_fija
            (
              CONTRATO,
              IMPORTE,
              CUO_ANT,
              DESDE,
              OPERADOR

            )

            VALUES
            (
               ${parseInt(req.body.CONTRATO)},
               ${parseFloat(req.body.IMPORTE)},
               ${parseFloat(req.body.CUO_ANT)},
               '${moment(req.body.DESDE).format("YYYY-MM-DD")}',
               '${req.body.OPERADOR}'
            )
        `
      );

      await isj.end();

      res.status(200).json(regCuota);
    } else if (req.body.f && req.body.f === "reg cuenta") {
      const regCuenta = await isj.query(
        `
              INSERT INTO maestro_cuentas
              (
                contrato,
                dni,
                grupo,
                cuenta,
                observacion
              )

              VALUES
              (
                 ${parseInt(req.body.contrato)},
                 ${parseInt(req.body.dni)},
                 ${parseInt(req.body.grupo)},
                 '${req.body.cuenta}',
                 '${req.body.observacion}'
              )
          `
      );

      await isj.end();

      res.status(200).json(regCuenta);
    } else if (req.body.f && req.body.f === "reg pago 0") {
      const regPag0 = await isj.query(
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
          RENDIDO
      )

      VALUES
      (
          0,
          0,
          ${parseInt(req.body.mes)},
          ${parseInt(req.body.ano)},
          0,
          '${moment(req.body.mes).format("YYYY-MM-DD")}',
          '${moment(req.body.mes).format("YYYY-MM-DD")}',
          '${moment(req.body.mes).format("YYYY-MM-DD")}',
          '${moment(req.body.mes).format("YYYY-MM-DD")}',
          '${req.body.hora}',
          ${parseInt(req.body.contrato)},
          "-",
          "P",
          '${req.body.operador}',
          0,
          0,
          "-",
          "SM",
          0
      )

      `
      );

      await isj.end();

      res.status(200).json(regPag0);
    }
  } else if (req.method === "PUT") {
    if (req.body.f && req.body.f === "act valor cuota") {
      const actCuota = await isj.query(`         

        UPDATE cuo_fija
        SET IMPORTE = ${parseInt(req.body.cuota)},
            CUO_ANT   = ${parseInt(req.body.vieja)}
        WHERE CONTRATO =  ${parseInt(req.body.contrato)}    

    
        `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(actCuota, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.body.f && req.body.f === "editar socio") {
      if (req.body.tc === "I") {
        let camp = `${req.body.campo}`;

        const socio = await isj.query(
          `      
        UPDATE maestro
        SET ${camp} = ${parseInt(req.body.dato)}         
        WHERE CONTRATO = ${parseInt(req.body.contrato)}    
       
         `
        );

        await isj.end();

        res
          .status(200)
          .json(
            JSON.stringify(socio, (key, value) =>
              typeof value === "bigint" ? value.toString() : value
            )
          );
      } else if (req.body.tc === "S") {
        let camp = `${req.body.campo}`;

        const socio = await isj.query(
          `      
        UPDATE maestro
        SET ${camp} = '${req.body.dato}'        
        WHERE CONTRATO = ${parseInt(req.body.contrato)}    
       
         `
        );

        await isj.end();

        res
          .status(200)
          .json(
            JSON.stringify(socio, (key, value) =>
              typeof value === "bigint" ? value.toString() : value
            )
          );
      } else if (req.body.tc === "D") {
        let camp = `${req.body.campo}`;
        let dat = moment(req.body.dato).format("YYYY-MM-DD");

        const socio = await isj.query(
          `      
        UPDATE maestro
        SET ${camp} = '${dat}'         
        WHERE CONTRATO = ${parseInt(req.body.contrato)}    
       
         `
        );
        await isj.end();

        res
          .status(200)
          .json(
            JSON.stringify(socio, (key, value) =>
              typeof value === "bigint" ? value.toString() : value
            )
          );
      }
    } else if (req.body.f && req.body.f === "editar adh") {
      if (req.body.tc === "I") {
        let camp = `${req.body.campo}`;

        const socio = await isj.query(
          `      
        UPDATE adherent
        SET ${camp} = ${parseInt(req.body.dato)}         
        WHERE NRO_DOC = ${parseInt(req.body.dni)}    
       
         `
        );
        await isj.end();

        res
          .status(200)
          .json(
            JSON.stringify(socio, (key, value) =>
              typeof value === "bigint" ? value.toString() : value
            )
          );
      } else if (req.body.tc === "S") {
        let camp = `${req.body.campo}`;

        const socio = await isj.query(
          `      
        UPDATE adherent
        SET ${camp} = '${req.body.dato}'        
        WHERE NRO_DOC = ${parseInt(req.body.dni)}     
       
         `
        );

        await isj.end();

        res
          .status(200)
          .json(
            JSON.stringify(socio, (key, value) =>
              typeof value === "bigint" ? value.toString() : value
            )
          );
      } else if (req.body.tc === "D") {
        let camp = `${req.body.campo}`;
        let dat = moment(req.body.dato).format("YYYY-MM-DD");

        const socio = await isj.query(
          `      
        UPDATE adherent
        SET ${camp} = '${dat}'         
        WHERE NRO_DOC = ${parseInt(req.body.dni)}      
       
         `
        );

        await isj.end();

        res
          .status(200)
          .json(
            JSON.stringify(socio, (key, value) =>
              typeof value === "bigint" ? value.toString() : value
            )
          );
      }
    } else if (req.body.f && req.body.f === "baja ficha") {
      const bajaMae = await isj.query(`         

        UPDATE maestro
        SET ESTADO = 0            
        WHERE CONTRATO =  ${parseInt(req.body.contrato)}    
    
        `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(bajaMae, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );

      const bajaAdh = await isj.query(`         

        UPDATE adherent
        SET BAJA = CURDATE()            
        WHERE CONTRATO =  ${parseInt(req.body.contrato)}    
    
        `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(bajaAdh, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.body.f && req.body.f === "baja adhe") {
      const bajaAdh = await isj.query(`         

        UPDATE adherent
        SET BAJA = CURDATE()            
        WHERE idadherent =  ${parseInt(req.body.idadh)}    
    
        `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(bajaAdh, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.body.f && req.body.f === "reafiliar ficha") {
      const reafilFicha = await isj.query(`         

        UPDATE maestro
        SET ESTADO = 1,
        ALTA = CURDATE(),  
        VIGENCIA = TIMESTAMPADD(MONTH, 3, CURDATE())
        WHERE CONTRATO =  ${parseInt(req.body.contrato)}    
    
        `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(reafilFicha, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );

      const reafilAdh = await isj.query(`         

        UPDATE adherent
        SET BAJA = NULL,
        ALTA = CURDATE(),
        VIGENCIA = TIMESTAMPADD(MONTH, 3, CURDATE())          
        WHERE CONTRATO =  ${parseInt(req.body.contrato)}    
    
        `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(reafilAdh, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    } else if (req.body.f && req.body.f === "reafiliar adhe") {
      const reafilAdh = await isj.query(`         

        UPDATE adherent
        SET BAJA = NULL,
        ALTA = CURDATE(),
        VIGENCIA = TIMESTAMPADD(MONTH, 3, CURDATE())          
        WHERE idadherent =  ${parseInt(req.body.idadh)}    
    
        `);

      await isj.end();

      res
        .status(200)
        .json(
          JSON.stringify(reafilAdh, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
    }
  }
}
