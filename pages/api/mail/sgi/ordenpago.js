const moment = require("moment");

let { transporter } = require("../../../../config/nodeMailer");

export default async function sendMail(req, res) {
  const mailData = {
    from: "werchowsgi@gmail.com",
    to: `vmlongo@werchow.com`,
    cc: [
      "otero464@gmail.com",
      "grhumanos45@yahoo.com.ar",
      "santiagoiriarte@werchow.com",
      "contadoramoreno@werchow.com",
    ],
    subject: `Notificacion Nueva Orden de Pago N° ${req.body.norden}- WERCHOW SGI`,
    html: `

    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    </head>
    <body>

    <h2>
    <strong>
    <u>
    Orden de pago N°: ${req.body.norden}
    </u>
    </strong>
    </h2>

    </br>

    <div>
    
    <p><strong><u>Orden tipo</strong></u>: ${req.body.tipo_orden}</P> 

    <p><strong><u>Fecha de carga</strong></u>: ${moment(req.body.fecha)
      .utcOffset("-300")
      .locale("es")
      .format("DD/MM/YYYY")}</p>

    <p><strong><u>Fecha De Pago</strong></u>: ${moment(req.body.fecha_pago)
      .utcOffset("-300")
      .locale("es")
      .format("DD/MM/YYYY")}</p>
    
    <p><strong><u>Proveedor</strong></u>: ${req.body.proveedor} - ${
      req.body.nombre
    }</P> 

    <p><strong><u>Tipo y numero de factura</strong></u>: ${
      req.body.tipo_factura
    } - N°${
      req.body.nfactura
    }. (Campo valido para ordenes de pago contables)</P> 

    <p><strong><u>Importe</strong></u>:$ ${req.body.total}</P> 
    
    <p><strong><u>Operador</strong></u>: ${req.body.operador_carga}</P> 

    <p><strong><u>Observacion</strong></u>: ${req.body.observacion}

    
    </div>
    <p>Email enviado desde: WERCHOW SGI - http://sgi.werchow.com:3001
     </p>

     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
    </body>
  </html>

  `,
  };
  try {
    const response = await transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "max-age=180000");
    res.end(JSON.stringify(response));
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
