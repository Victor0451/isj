const moment = require("moment");

let { transporter } = require("../../../../config/nodeMailer");

export default async function sendMail(req, res) {
    const mailData = {
        from: "werchowsgi@gmail.com",
        to: `${req.body.mail}`,
        cc: ["vmlongo@werchow.com"],
        subject: `Codigo Para Descuento - GRUPO WERCHOW`,
        html: `

    <html>
    <head>
      <meta charset="utf-8">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    </head>
    <body>

    <h2 style="text-align: center" >
        <strong>
            Codigo Para Descuento*
        </strong>
    </h2>

    </br>
   
    <h1 style="text-align: center">                    
    <strong>
        <u>
        ${req.body.codigo}       
         </u> 
    </strong>
    </h1>
    
    </br>
    </br>    

    <p>

    <strong>
    Presenta este código en recepción para obtener un descuento en Consultorios Otero.
    </strong>
    </p>


    <div>
        
        

    <p>
       <strong>
            <u>
                Solicitante
            </strong>
        </u>: ${req.body.nosocio}
    </p> 
    
    <p>
        <strong>
            <u>
                DNI
            </strong>
        </u>: ${req.body.dni}
    </p>
    
    <p>
        <strong>
            <u>
                Fecha
        </strong>
            </u> : ${moment(req.body.fecha).format("DD/MM/YYYY")}
    </p> 
    
    </div>

    
    <p>
        
    *Descuento para ser utilizado por única vez, con médicos en convenio con Grupo Werchow.
        
    </p>

    <p>
        Email enviado desde: GRUPO WERCHOW - https://werchow.com.ar/
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
