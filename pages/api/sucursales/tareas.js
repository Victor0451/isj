import {
  werchow,
  sgi,
  serv,
  sep,
  camp,
  arch,
  club,
  sanmiguel,
} from "../../../libs/db/index";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.f && req.query.f === "traer tareas") {
      const autos = await sgi.query(
        `
          SELECT *
          FROM tareas_sucursales
      `
      );

      await sgi.end();

      res.status(200).json(autos);
    }
  }
  if (req.method === "POST") {
    if (req.body.f && req.body.f === "nueva tarea") {
      const regTarea = await sgi.query(
        `
            INSERT INTO tareas_sucursales
            (
              title,
              start,
              end,
              allDay,
              operador,
              sucursal,
              priority
            )

            VALUES
            (
               '${req.body.title}',
               '${req.body.start}',
               '${req.body.end}',
               ${req.body.allDay},
               '${req.body.operador}',
               '${req.body.sucursal}',
               ${parseInt(req.body.priority)}
            )
          
          `
      );

      await sgi.end();
      res.status(200).json(regTarea);
    }
  }
  if (req.method === "PUT") {
    if (req.body.f && req.body.f === "editar evento") {
      const regAuto = await sgi.query(
        `
      UPDATE tareas_sucursales
      SET title= '${req.body.title}',
          start= '${req.body.start}',
          end= '${req.body.end}',
          allDay= ${req.body.allDay}

      WHERE idevents= ${parseInt(req.body.id)}
    `
      );

      await sgi.end();
      res.status(200).json(regAuto);
    }
  }
  if (req.method === "DELETE") {
    if (req.query.f && req.query.f === "eliminar tarea") {
      const delTarea = await sgi.query(
        `
            DELETE FROM tareas_sucursales
            WHERE idevents= ${parseInt(req.body.id)}
          `
      );

      await sgi.end();

      res.status(200).json(delTarea);
    }
  }
}
