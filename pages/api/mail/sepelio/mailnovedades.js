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
    subject: `Notificacion Novedades de Autos - WERCHOW SGI`,
    text: `novedad: ${req.body.novedad}, patente: ${req.body.patente}, operador:${req.body.operador}, fecha: ${req.body.fecha}`,
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
    Registro de Novedades Sobre los Autos - Sepelio
    </u>
    </strong>
    </h2>

    </br>

    <div>
    <p><strong><u>Novedad</strong></u>: ${req.body.novedad}</P> 
    <p><strong><u>Patente</strong></u>: ${req.body.patente}</p>
    <p><strong><u>Auto</strong></u>: ${req.body.auto}</p>
    <p><strong><u>Fecha</strong></u> :${moment(req.body.fecha).format(
      "DD/MM/YYYY HH:mm:ss"
    )}</p> 
    <p><strong><u>Operador</strong></u>: ${req.body.operador}</p>
    
    
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
