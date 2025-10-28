const moment = require("moment");

let { transporter } = require("../../../../config/nodeMailer");

export default async function sendMail(req, res) {
  let listado = req.body;

  let table = `
<table border="1" style='border-collapse:collapse;'>
<thead class="thead-dark">
  <tr>      
    <th scope="col">N°</th>
    <th scope="col">Fecha</th>
    <th scope="col">Ficha</th>
    <th scope="col">Socio</th>
    <th scope="col">Capital</th>
    <th scope="col">Cuotas</th>      
    <th scope="col">Operador</th>      
  </tr>
</thead>
<tbody>

`;

  for (let i = 0; i < listado.length; i++) {
    table += `
      <tr key=${i}>
      <th scope="row">${i + 1}</th>
      <td>${moment(listado[i].ptm_fechacarga).format("DD/MM/YYYY")}</td>
      <td>${listado[i].ptm_ficha}</td>
      <td>${listado[i].ptm_afi}</td>
      <td>${listado[i].ptm_prestamo}</td>
      <td>${listado[i].ptm_valcuota}</td>
      <td>${listado[i].ptm_op}</td>
    </tr>
     `;
  }

  table += `</tbody>
    </table>    
    `;

  const mailData = {
    from: "werchowsgi@gmail.com",
    to: `vmlongo@werchow.com`,
    cc: [
      "otero464@gmail.com",
      "grhumanos45@yahoo.com.ar",
      "santiagoiriarte@werchow.com",
      "contadoramoreno@werchow.com",
    ],
    subject: `Listado de Prestamos Pendientes. - WERCHOW SGI`,
    html: `

    <html>
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossOrigin="anonymous"></link>
    </head>
    <body>

    <h2  >
        <strong>
            Listado de Prestamos Pendientes:
        </strong>
    </h2>

    </br>
 
${table}
   
    </br>


    <p>
    Email enviado desde: WERCHOW SGI - http://sgi.werchow.com:3001
    </p>

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossOrigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js" integrity="sha384-VHvPCCyXqtD5DqJeNxl2dtTyhF78xXNXdkwX1CZeRusQfRKp+tA7hAShOK/B/fQ2" crossOrigin="anonymous"></script>
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
