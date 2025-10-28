import serverlessMysql from "serverless-mysql";

export const werchow = serverlessMysql({
  config: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.WERCHOWBD,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});
export const sgi = serverlessMysql({
  config: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.SGI,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});

export const serv = serverlessMysql({
  config: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.MEDICOS,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});

export const sep = serverlessMysql({
  config: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.SEPELIO,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});

export const camp = serverlessMysql({
  config: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.CAMP,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});

export const arch = serverlessMysql({
  config: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.ARCHIVOS,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});

export const club = serverlessMysql({
  config: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.CLUB,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});

export const sanmiguel = serverlessMysql({
  config: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.SANMIGUEL,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});

export const SMArchivo = serverlessMysql({
  config: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.SMARCHIVO,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});

export const isj = serverlessMysql({
  config: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.ISJ,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});

export const ISJArchivo = serverlessMysql({
  config: {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.ISJARCHIVO,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});