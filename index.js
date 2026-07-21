import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();

app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
    host: "mysql-esneyders.alwaysdata.net",
    user: "esneyders",
    password: "AwSD2xhas23",
    database: "esneyders_database"
});

conexion.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }

    console.log("Base de datos conectada");
});

app.get("/", (req, res) => {
    res.send("Hola Node!");
});

app.get("/grafico", (req, res) => {

    const sql = `
        SELECT servicio, COUNT(*) AS cantidad
        FROM reservas
        GROUP BY servicio
        ORDER BY cantidad DESC
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            console.log(error);
            return res.status(500).json({
                mensaje: "Error al obtener los datos"
            });
        }

        res.json(resultados);

    });

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});